/**
 * Created by tanyonglong on 2016/9/26.
 *
 * 倒计时
 *
 * distime 距离的秒数
 * callback 倒计时回调函数
 * overFn 倒计时结束函数
 *
 */
function TimeMachine (){
    this.CTTime = null;
    this.timer = null;
    this.callback = null;
    this.distime = 0;
    this.overFn = null;
}
TimeMachine.prototype.countDown = function (opts){
    var _this = this;
    this.distime = opts['distime'];
    this.callback = opts['callback'] || null;
    this.overFn = opts['overFn'] || null;
    this.timer = setInterval(function(){
        _this.distime--;
        _this.getCountDownTime();
    },1000);
    this.getCountDownTime();
};
TimeMachine.prototype.getCountDownTime = function (){
    if(this.distime <= 0){
        this.distime = 0;
        clearInterval(this.timer);
    }
    var disdays = parseInt(this.distime / (3600 * 24));
    var dishours = parseInt((this.distime - disdays * 3600 * 24) / 3600);
    var disminites = parseInt((this.distime - disdays * 3600 * 24 - dishours * 3600) / 60);
    var disseconds = parseInt(this.distime - disdays * 3600 * 24 - dishours * 3600 - disminites * 60);
    this.CTTime = {
        "disdays": this.addZelo(disdays),
        "dishours": this.addZelo(dishours),
        "disminites": this.addZelo(disminites),
        "disseconds": this.addZelo(disseconds)
    };
    if(this.callback){
        this.callback(this.CTTime);
    }
    if(this.distime === 0 && this.overFn){
        this.overFn();
    }
};
TimeMachine.prototype.addZelo = function(n){
    return (parseInt(n) < 10 && parseInt(n) >= 0) ? '0' + n : n;
};
