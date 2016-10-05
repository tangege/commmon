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


