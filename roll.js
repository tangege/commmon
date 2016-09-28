/**
 * Created by tanyonglong on 2016/9/28 0028.
 */
/**
 * ¹ö¶¯
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