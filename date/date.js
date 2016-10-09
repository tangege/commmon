/**
 * Created by tanyonglong on 2016/10/9.
 */

//返回时间戳
function gettime(){
    return +new Date;
}

//时间对象
var tanDate = {
    settings: {
        date: new Date()
    },
    init: function (opts) {
        if(opts && opts.constructor === Object){
            this.settings["date"] = new Date(opts["date"]);
        }else if(opts && opts.constructor === String){
            this.settings["date"] = new Date(opts);
        }
        return this;
    },
    getYear: function () {
        if(this.settings["date"]){
            return this.settings["date"].getFullYear();
        }
    },
    getMonth: function () {
        if(this.settings["date"]){
            return this.addZelo(this.settings["date"].getMonth() + 1);
        }
    },
    getDate: function () {
        if(this.settings["date"]){
            return this.addZelo(this.settings["date"].getDate());
        }
    },
    getDay: function () {
        if(this.settings["date"]){
            return this.settings["date"].getDay();
        }
    },
    getHours: function () {
        if(this.settings["date"]){
            return this.addZelo(this.settings["date"].getHours());
        }
    },
    getMinutes: function () {
        if(this.settings["date"]){
            return this.addZelo(this.settings["date"].getMinutes());
        }
    },
    getSeconds: function () {
        if(this.settings["date"]){
            return this.addZelo(this.settings["date"].getSeconds());
        }
    },
    getTime: function () {
        if(this.settings["date"]){
            return +this.settings["date"];
        }
    },
    addZelo: function (n) {
        return (parseInt(n) < 10 && parseInt(n) >= 0) ? '0' + n : n;
    },
    date: function (formate) {
        var formateStr = "-";
        var dateArr = [this.getYear(),this.getMonth(),this.getDate()];
        if(formate){
            formateStr = formate;
        }
        return this.formate(dateArr, formateStr);
    },
    formate: function (arr, formatestr) {
        try {
            if(arguments.length === 2 && arr.constructor === Array && formatestr.constructor === String){
                return arr.join(formatestr);
            }
        }catch (e) {
            throw new Error(e);
        }
    },
    time: function (formate) {
        var formateStr = ":";
        var timeArr = [this.getHours(),this.getMinutes(),this.getSeconds()];
        if(formate){
            formateStr = formate;
        }
        return this.formate(timeArr, formateStr);
    },
    day: function (arr) {
        var dayArr = ["星期日","星期一","星期二","星期三","星期四","星期五","星期六"];
        if(arr && arr.constructor === Array && arr.length === 7){
            dayArr = arr;
        }
        return dayArr[this.getDay()];
    }
}