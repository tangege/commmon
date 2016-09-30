/**
 * Created by Administrator on 2016/9/10 0010.
 */
var tan = {};

tan.time = {};

tan.time.gettime = function(){
    return +new Date;
}




tan.center = function (obj){
    if(obj){
        var objwidth = obj.offsetWidth;
        var objheight = obj.offsetHeight;
        var windowwidth = document.documentElement.clientWidth || document.body.clientWidth;
        var windowheight = document.documentElement.clientHeight || document.body.clientHeight;
        var centerx = (windowwidth - objwidth) / 2;
        var centery = (windowheight - objheight) / 2;
        obj.style.left = centerx + 'px';
        obj.style.top = centery + 'px';
    }
}
