/**
 * Created by Administrator on 2016/9/28 0028.
 */
function startMove(obj,attr,target){
    clearInterval(obj.tt);
    obj.tt=setInterval(function(){
        var iscurr=0;
        if(attr=='opacity'){
            iscurr=parseInt(parseFloat(getstyle(obj,attr))*100);
        }else{
            iscurr=parseInt(getstyle(obj,attr));
        }
        var speed=(target-iscurr)/8;
        speed=speed>0?Math.ceil(speed):Math.floor(speed);
        if(target==iscurr){
            clearInterval(obj.tt);
        }else{
            if(attr=='opacity'){
                obj.style.filter='alpha(opacity='+(iscurr+speed)+')';
                obj.style.opacity=(iscurr+speed)/100;
            }else{
                obj.style[attr]=(iscurr+speed)+'px';
            }
        }
    },30)
}
function getstyle(obj,attr){
    if(obj.currentStyle){
        return obj.currentStyle[attr];
    }else{
        return getComputedStyle(obj,false)[attr];
    }
}
