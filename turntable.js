/**
 * Created by tanyonglong on 2016/9/25 0025.
 */

function Turntable (obj){
    this.dom = obj;
    this.isRunning = false;
    this.totalRotateDeg = 0;
    this.result = [];
    this.timer = null;
    this.isCallbackRuned = false;
    this.settings = {
        "Jackpot": [
            [1,0,'一等奖'],
            [2,60,'二等奖'],
            [3,120,'三等奖'],
            [4,180,'四等奖'],
            [5,240,'五等奖'],
            [6,300,'六等奖']
        ],
        "num": 5,//默认转5圈
        "callback": null,
        "grade": 0,
        "speed": 3,
        "text": ""
    }
}
Turntable.prototype.init = function (opts) {
    if(this.isRunning){
        return;
    }
    if(opts){
        for(var attr in opts){
            this.settings[attr] = opts[attr];
        }
    }
    if(this.dom){
        var deg = 0;
        for(var i = 0,len = this.settings["Jackpot"].length;i < len; i++) {
            if(this.settings["grade"] == this.settings["Jackpot"][i][0]){
                this.result = this.settings["Jackpot"][i];
                deg = this.settings["Jackpot"][i][1];
                if(this.settings["text"] !== ""){
                    this.result[2] = this.settings["text"];
                }
            }
        }
        var flag = "";
        if(this.isSupportedTransform()){
            //支持css3
            this.setCss();
            this.addEvent();
            flag = "notie"
        }else {
            flag = "ie"
        }
        this.start(deg, flag);
    }
}
Turntable.prototype.start = function (deg, flag) {
    var _this = this;
    this.isRunning = true;
    if(flag == "ie"){
        var currentdeg = 0;
        this.timer = setInterval(function () {
            currentdeg += _this.settings["speed"] * 10;
            var multiple = parseInt((deg + _this.settings["num"]*360)/(_this.settings["speed"] * 10));
            var RremainderDeg = (deg + _this.settings["num"]*360)%(_this.settings["speed"] * 10);
            if(currentdeg > multiple*(_this.settings["speed"] * 10)){
                clearInterval(_this.timer);
                var disDeg = currentdeg - multiple*(_this.settings["speed"] * 10);
                deg = RremainderDeg - disDeg + currentdeg;
                _this.ie8Rotate(deg);
                _this.isRunning = false;
                _this.settings["callback"].call(_this,_this.result[0],_this.result[2]);
            }else {
                _this.ie8Rotate(currentdeg);
            }
        }, 10)
    }else {
        this.totalRotateDeg +=  this.settings["num"]*360 + deg - this.totalRotateDeg%360;
        this.dom.style.webkitTransform = "rotate(" + this.totalRotateDeg +"deg)";
        this.dom.style.mozTransform = "rotate(" + this.totalRotateDeg +"deg)";
        this.dom.style.msTransform = "rotate(" + this.totalRotateDeg +"deg)";
        this.dom.style.oTransform = "rotate(" + this.totalRotateDeg +"deg)";
        this.dom.style.transform = "rotate(" + this.totalRotateDeg +"deg)";
    }
}
Turntable.prototype.addEvent = function () {
    var _this = this;
    _this.isCallbackRuned = false;
    var body = document.body || document.documentElement;
    var style = body.style;
    var	transitionEnd = (function(){
        var transEndEventNames = {
            WebkitTransition : 'webkitTransitionEnd',
            MozTransition    : 'transitionend',
            OTransition      : 'oTransitionEnd otransitionend',
            transition       : 'transitionend'
        }
        for(var name in transEndEventNames){
            if(typeof style[name] === "string"){
                return transEndEventNames[name]
            }
        }
    })();
    this.dom.addEventListener(transitionEnd, end, false);
    function end (){
        if(_this.isCallbackRuned){
            return;
        }
        _this.isRunning = false;
        _this.isCallbackRuned = true;
        if(_this.settings["callback"] != null){
            _this.settings["callback"].call(_this,_this.result[0],_this.result[2]);
        }
    }
}
Turntable.prototype.setCss = function () {
    this.dom.style.webkitTransition = "all " + this.settings['speed'] + "s";
    this.dom.style.mozTransition = "all " + this.settings['speed'] + "s";
    this.dom.style.msTransition = "all " + this.settings['speed'] + "s";
    this.dom.style.oTransition = "all " + this.settings['speed'] + "s";
    this.dom.style.transition = "all " + this.settings['speed'] + "s";
}
Turntable.prototype.isSupportedTransform = function (){
    var transformArr = ["webkitTransform","mozTransform","msTransform","oTransform","transform"];
    var transitionArr = ["webkitTransition","mozTransition","msTransition","oTransition","transition"];
    var isSupportedTransform = checkAtrr(this.dom, transformArr);
    var isSupportedTransition = checkAtrr(this.dom, transitionArr);
    function checkAtrr (obj, arr){
        var result = false;
        for(var i = 0,len = arr.length; i < len; i++){
            if(typeof obj.style[arr[i]] !== "undefined"){
                result = true;
                break;
            }
        }
        return result;
    }
    if(isSupportedTransform && isSupportedTransition){
        return true;
    }else {
        return false;
    }
}
Turntable.prototype.ie8Rotate = function (deg){
    var width = this.dom.offsetWidth;
    var height = this.dom.offsetHeight;
    var m11 = Math.cos(Math.PI/180*deg);
    var m12 = -Math.sin(Math.PI/180*deg);
    var m21 = -m12, m22 = m11;
    var dx = -width/2*Math.cos(Math.PI/180*deg) + height/2*Math.sin(Math.PI/180*deg)+width/2, dy = -width/2*Math.sin(Math.PI/180*deg)-height/2*Math.cos(Math.PI/180*deg)+height/2;
    this.dom.style.filter = 'progid:DXImageTransform.Microsoft.Matrix(Dx='+ dx +',Dy='+ dy +',M11='+ m11 +',M12='+ m12 +',M21='+ m21 +',M22='+ m22 +')';
}
