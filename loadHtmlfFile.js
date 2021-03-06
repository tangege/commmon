/**
 * Created by tanyonglong on 2016/9/28 0028.
 *
 * 定时替换html内容
 * url 要替换的html地址
 * container 要放置在哪个容器 不填默认加载HTML文件到body里
 * time 什么时间开始替换 格式 2016/09/28 10:00:00 也可以是时间戳
 * timeServerURL 取当前时间的服务器地址 默认 http://timer.coolpad.com/timer1
 * autoLoad 是否自动替换 默认true
 * async 默认异步
 * success 成功加载数据后执行的回调函数
 * error 发生错误的回调函数
 * serverTimeSuccess 成功获取服务器时间后的回调函数 可能是马上要进行页面替换 也可能是马上要倒计时
 *
 * 注意： container 设置为document或者html替换整个文档会导致jQuery的ready事件不执行 可以去掉ready事件然后把js代码放到body内部的底部
 * 或者把container设置为body或其他选择器/jQuery对象
 */
;(function($){
    function _loadHTMLFile(){
        this.currenTime = 0;
        this.settings = {
            "url": "",
            "container": "body",
            "time": "",
            "timeServerURL": "http://timer.coolpad.com/timer1",
            "autoLoad": true,
            "async": true,
            "success": null,
            "error": null,
            "serverTimeSuccess": null
        }
    }
    _loadHTMLFile.prototype.init = function (opts) {
        var _this = this;
        if(opts){
            for(var attr in opts){
                this.settings[attr] = opts[attr];
            }
        }
        if(this.settings["url"] == ""){
            if(_this.settings["error"]){
                _this.settings["error"].call(_this);
            }
            throw new Error("arguments 'url' must be need!");
        }
        if(this.settings["time"] == -1){
            if(_this.settings["error"]){
                _this.settings["error"].call(_this);
            }
            return;
        }
        $.ajax({
            url: this.settings["timeServerURL"],
            type: "GET",
            crossDomain: true,
            async: this.settings["async"],
            cache: false,
            dataType: 'jsonp',
            success: function(data){
                _this.currenTime = parseInt(data/1000);
                if(_this.settings["time"] == ""){
                    _this.settings["time"] = _this.currenTime;
                }
                _this.beforLoad();
            },
            error: function(xhr, status, err){
                if(_this.settings["error"]){
                    _this.settings["error"].call(_this);
                }
            }
        })
    }
    _loadHTMLFile.prototype.beforLoad = function (){
        var _this = this;
        if(typeof this.settings["time"] === "string"){
            this.settings["time"] = new Date(this.settings["time"]).getTime();
        }
        if(this.settings["serverTimeSuccess"]){
            this.settings["serverTimeSuccess"].call(this);
        }
        if(this.settings["autoLoad"]){
            new TimeMachine().countDown({
                "distime": parseInt(this.settings["time"]/1000) - this.currenTime,
                "overFn": function (){
                    _this.load();
                }
            })
        }else {
            if((parseInt(this.settings["time"]/1000) - this.currenTime) <= 0){
                this.load();
            }
        }

    }
    _loadHTMLFile.prototype.load = function (){
        var _this = this;
        $.ajax({
            url: this.settings["url"],
            type: "GET",
            dataType: "html",
            async: this.settings["async"],
            cache: false,
            success: function(data){
                if(_this.settings["container"] == "document"){
                    document.write(data);
                }else {
                    $(_this.settings["container"]).html(data);
                }
                if(_this.settings["success"]){
                    _this.settings["success"].call(_this);
                }
            },
            error: function(xhr, status, err){
                if(_this.settings["error"]){
                    _this.settings["error"].call(_this);
                }
            }
        })
    }

    window.loadHTMLFile = new _loadHTMLFile();

    function TimeMachine (){
        this.CTTime = null;
        this.timer = null;
        this.callback = null;
        this.distime = 0;
        this.overFn = null;
    }
    TimeMachine.prototype.countDown = function (opts){
        var _this = this;
        this.distime = opts['distime'];
        this.callback = opts['callback'] || null;
        this.overFn = opts['overFn'] || null;
        this.timer = setInterval(function(){
            _this.distime--;
            _this.getCountDownTime();
        },1000);
        this.getCountDownTime();
    };
    TimeMachine.prototype.getCountDownTime = function (){
        if(this.distime <= 0){
            this.distime = 0;
            clearInterval(this.timer);
        }
        var disdays = parseInt(this.distime / (3600 * 24));
        var dishours = parseInt((this.distime - disdays * 3600 * 24) / 3600);
        var disminites = parseInt((this.distime - disdays * 3600 * 24 - dishours * 3600) / 60);
        var disseconds = parseInt(this.distime - disdays * 3600 * 24 - dishours * 3600 - disminites * 60);
        this.CTTime = {
            "disdays": this.addZelo(disdays),
            "dishours": this.addZelo(dishours),
            "disminites": this.addZelo(disminites),
            "disseconds": this.addZelo(disseconds)
        };
        if(this.callback){
            this.callback(this.CTTime);
        }
        if(this.distime === 0 && this.overFn){
            this.overFn();
        }
    };
    TimeMachine.prototype.addZelo = function(n){
        return (parseInt(n) < 10 && parseInt(n) >= 0) ? '0' + n : n;
    };

})(jQuery);

