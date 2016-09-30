/**
 * Created by Administrator on 2015/12/7.
 */
var tooltips={
    gettitle:function(){
        var result=[];
        var all=document.body.getElementsByTagName('*');
        for(var i=0;i<all.length;i++){
            if(all[i].title){
                result.push(all[i]);
            }
        }
        return result;
    },
    tooltips:function(ev){
        var text=this.title;
        this.title='';
        this.data=text;
        if(text){
            var ev=ev||event;
            var px=0;
            var py=0;
            if(ev.pageX===undefined){
                var sleft=document.documentElement.scrollLeft||document.body.scrollLeft;
                var stop=document.documentElement.scrollTop||document.body.scrollTop;
                px=ev.x+sleft;
                py=ev.y+stop;
            }else{
                px=ev.pageX;
                py=ev.pageY;
            }
            if(!document.getElementById('tooltip')){
                var sp=document.createElement('span');
                sp.style.position='absolute';
                sp.style.backgroundColor='red';
                sp.id="tooltip";
                document.body.appendChild(sp);
            }else{
                var sp=document.getElementById('tooltip');
            }
            sp.innerHTML=text;
            sp.style.left=(px+10)+'px';
            sp.style.top=(py+5)+"px";
            sp.style.display='block';
        }
        return false;
    },
    init:function(){
        var ot=this.gettitle();
        for(var i=0;i<ot.length;i++){
            ot[i].onmouseover=this.tooltips;
            ot[i].onmouseout=function(){
                this.title=this.data;
                var sp=document.getElementById('tooltip');
                sp.style.display='none';
            };
        }
    }
}.init();
