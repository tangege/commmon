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
 * 继承
 */
var extend = (function(){
    var e = function(sub , sup){
        var F = new Function();
        F.prototype = sup.prototype;
        sub.prototype = new F();
        sub.prototype.constructor = sub;
        sub.supClass = sup.prototype;
        if(sup.prototype.constructor == Object.prototype.constructor){
            sup.prototype.constructor = sup;
        }
    }

    return function(sub,sup){
        e(sub,sup);
    };

})();


/**
 * 接口
 * @param name
 * @param methods
 * @constructor
 */
function Interface (name ,methods){
    if(arguments.length != 2){
        throw new Error('Interface constructor called with ' + arguments.length
            + 'arguments, but expected exactly 2.');
    }
    this.name = name;
    this.methods = [];
    for(var i = 0;i < methods.length;i++){
        if(typeof methods[i] != 'string'){
            throw new Error('Interface constructor expected method names to be '
                + 'passed in as a string.');
        }
        this.methods.push(methods[i]);
    }
}
Interface.ensureImplements = function(object){
    if(arguments.length < 2){
        throw new Error("Function Interface.ensureImplements called with " + arguments.length
            + " arguments, but expected at least 2.");
    }
    for(var i = 1,len = arguments.length;i < len;i++){
        var interface = arguments[i];
        if(interface.constructor != Interface){
            throw new Error("Function Interface.ensureImplements expects arguments "
                + "two and above to be instances of Interface.");
        }
        for(var j = 0,methodslen = interface.methods.length;j < methodslen;j++){
            var method = interface.methods[j];
            if(!object[method] || typeof object[method] !== 'function'){
                throw new Error("Function Interface.ensureImplements: object " +
                    "does not implements the " + interface.name + " interface.Method " +
                    method + " was not found.");
            }
        }
    }
}


/**
 * 扩展Array的原型对象 添加变量数组的每一个元素,并让每一个元素都执行fn函数 (可变量多维数组)
 * @param {Object} fn
 */
Array.prototype.each = function(fn){
    try{
        //1 目的： 遍历数组的每一项 //计数器 记录当前遍历的元素位置
        this.i || (this.i=0);  //var i = 0 ;
        //2 严谨的判断什么时候去走each核心方法
        // 当数组的长度大于0的时候 && 传递的参数必须为函数
        if(this.length >0 && fn.constructor == Function){
            // 循环遍历数组的每一项
            while(this.i < this.length){    //while循环的范围
                //获取数组的每一项
                var e = this[this.i];
                //如果当前元素获取到了 并且当前元素是一个数组
                if(e && e.constructor == Array){
                    // 直接做递归操作
                    e.each(fn);
                } else {
                    //如果不是数组 （那就是一个单个元素）
                    // 这的目的就是为了把数组的当前元素传递给fn函数 并让函数执行
                    //fn.apply(e,[e]);
                    fn.call(e,e);
                }
                this.i++ ;
            }
            this.i = null ; // 释放内存 垃圾回收机制回收变量
        }

    } catch(ex){
        // do something
    }
    return this ;
}


/**
 * 选择器
 */
;(function (window) {

    function _Operation (){
        this.dom = [];
        this.originDom = [];
    }
    _Operation.prototype.init = function (arg) {
        if(arg.charAt(0) == "#"){
            //id
            this.originDom = this.dom = this.getId(arg.substring(1));
        }else if(arg.charAt(0) == "."){
            //class
            this.originDom = this.dom = this.getByClass(arg.substring(1));
        }else {
            //tag
            this.originDom = this.dom = this.getByTage(arg);
        }
        return this;
    }
    _Operation.prototype.getId = function (id) {
        if(id){
            return [document.getElementById(id)];
        }else {
            throw new Error('you must need an id argument');
        }
    }
    _Operation.prototype.getByClass = function (classname, oParent) {
        if(!oParent){
            oParent = document;
        }
        var resultElement = [];
        var e = oParent.getElementsByTagName("*");
        for (var i = 0; i < e.length; i++) {
            var calssnames =  e[i].className.split(" ");
            if(calssnames && calssnames.length){
                for( var j = 0, len = calssnames.length; j < len; j++){
                    if (calssnames[j] == classname) {
                        resultElement.push(e[i]);
                    }
                }
            }

        }
        return resultElement;
    }
    _Operation.prototype.getByTage = function (tag) {
        if(tag){
            var elements = document.getElementsByTagName(tag);
            return this.makeArray(elements);
        }else {
            throw new Error('you must need an tag argument');
        }
    }
    _Operation.prototype.css = function (opts) {
        this.each(this.dom, function (index, value) {
            for(var attr in opts){
                this.style[attr] = opts[attr];
            }
        })
    }
    _Operation.prototype.each = function (obj, fn) {
        for(var x in obj){
            fn.call(obj[x], x, obj[x]);
        }
    }
    _Operation.prototype.makeArray = function (elementobjs) {
        var result = []
        this.each(elementobjs, function (index, obj) {
            result.push(this);
        })
        return result;
    }
    _Operation.prototype.get = function (index) {
        if(typeof index === 'undefined'){
            return this.dom;
        }else {
            return this.dom[index];
        }
    }
    _Operation.prototype.eq = function (index) {
        if(typeof index === 'undefined'){
            throw new Error("argument 'index' must be need! ");
        }else {
            this.dom = [this.originDom[index]];
            return this;
        }
    }

    function _out (arg){
        return new _Operation().init(arg);
    }

    window.oPeration = window.$ = _out;

})(window);


