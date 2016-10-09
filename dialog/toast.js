/**
 * Created by Administrator on 2016/9/28 0028.
 */
//Toast
function Toast (){
    this.toastDom = null;
    this.settings = {
        "id": "toast",
        "width": 100,
        "text": "这是我的Toast！",
        "destroy": 3000
    };
    this.timer = null;
    this.isRunning = false;
}
Toast.prototype.open = function (opts){
    if(opts){
        for(var x in opts){
            this.settings[x] = opts[x];
        }
    }
    if(this.isRunning){
        clearTimeout(this.timer);
    }
    this.init();
}
Toast.prototype.init = function (){
    var _this = this;
    var element = document.getElementById(this.settings['id']);
    if(element){
        this.toastDom = element;
    }else {
        element = document.createElement('div');
        element.id = this.settings['id'];
        element.style.position = 'fixed';
        element.style.left = 0;
        element.style.top = 0;
        element.style.background = 'rgba(0,0,0,.5)';
        element.style.borderRadius = '6px';
        element.style.textAlign = 'center';
        element.style.padding = '3%';
        element.style.color = '#fff';
        element.style.zIndex = 999999;
        document.body.appendChild(element);
        this.toastDom = element;
    }
    this.toastDom.style.display = 'block';
    element.style.width = this.settings['width'] + 'px';
    element.innerHTML = this.settings['text'];
    this.center();
    window.onresize = function(){
        _this.center();
    }
    this.destroy();
}
Toast.prototype.center = function (){
    if(this.toastDom){
        var objwidth = this.toastDom.offsetWidth;
        var objheight = this.toastDom.offsetHeight;
        var windowwidth = document.body.clientWidth || document.documentElement.clientWidth;
        var windowheight = document.body.clientHeight || document.documentElement.clientHeight;
        var centerx = (windowwidth - objwidth) / 2;
        var centery = (windowheight - objheight) / 2;
        this.toastDom.style.left = centerx + 'px';
        this.toastDom.style.top = centery + 'px';
    }
}
Toast.prototype.destroy = function(){
    if(this.toastDom){
        var _this = this;
        this.isRunning = true;
        this.timer = setTimeout(function(){
            _this.toastDom.style.display = 'none';
            this.isRunning = false;
            if(_this.settings['destroyfn']){
                _this.settings['destroyfn']();
            }
        },this.settings['destroy']);
    }
}
