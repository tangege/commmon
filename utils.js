/**
 * Created by Administrator on 2016/9/30 0030.
 */
var Tan = {};

/**
 *随机数
 * @param {Object} start
 * @param {Object} end
 */
Tan.random = function(start, end) {
    var num = Math.floor(Math.random() * (end - start + 1) + start);
    return num;
}

/**
 * 鼠标经过
 * @param {Object} obj
 * @param {Object} fnhver
 * @param {Object} fnout
 */
Tan.hover = function(obj, fnhver, fnout) {
    if (obj) {
        if (fnhver) {
            obj.onmouseover = fnhver;
        }
        if (fnout) {
            obj.onmouseout = fnout;
        }
    }
}

/**
 *匀速运动
 * @param {Object} obj
 * @param {Object} target
 */
Tan.move = function(obj, json, speed, fn) {
    clearInterval(obj.timer)
    obj.timer = setInterval(function() {
        for (var attr in json) {
            var iCurren = parseInt(Tan.getStyle(obj, attr));
            if (iCurren < json[attr]) {
                speed = Math.abs(speed);
            } else {
                speed = -(Math.abs(speed));
            }
            if (Math.abs(json[attr] - iCurren) < Math.abs(speed)) {
                clearInterval(obj.timer);
                obj.style[attr] = json[attr] + 'px';
                if (fn) {
                    fn();
                }
            } else {
                obj.style[attr] = (iCurren + speed) + 'px';
            }
        }
    }, 30);
}


/**
 *缓冲运动
 * @param {Object} obj
 * @param {Object} json
 * @param {Object} fn
 */
Tan.bufferMove = function(obj, json, fn) {

    clearInterval(obj.timer)
    obj.timer = setInterval(function() {
        for (var attr in json) {
            var isOver = false;
            var iCurren;
            if (attr == 'opacity') {
                iCurren = parseInt(parseFloat(Tan.getStyle(obj, attr)).toFixed(2) * 100);
            } else {
                iCurren = parseInt(Tan.getStyle(obj, attr));
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
 *获取样式
 * @param {Object} obj
 * @param {Object} attr
 */
Tan.getStyle = function(obj, attr) {
    return obj.currentStyle ? obj.currentStyle[attr] : getComputedStyle(obj, false)[attr];
}

/**
 *显示
 * @param {Object} obj
 */
Tan.show = function(obj) {
    obj.style.display = 'block';
}

/**
 *隐藏
 * @param {Object} obj
 */
Tan.hide = function(obj) {
    obj.style.display = 'none';
}

/**
 *添加input事件
 * @param {Object} obj
 * @param {Object} fn
 */
Tan.addOninputEvent = function(obj, fn) {
    if (obj.onpropertychange) {
        obj.onpropertychange = fn;
    } else {
        obj.oninput = fn;
    }
}


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

/**
 * 注册事件
 * @param obj
 * @param type
 * @param fn
 */
Tan.addEvent=function(obj,type,fn){
    if(obj.addEventListener){
        obj.addEventListener(type,fn,false);
    }else if(obj.attachEvent){
        obj.attachEvent('on'+type,fn);
    }
}
