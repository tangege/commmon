/**
 * Created by Administrator on 2016/9/10 0010.
 */

//返回时间戳
function gettime(){
    return +new Date;
}
//元素居中
function center (obj){
    if(obj){
        var objwidth = obj.offsetWidth;
        var objheight = obj.offsetHeight;
        var windowwidth = document.documentElement.clientWidth || document.body.clientWidth;
        var windowheight = document.documentElement.clientHeight || document.body.clientHeight;
        var centerx = (windowwidth - objwidth) / 2 - obj.offsetLeft;
        var centery = (windowheight - objheight) / 2 - obj.offsetTop;
        obj.style.left = centerx + 'px';
        obj.style.top = centery + 'px';
    }
}

/**
 * 随机数
 * @param start 开始数
 * @param end 结束数
 * @returns {*} 返回开始数与结束数之间的一个随机数
 */
function random (start, end){
    return Math.floor(Math.random()*(end - start + 1)) + start;
}

/**
 * hover事件
 * @param obj
 * @param fnenter 鼠标进入事件
 * @param fnleve 鼠标离去事件
 */
function hover (obj, fnenter, fnleve){
    if(fnenter){
        addEvent(obj, "mouseenter", fnenter);
    }
    if(fnleve){
        addEvent(obj, "mouseleave", fnleve);
    }
}

/**
 * 注册事件
 * @param obj
 * @param type
 * @param fn
 */
function addEvent (obj, type, fn){
    if(obj.addEventListener){
        obj.addEventListener(type, fn, false);
    }else if(obj.attachEvent){
        obj.attachEvent("on" + type, fn);
    }else {
        obj["on" + type] = fn;
    }
}

/**
 * 取消注册事件
 * @param obj
 * @param type
 * @param fn
 */
function removeEvent (obj, type, fn){
    if(obj.removeEventListener){
        obj.removeEventListener(type, fn, false);
    }else if(obj.detachEvent){
        obj.detachEvent("on" + type, fn);
    }else {
        obj["on" + type] = null;
    }
}

/**
 * 缓冲运动
 * @param obj
 * @param json
 * @param fn
 */
function bufferMove(obj, json, fn) {
    clearInterval(obj.timer)
    obj.timer = setInterval(function() {
        for (var attr in json) {
            var isOver = false;
            var iCurren;
            if (attr == 'opacity') {
                iCurren = parseInt(parseFloat(getStyle(obj, attr)).toFixed(2) * 100);
            } else {
                iCurren = parseInt(getStyle(obj, attr));
            }
            var speed = (json[attr] - iCurren) / 8;
            speed = speed < 0 ? Math.floor(speed) : Math.ceil(speed);

            if (iCurren == json[attr]) {
                isOver = true;
            } else {
                if (attr == 'opacity') {
                    obj.style.filter = "alpha(opacity=" + (iCurren + speed) + ")";
                    obj.style.opacity = (iCurren + speed) / 100;
                } else {
                    obj.style[attr] = iCurren + speed + 'px';
                }
            }
        }
        if (isOver) {
            clearInterval(obj.timer);
            if (fn) {
                fn();
            }
        }

    }, 30);

}

/**
 * 获取样式
 * @param obj
 * @param attr
 * @returns {*}
 */
function getStyle (obj, attr){
    return obj.currentStyle ? obj.currentStyle[attr] : getComputedStyle(obj, false)[attr];
}