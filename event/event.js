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


/**
 * 绑定事件带参数 解绑
 * @type {{cache: null, bind: events.bind, unbind: events.unbind, _save: events._save, _delete: events._delete, _get: events._get, _isInArray: events._isInArray}}
 */

var events = {
    cache: null,
    bind: function (obj, type, fn, args){
        try{
            var eventHander = fn;
            if(args){
                if(args.constructor == Array){
                    //数组
                    eventHander = function (e){
                        fn.apply(obj, args);
                    }
                }else {
                    //多个参数
                    var fnArgs = [];
                    for(var i = 3, len = arguments.length; i < len; i++){
                        fnArgs.push(arguments[i]);
                    }
                    eventHander = function (e){
                        fn.apply(obj, fnArgs);
                    }
                }
            }
            if(window.attachEvent){//IE
                obj.attachEvent("on" + type, eventHander );
            }else{//FF
                obj.addEventListener(type, eventHander, false);
            }
            this._save(obj, type, fn, eventHander);

        }catch (e) {
            throw new Error(e);
        }
    },
    unbind: function (obj, type, fn){
        var typeEventArr = this._get(obj, type, fn);
        if(typeEventArr.length){
            if(window.detachEvent){//IE
                obj.detachEvent("on" + type, typeEventArr[2] );
            }else{//FF
                obj.removeEventListener(type, typeEventArr[2], false);
            }
            this._delete(obj, type, fn);
        }
    },
    _save: function (obj, type, fn, otherFN){
        this.cache = this.cache || {};
        this.cache[type] = this.cache[type] || [];
        if(this._isInArray(obj, type, fn) === -1){
            this.cache[type].push([obj, fn, otherFN]);
        }
    },
    _delete: function (obj, type, fn) {
        var flag = false;
        if(this._isInArray(obj, type, fn) !== -1){
            this.cache[type].splice(this._isInArray(obj, type, fn),1);
            flag = true;
        }
        return flag;
    },
    _get: function (obj, type, fn) {
        var result = [];
        if(this._isInArray(obj, type, fn) !== -1){
            result = this.cache[type][this._isInArray(obj, type, fn)];
        }
        return result;
    },
    _isInArray: function (obj, type, fn) {
        if(this.cache){
            if(this.cache[type]){
                for( var i = 0,len = this.cache[type].length;i < len;i++ ){
                    var o = this.cache[type][i][0];
                    var f = this.cache[type][i][1];
                    if(o == obj && f == fn){
                        return i;
                    }
                }
            }
        }
        return -1;
    }
}

//阻止冒泡行为
function stopPropagation (event) {
    event.stopPropagation? event.stopPropagation(): event.cancelBubble = true;
}
//阻止默认行为
function preventDefault (event) {
    event.preventDefault? event.preventDefault(): event.returnValue = false;
}