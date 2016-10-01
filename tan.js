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
 * 获取样式
 * @param obj
 * @param attr
 * @returns {*}
 */
function getStyle (obj, attr){
    return obj.currentStyle ? obj.currentStyle[attr] : getComputedStyle(obj, false)[attr];
}