/**
 * 格式化字符串 12345678 》》 12,345,678
 * @param value
 * @returns {String|string}
 */
function formateData (value){
    try {
        var data = value + "";
        var len = parseInt(data.length/3) + 1;
        var result = data.substring(0,(data.length%3));
        for( var i = 1; i < len; i++ ){
            result += "，" +  data.substring((data.length%3) + (3*(i - 1)), (data.length%3) + (3*(i - 1)) + 3);
        }
        return result;
    }catch (e){
        throw new Error(e);
    }
}

//是否数字
function isNumber (value) {
    if(typeof value === "number"){
        return true;
    }else if(typeof value === "object" && value.constructor === Number){
        return true;
    }else {
        return false;
    }
}
//是否字符串
function isString (value) {
    if(typeof value === "string"){
        return true;
    }else if(typeof value === "object" && value.constructor === String){
        return true;
    }else {
        return false;
    }
}
//是否数组
function isArray (value) {
    if( value.constructor === Array ){
        return true;
    }else {
        return false;
    }
}
//是否函数
function isFunction (value) {
    if( typeof value === "function" ){
        return true;
    }else {
        return false;
    }
}
//判断空对象
function isEmptyObject (obj) {
    var t;
    for (t in obj)
        return !1;
    return !0
}

//获取url参数 值
var URL = {
    settings: {
        url: "",
    },
    init: function (opts) {
        try {
            if(opts){
                for(var attr in opts){
                    this.settings[attr] = opts[attr];
                }
            }
            if( this.settings["url"] === "" ) {
                this.settings["url"] = window.location;
            }
        }catch (e) {
            throw new Error(e);
        }
        return this;
    },
    getHash: function () {
        return this.settings["url"].hash;
    },
    getHost: function () {
        return this.settings["url"].host;
    },
    getHostName: function () {
        return this.settings["url"].hostname;
    },
    getHref: function () {
        return this.settings["url"].href;
    },
    getPathName: function () {
        return this.settings["url"].pathname;
    },
    getPort: function () {
        return this.settings["url"].port;
    },
    getProtocol: function () {
        return this.settings["url"].protocol;
    },
    getSearch: function () {
        return this.settings["url"].search;
    },
    getPameters: function (pameter) {
        var query = "";
        if(typeof this.settings["url"] === "string"){
            var url = this.settings["url"];
            var end = url.length;
            if(url.lastIndexOf("#") > -1){
                end = url.lastIndexOf("#");
            }
            query = this.settings["url"].substring( url.indexOf("?"), end );
        }else {
            query = this.getSearch();
        }
        var result = {};
        if(query){
            var queryArray = query.substring(1).split("&");
            for(var i = 0,len = queryArray.length; i < len; i++){
                var queryArr = queryArray[i].split("=");
                result[queryArr[0]] = queryArr[1];
            }
        }
        if(pameter){
            return this.isEmptyObject(result)? null: result[pameter];
        }else {
            return result;
        }
    },
    isEmptyObject: function (obj) {
        var t;
        for (t in obj)
            return !1;
        return !0
    }
}

//设置cookie
function setCookie (cname, cvalue, exSeconds) {
    var d = new Date();
    d.setSeconds(d.getSeconds() + exSeconds);
    var expires = "expires=" + d.toString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
}
//获取cookie
function getCookie (cname) {
    var cookies = document.cookie.split(';');
    for (var i = 0; i < cookies.length; i++) {
        var arr = cookies[i].split("=");
        if (arr[0] == cname) {
            return arr[1];
        }
    }
    return "";
}
//清除cookie
function clearCookie (name) {
    document.cookie = name + "=" + "" + "; expires=-1";
}


/**
 * map
 * @constructor
 */
function Map () {
    this.obj = new Object();
}
Map.prototype.put = function (key, value) {
    try {
        this.obj[key] = value;
    }catch (e){
        throw new Error(e);
    }
}
Map.prototype.get = function ( key ) {
    try {
        if(typeof this.obj[key] === "undefined"){
            return null;
        }
        return this.obj[key];
    }catch (e){
        throw new Error(e);
    }
}
Map.prototype.remove = function ( key ) {
    try {
        if(typeof this.obj[key] !== "undefined"){
            delete this.obj[key];
        }
    }catch (e){
        throw new Error(e);
    }
}
Map.prototype.each = function ( fn ) {
    try {
        if(fn && typeof fn === "function"){
            for ( var attr in this.obj ){
                fn.call(this, attr, this.obj[attr]);
            }
        }
    }catch (e){
        throw new Error(e);
    }
}