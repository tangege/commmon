/**
 * Created by Administrator on 2016/9/10 0010.
 */
var tan = {};
//时间对象
tan.time = {};
//返回时间戳
tan.time.gettime = function(){
    return +new Date;
}

//元素居中
tan.center = function (obj){
    if(obj){
        var objwidth = obj.offsetWidth;
        var objheight = obj.offsetHeight;
        var windowwidth = document.documentElement.clientWidth || document.body.clientWidth;
        var windowheight = document.documentElement.clientHeight || document.body.clientHeight;
        var centerx = (windowwidth - objwidth) / 2;
        var centery = (windowheight - objheight) / 2;
        obj.style.left = centerx + 'px';
        obj.style.top = centery + 'px';
    }
}
//Toast
function Toast (){
    this.toastDom = null;
    this.settings = {
        "id": "toast",
        "width": 100,
        "text": "这是我的Toast！",
        "destroy": 3000
    };
    this.timer = null;
    this.isRunning = false;
}
Toast.prototype.open = function (opts){
    if(opts){
        for(var x in opts){
            this.settings[x] = opts[x];
        }
    }
    if(this.isRunning){
        clearTimeout(this.timer);
    }
    this.init();
}
Toast.prototype.init = function (){
    var _this = this;
    var element = document.getElementById(this.settings['id']);
    if(element){
        this.toastDom = element;
    }else {
        element = document.createElement('div');
        element.id = this.settings['id'];
        element.style.position = 'fixed';
        element.style.left = 0;
        element.style.top = 0;
        element.style.background = 'rgba(0,0,0,.5)';
        element.style.borderRadius = '6px';
        element.style.textAlign = 'center';
        element.style.padding = '3%';
        element.style.color = '#fff';
        element.style.zIndex = 999999;
        document.body.appendChild(element);
        this.toastDom = element;
    }
    this.toastDom.style.display = 'block';
    element.style.width = this.settings['width'] + 'px';
    element.innerHTML = this.settings['text'];
    this.center();
    window.onresize = function(){
        _this.center();
    }
    this.destroy();
}
Toast.prototype.center = function (){
    if(this.toastDom){
        var objwidth = this.toastDom.offsetWidth;
        var objheight = this.toastDom.offsetHeight;
        var windowwidth = document.body.clientWidth || document.documentElement.clientWidth;
        var windowheight = document.body.clientHeight || document.documentElement.clientHeight;
        var centerx = (windowwidth - objwidth) / 2;
        var centery = (windowheight - objheight) / 2;
        this.toastDom.style.left = centerx + 'px';
        this.toastDom.style.top = centery + 'px';
    }
}
Toast.prototype.destroy = function(){
    if(this.toastDom){
        var _this = this;
        this.isRunning = true;
        this.timer = setTimeout(function(){
            _this.toastDom.style.display = 'none';
            this.isRunning = false;
            if(_this.settings['destroyfn']){
                _this.settings['destroyfn']();
            }
        },this.settings['destroy']);
    }
}

