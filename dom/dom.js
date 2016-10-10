/**
 * Created by Administrator on 2016/10/9 0009.
 */

//id
function id (id) {
    return document.getElementById(id);
}

//class
function getByClass (classname, oparent ){
    var result = [];
    var parentElement = oparent || document;
    var children = parentElement.getElementsByTagName("*");
    if(children && children.length){
        for(var i = 0, len = children.length; i < len; i++){
            var elementClasses = children[i].className.split(" ");
            if(elementClasses && elementClasses.length){
                for(var j = 0, classeslen = elementClasses.length; j < classeslen; j++){
                    if(elementClasses[j] === classname){
                        result.push(children[i]);
                        break;
                    }
                }
            }
        }
    }
    return result;
}
//tag
function tag (tag) {
    return document.getElementsByTagName(tag);
}

//获取元素的所有类
function getClass (obj) {
    var result = []
    var classes = obj.className.split(" ");
    if(classes && classes.length){
        for(var i = 0, len = classes.length; i < len; i++){
            result.push(classes[i]);
        }
    }
    return result;
}

//是否有某个类
function hasClass (obj, classname){
    var result = getClass(obj);
    if(result.length){
        return isInArray(result, classname);
    }
}

//添加类
function addClass (obj, classname) {
    var addClasses = classname.split(" ");
    var result = getClass(obj);
    if(addClasses && addClasses.length){
        for (var i = 0, len = addClasses.length; i < len; i++){
            if(!hasClass(obj, addClasses[i])){
                result.push(addClasses[i]);
            }
        }
    }
    obj.className = result.join(" ");
}

//删除类
function removeClass (obj, classname) {
    var removeClasses = classname.split(" ");
    var result = getClass(obj);
    if(removeClasses && removeClasses.length){
        for (var i = 0, len = removeClasses.length; i < len; i++){
            removeValue(result, removeClasses[i]);
        }
    }
    obj.className = result.join(" ");
}


function indexOf (arr, value) {
    try {
        var result = []
        for (var i = 0, len = arr.length; i < len; i++){
            if(value === arr[i]){
                result.push(i);
            }
        }
        return result;
    }catch (e) {
        throw new Error(e);
    }
}

function isInArray (arr, value) {
    return indexOf.call(this, arr, value).length? true: false;
}

function removeValue (arr, value) {
    var indexs = indexOf(arr, value);
    if(indexs.length){
        for (var i = indexs.length - 1; i >= 0 ; i--){
            arr.splice(indexs[i],1);
        }
        return true;
    }else {
        return false;
    }
}

//获取第一个子元素
function firstChild ( obj ) {
    var children = obj.children;
    if(children && children.length) {
        return children[0];
    }
    return null;
}
//获取最后一个子元素
function lastChild ( obj ) {
    var children = obj.children;
    if(children && children.length) {
        return children[children.length - 1];
    }
    return null;
}
//获取下一个元素
function nextElement ( obj ) {
    if (obj.nextSibling.nodeType === 1){
        return obj.nextSibling;
    }else {
        return arguments.callee(obj.nextSibling);
    }
}

//获取前一个元素
function prevElement ( obj ) {
    if (obj.previousSibling.nodeType === 1){
        return obj.previousSibling;
    }else {
        return arguments.callee(obj.previousSibling);
    }
}
//获取兄弟元素
function siblings (obj) {
    var result = [];
    console.log(obj.children);
    var children = obj.parentNode.children;
    if(children && children.length){
        for (var i = 0, len = children.length; i < len; i++){
            if(children[i] !== obj){
                result.push(children[i]);
            }
        }
    }
    return result;
}

/**
 * 追加元素
 * @param obj 父元素
 * @param args 要追加的元素 可以是字符串 可以是dom
 */
function append (obj, args) {
    if( typeof args === "string"){
        obj.innerHTML += args;
    }else if ( typeof args === "object"){
        obj.appendChild(args);
    }
}

/**
 * 在父元素内部的前面追加元素
 * @param obj 父元素
 * @param args 要追加的元素 可以是字符串 可以是dom
 */
function preAppend (obj, args) {
    if( typeof args === "string"){
        obj.innerHTML = args + obj.innerHTML;
    }else if ( typeof args === "object"){
        obj.insertBefore(args, obj.firstChild);
    }
}

/**
 * 元素之后添加元素
 * @param obj
 * @param args
 */
function after (obj, args) {
    if( typeof args === "string"){
        var o = document.createElement("div");
        arguments.callee.call(this, obj, o);
        o.outerHTML = args;
    }else if ( typeof args === "object"){
        obj.parentNode.insertBefore(args, obj.nextSibling);
    }
}

/**
 * 元素之前添加元素
 * @param obj
 * @param args
 */
function before (obj, args) {
    if( typeof args === "string"){
        var o = document.createElement("div");
        arguments.callee.call(this, obj, o);
        o.outerHTML = args;
    }else if ( typeof args === "object"){
        obj.parentNode.insertBefore(args, obj);
    }
}

/**
 * 替换节点
 * @param obj
 * @param args
 */
function replace (obj, args) {
    if( typeof args === "string"){
        var o = document.createElement("div");
        arguments.callee.call(this, obj, o);
        o.outerHTML = args;
    }else if ( typeof args === "object"){
        obj.parentNode.replaceChild(args, obj);
    }
}

/**
 * 删除节点
 * @param obj
 */
function removeElement (obj) {
    obj.parentNode.removeChild(obj);
}

/**
 * 获取元素距离页面顶部和左边的距离
 * @param obj
 * @returns {{top: (Number|number), left: (Number|number)}}
 */
function offset (obj) {
    var top = obj.offsetTop;
    var left = obj.offsetLeft;
    while (obj.offsetParent !== document.body){
        top += obj.offsetParent.offsetTop;
        left += obj.offsetParent.offsetLeft;
        obj = obj.offsetParent;
    }
    return {
        top: top,
        left: left
    };
}

/**
 * 相对父元素的top和left
 * @param obj
 * @returns {{top: (Number|number), left: (Number|number)}}
 */
function position (obj) {
    var top = obj.offsetTop;
    var left = obj.offsetLeft;
    return {
        top: top,
        left: left
    };
}