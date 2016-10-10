/**
 * Created by Administrator on 2016/10/10 0010.
 */
function ajax (opts) {
    var xmlhttp;
    var settings = {
        url: "",
        type: "GET",
        async: true,
        cache: true,
        data: null
    };
    var serialize = function (obj) {
        var result = [];
        if(obj.constructor === "Object"){
            for (var attr in obj){
                result.push(attr + "=" + obj[attr]);
            }
        }
        return result.join("&");
    };
    if(opts){
        for (var attr in opts){
            settings[attr] = opts[attr];
        }
    }else {
        throw new Error("need some arguments!!");
    }
    if(settings["url"] === ""){
        throw new Error("argument 'url' must be need!!!");
    }

    if(settings["type"].toUpperCase() === "GET"){

    }


    if (window.XMLHttpRequest) {// code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp = new XMLHttpRequest();
    }else {// code for IE6, IE5
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange = function(){
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200){
            if(settings["callback"]){
                settings["callback"].call(this, xmlhttp.responseText);
            }
        }
    }
    xmlhttp.open(settings["type"],"ajax_info.txt", settings["async"]);
    xmlhttp.send();

}