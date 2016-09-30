/**
 * Created by Administrator on 2016/9/10 0010.
 */
var tan = {};
//ʱ�����
tan.time = {};
//����ʱ���
tan.time.gettime = function(){
    return +new Date;
}


//Ԫ�ؾ���
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

/**
 * ������
 * @param target
 */
function scrollToTop(target){
    var documentevent = null;
    var flag = 0;
    var target  = target;
    document.tt = setInterval(function(){
        if(document.onclick && flag == 0){
            documentevent = document.onclick;
            flag++;
        }
        document.onclick = function (){
            clearInterval(document.tt);
            documentevent();
        }
        var iscurtop = document.documentElement.scrollTop || document.body.scrollTop;
        var speed = (target - iscurtop)/8;
        speed = speed > 0 ? Math.ceil(speed): Math.floor(speed);
        if(iscurtop == target){
            clearInterval(document.tt);
        }else {
            document.documentElement.scrollTop = document.body.scrollTop = (iscurtop + speed);
        }
    }, 25);
}