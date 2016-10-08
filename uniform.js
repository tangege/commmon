/**
 * Created by Administrator on 2016/9/30 0030.
 */
/**
 * 匀速运动
 * @param obj
 * @constructor
 */
function Uniform (obj){
    this.dom = obj;
    this.timer = null;
    this.settings = {
        "speed": 10,
        "param": null,
        "callback": null
    }
}
Uniform.prototype = {
    constructor: Uniform,
    init: function (opts){
        for(var attr in opts){
            this.settings[attr] = opts[attr];
        }
        return this;
    },
    move: function (){
        var _this = this;
        if(this.settings["param"]){
            this.timer = setInterval(function () {
                for (var attr in _this.settings["param"]) {
                    var iCurren = parseInt(_this._getStyle(_this.dom, attr));
                    var speed = 0;
                    if (iCurren < _this.settings["param"][attr]) {
                        speed = Math.abs(_this.settings["speed"]);
                    } else {
                        speed = -(Math.abs(_this.settings["speed"]));
                    }
                    if (Math.abs(_this.settings["param"][attr] - iCurren) < Math.abs(speed)) {
                        clearInterval(_this.timer);
                        _this.dom.style[attr] = _this.settings["param"][attr] + 'px';
                        if (_this.settings["callback"]) {
                            _this.settings["callback"]();
                        }
                    } else {
                        _this.dom.style[attr] = (iCurren + speed) + 'px';
                    }
                }

            }, 65);
        }

    },
    _getStyle: function (obj, attr){
        return obj.currentStyle? obj.currentStyle[attr]: getComputedStyle(obj, false)[attr];
    }
}


/**
 * 函数式匀速运动
 * @param obj
 * @param opts
 * @param speed
 * @param fn
 */
function uniform(obj, opts, speed, fn) {
    clearInterval(obj.timer)
    obj.timer = setInterval(function() {
        for (var attr in opts) {
            var iCurren = parseInt(getStyle(obj, attr));
            if (iCurren < opts[attr]) {
                speed = Math.abs(speed);
            } else {
                speed = -(Math.abs(speed));
            }
            if (Math.abs(opts[attr] - iCurren) < Math.abs(speed)) {
                clearInterval(obj.timer);
                obj.style[attr] = opts[attr] + 'px';
                if (fn) {
                    fn();
                }
            } else {
                obj.style[attr] = (iCurren + speed) + 'px';
            }
        }
    }, 30);
}
function getStyle (obj, attr){
    return obj.currentStyle? obj.currentStyle[attr]: getComputedStyle(obj, false)[attr];
}