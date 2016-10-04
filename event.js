/**
 * Created by Administrator on 2016/10/2 0002.
 */
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
 * input事件
 * @param obj
 * @param fn
 */
function addOninputEvent(obj, fn) {
    addEvent(obj, "input", fn);
    addEvent(obj, "propertychange", fn);
    if(checkIE() == "IE9"){
        addEvent(obj, "cut", function () {
            setTimeout(function () {
                fn.call(obj);
            },10);
        });
        addEvent(obj, "keydown", function (e) {
            if(e.keyCode == 8 || e.keyCode == 46){
                fn.call(obj);
            }
        });
    }
}

/**
 * 检测是否ie6 7 8 9 10当中之一
 * @returns {string}
 */
function checkIE (){
    var result = "";
    var version = navigator.appVersion;
    if(version.indexOf("MSIE 6.0") >= 0){
        result = "IE6";
    }else if(version.indexOf("MSIE 7.0") >= 0){
        result = "IE7";
    }else if(version.indexOf("MSIE 8.0") >= 0){
        result = "IE8";
    }else if(version.indexOf("MSIE 9.0") >= 0){
        result = "IE9";
    }else if(version.indexOf("MSIE 10.0") >= 0){
        result = "IE10";
    }
    return result;
}


/**
 * 模仿jQuery ready事件
 */
;(function (window) {

    var addEvent = function  (obj, type, fn){
        if(obj.addEventListener){
            obj.addEventListener(type, fn, false);
        }else if(obj.attachEvent){
            obj.attachEvent("on" + type, fn);
        }else {
            obj["on" + type] = fn;
        }
    }

    var bindReady = function (callback,readyBound){
        if ( readyBound ) return;
        readyBound = true;

        if ( document.addEventListener ) {
            document.addEventListener( "DOMContentLoaded", function(){
                document.removeEventListener( "DOMContentLoaded", arguments.callee, false );
                callback();
            }, false );

        } else if ( document.attachEvent ) {
            document.attachEvent("onreadystatechange", function(){
                if ( document.readyState === "complete" ) {
                    document.detachEvent( "onreadystatechange", arguments.callee );
                    callback();
                }
            });

            if ( document.documentElement.doScroll && typeof window.frameElement === "undefined" ) (function(){
                if ( jQuery.isReady ) return;

                try {
                    document.documentElement.doScroll("left");
                } catch( error ) {
                    setTimeout( arguments.callee, 0 );
                    return;
                }
                callback();
            })();
        }

        addEvent( window, "load", callback );
    }

    var onReadyEvents = [];
    var isReady = false;
    var _onDOMContentLoaded = function (onready) {
        var readyBound = false;
        onReadyEvents.push(onready);
        function doReady(){
            if( isReady ) return;
            //确保onready只执行一次
            isReady = true;
            for(var i = 0; i < onReadyEvents.length; i++){
                onReadyEvents[i]();
            }
        }
        bindReady(doReady,readyBound);
    }

    window.onDOMContentLoaded = _onDOMContentLoaded;

})(window);