//dialog
function TanDialog (){
    this.dialogDom = null;
    this.modelDom = null;
    this.settings = {
        "id": "tandialog",
        "width": 300,
        "text": "这是一个弹出框！",
        "model": true,
        "title": "消息提示",
        "okbutton": true,
        "cancelbutton": true,
        "okfn": null,
        "destroyfn": null
    }
}
TanDialog.prototype.open = function (opts){
    if(opts){
        for(var x in opts){
            this.settings[x] = opts[x];
        }
    }
    this.init();
}
TanDialog.prototype.init = function (){
    var _this = this;
    if(this.settings['model']){
        var modelelement = document.getElementById(this.settings['id'] + '_bg');
        if(!modelelement){
            modelelement = document.createElement('div');
            modelelement.id = this.settings['id'] + '_bg';
            setcss(modelelement,{
                "position": "fixed",
                "left": 0,
                "top": 0,
                "backgroundColor": "#000",
                "width": "100%",
                "height": "100%",
                "opacity": 0.6,
                "filter": "alpha(Opacity=60)",
                "zIndex": 99999
            });
            document.body.appendChild(modelelement);
        }
        this.modelDom = modelelement;
        this.modelDom.style.display = 'block';
    }

    var dialogelement = document.getElementById(this.settings['id']);
    if(dialogelement){
        this.dialogDom = dialogelement;
    }else {
        dialogelement = document.createElement('div');
        dialogelement.id = this.settings['id'];
        setcss(dialogelement,{
            "position": "fixed",
            "left": 0,
            "top": 0,
            "backgroundColor": "#fff",
            "width": "300px",
            "font-family": "微软雅黑",
            "zIndex": 99999
        });
        var contenthtmls = '<div id="td-header" style="height: 45px;background-color: #476DB9;color: #fff;position: relative;">'
            + '<p style="line-height: 45px;margin-left: 10px;">'+ this.settings['title'] +'</p><span style="position: absolute;right: 10px;top: 5px;cursor: pointer;">X</span>'
            + '</div>'
            + '<div id="td-body" style="padding: 25px 0;text-align: center;">'
            + '<p style="margin: 0 10px;">'+ this.settings['text'] +'</P>'
            + '</div>'
            + '<div id="td-footer" style="height: 45px;background-color: #FAFAFA">'
            + '<a id="td-cancelbtn" href="javascript:;" style="float: right;display: block;background-color: #DDDDDD;color: #333;margin-right: 10px;padding: 5px 10px;margin-top: 9px;">取消</a>'
            + '<a id="td-okbtn" href="javascript:;" style="float: right;display: block;background-color: #476DB9;color: #fff;margin-right: 10px;padding: 5px 10px;margin-top: 9px;">确定</a>'
            + '</div>'
        dialogelement.innerHTML = contenthtmls;
        document.body.appendChild(dialogelement);
        this.dialogDom = dialogelement;
    }
    this.dialogDom.style.display = "block";
    this.center();
    if(!this.settings['okbutton'] && !this.settings['cancelbutton']){
        document.getElementById('td-footer').style.display = "none";
    }else {
        document.getElementById('td-footer').style.display = "block";
        if(!this.settings['okbutton']){
            document.getElementById('td-okbtn').style.display = "none";
        }else {
            document.getElementById('td-okbtn').style.display = "block";
        }

        if(!this.settings['cancelbutton']){
            document.getElementById('td-cancelbtn').style.display = "none";
        }else {
            document.getElementById('td-cancelbtn').style.display = "block";
        }
    }
    this.setTitle(this.settings['title']);
    this.setContent(this.settings['text']);

    var closebtn = document.getElementById('td-header').getElementsByTagName('span')[0];
    var okbtn = document.getElementById('td-okbtn');
    var cancelbtn = document.getElementById('td-cancelbtn');
    okbtn.onclick = cancelbtn.onclick = closebtn.onclick = function(){
        _this.destroy();
    }
    if(this.settings['okfn']){
        okbtn.onclick = function (){
            _this.settings['okfn'].call(_this);
            _this.destroy();
        }
    }
}
TanDialog.prototype.setTitle = function (title){
    var titledom = document.getElementById('td-header').getElementsByTagName('p')[0];
    if(titledom){
        titledom.innerHTML = title;
    }
}
TanDialog.prototype.setContent = function (content){
    var contentdom = document.getElementById('td-body').getElementsByTagName('p')[0];
    if(contentdom){
        contentdom.innerHTML = content;
    }
}
TanDialog.prototype.center = function (){
    if(this.dialogDom){
        var objwidth = this.dialogDom.offsetWidth;
        var objheight = this.dialogDom.offsetHeight;
        var windowwidth = document.documentElement.clientWidth || document.body.clientWidth;
        var windowheight = document.documentElement.clientHeight || document.body.clientHeight;
        var centerx = (windowwidth - objwidth) / 2;
        var centery = (windowheight - objheight) / 2;
        this.dialogDom.style.left = centerx + 'px';
        this.dialogDom.style.top = centery + 'px';
    }
}
TanDialog.prototype.destroy = function (){
    if(this.modelDom){
        this.modelDom.style.display = "none";
    }
    if(this.dialogDom){
        this.dialogDom.style.display = "none";
        if(this.settings['destroyfn']){
            this.settings['destroyfn'].call(this);
        }
    }

}
function setcss(obj, opts){
    if(obj && opts){
        for(var x in opts){
            obj.style[x] = opts[x];
        }
    }
}

/**
 * 滚动到
 * @param target
 */
function scrollToTop(target){
    var documentevent = null;
    var flag = 0;
    var target  = target;
    document.tt = setInterval(function(){
        if(document.onclick && flag == 0){
            documentevent = document.onclick;
            flag++;
        }
        document.onclick = function (){
            clearInterval(document.tt);
            documentevent();
        }
        var iscurtop = document.documentElement.scrollTop || document.body.scrollTop;
        var speed = (target - iscurtop)/8;
        speed = speed > 0 ? Math.ceil(speed): Math.floor(speed);
        if(iscurtop == target){
            clearInterval(document.tt);
        }else {
            document.documentElement.scrollTop = document.body.scrollTop = (iscurtop + speed);
        }
    }, 25);
}

/**
 * 滚动
 * @param obj
 * @constructor
 */
function Roll (obj){
    this.dom = obj;
    this.timer = null;
    this.settings = {
        "speed": 38,
        "step": 1,
        "mouseOverStop": true
    }
}
Roll.prototype.init = function (opts){
    if(opts){
        for(var attr in opts){
            this.settings[attr] = opts[attr];
        }
    }
    if(this.dom){
        this.dom.innerHTML += this.dom.innerHTML;
        if(this.settings["mouseOverStop"]){
            this.addEvent();
        }
    }
    this.start();
}
Roll.prototype.start = function (){
    var _this = this;
    if(this.dom){
        this.timer = setInterval(function(){
            var currentTop = _this.getStyle("top", true);
            var objHeight = _this.dom.offsetHeight;
            if( Math.abs(currentTop) >= objHeight/2 ){
                _this.dom.style.top = 0;
                currentTop = _this.getStyle("top", true);
            }
            _this.dom.style.top = currentTop - _this.settings["step"] + "px";
        }, this.settings["speed"]);
    }
}
Roll.prototype.stop = function (){
    if(this.timer){
        clearInterval(this.timer);
    }
}
Roll.prototype.addEvent = function (){
    var _this = this;
    if(this.dom){
        this.dom.onmouseover = function (){
            _this.stop();
        }
        this.dom.onmouseout = function (){
            _this.start();
        }
    }
}
Roll.prototype.getStyle = function (attr, flag){
    var value = this.dom.currentStyle? this.dom.currentStyle[attr]: getComputedStyle(this.dom,false)[attr];
    if(flag){
        return parseInt(value);
    }
    return value
}