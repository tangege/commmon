/**
 * Created by Administrator on 2016/9/30 0030.
 */
//设置cookie
Tan.setCookie = function(cname, cvalue, exdays) {
    var d = new Date();
    d.setDate(d.getDate() + exdays);
    var expires = "expires=" + d.toString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
    console.log(document.cookie);
}
//获取cookie
Tan.getCookie = function(cname) {
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
Tan.clearCookie = function(name) {
    document.cookie = name + "=" + "" + "; expires=-1";
}
/**
 *获取类元素
 * @param {Object} oParent
 * @param {Object} classname
 */
Tan.getByClass = function(oParent, classname) {
    var resultElement = [];
    var e = oParent.getElementsByTagName("*");
    for (var i = 0; i < e.length; i++) {
        if (e[i].className == classname) {
            resultElement.push(e[i]);
        }
    }
    return resultElement;
}

/**
 *获取元素的下一个元素
 * @param {Object} obj
 */
Tan.getNext = function(obj) {
    var nextElement = null;
    while (obj.nextSibling) {
        if (obj.nextSibling.nodeType == 1) {
            nextElement = obj.nextSibling;
            break;
        } else {
            obj = obj.nextSibling;
        }
    }
    return nextElement;
}
/**
 *获取元素的前一个元素
 * @param {Object} obj
 */
Tan.getPrev=function(obj){
    var prevElement = null;
    while (obj.previousSibling) {
        if (obj.previousSibling.nodeType == 1) {
            nextElement = obj.previousSibling;
            break;
        } else {
            obj = obj.previousSibling;
        }
    }
    return prevElement;
}

/**
 * 获取某个元素的子元素
 * @param obj
 * @param tag
 * @returns {Array}
 */
Tan.getChild=function(obj,tag){
    var result=[];
    if(tag){
        for (var i = 0; i < obj.children.length; i++) {
            if(obj.children[i].nodeName.toLowerCase() == tag.toLowerCase()){
                result.push(obj.children[i]);
            }
        }
    }else{
        result= obj.children;
    }
    return result;
}
