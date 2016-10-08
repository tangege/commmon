/**
 * Created by tanyonglong on 2016/10/8.
 */
var scrollToOthterMachine = {
    timer: null,
    settings: {
        target: 0,
        event: null
    },
    init: function(opts){
        if(opts){
            for(var attr in opts){
                this.settings[attr] = opts[attr];
            }
        }
        if(this.settings["event"] == null){
            throw new Error("argument 'event' must be need!!!!!");
        }else {
            var event = this.settings["event"] || event;
            event.stopPropagation? event.stopPropagation():event.cancelBubble = true;
        }
        if(this.settings["target"] < 0){
            this.settings["target"] = 0;
        }
        this.move();
    },
    move: function(){

        this.stop();
        var _this = this;
        this.addEvent();
        this.timer = setInterval(function(){
            var iscurtop = document.documentElement.scrollTop || document.body.scrollTop;
            var speed = (_this.settings["target"] - iscurtop)/8;
            speed = speed > 0 ? Math.ceil(speed): Math.floor(speed);
            var clientHeight = document.documentElement.clientHeight || document.body.clientHeight;
            if(document.body.offsetHeight - iscurtop - clientHeight == 0){
                _this.stop();
            }else if(iscurtop == _this.settings["target"]){
                _this.stop();
            }else {
                document.documentElement.scrollTop = document.body.scrollTop = (iscurtop + speed);
            }

        }, 25);
    },
    stop: function(){
        if(this.timer){
            clearInterval(this.timer);
        }
    },
    addEvent: function (){

        var _this = this;
        function clickEvent (e){
            var e = e || event;
            _this.stop.call(_this);
            if(document.detachEvent){
                document.detachEvent(e.type, arguments.callee);
            }else {
                document.removeEventListener(e.type, arguments.callee, false);
            }
        }
        if(document.attachEvent){
            document.attachEvent( "onclick" , clickEvent);
        }else {
            document.addEventListener( "touchstart" , clickEvent , false);
            document.addEventListener( "click" , clickEvent , false);
        }

    }
}