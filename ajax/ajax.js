/**
 * Created by Administrator on 2016/10/10 0010.
 *
 * ajax
 *
 */
function ajax (opts) {
    var xmlhttp;
    var url;
    var data;
    var settings = {
        url: "",
        type: "GET",
        async: true,
        cache: true,
        data: "",
        dataType: ""
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
    }else {
        url = settings["url"];
    }
    if(settings["type"].toUpperCase() !== "GET" && settings["type"].toUpperCase() !== "POST"){
        throw new Error("argument 'type' was wrong!!!");
    }

    if(settings["type"].toUpperCase() !== "GET"){

        if(settings["data"].constructor === Object){
            data = serialize ( settings["data"] );
            if(!settings["cache"]){
                data += "&_" + (+new Date);
            }
        }else if(settings["data"].constructor === String){
            data = settings["data"];
            if(data && !settings["cache"]){
                data += "&_" + (+new Date);
            }else if(!data && !settings["cache"]){
                data += "_" + (+new Date);
            }
        }else {
            throw new Error("argument 'data' was wrong!!!");
        }
        url += "?" + data;
    }else if(settings["type"].toUpperCase() !== "POST"){
        data = settings["data"].constructor === Object?serialize ( settings["data"]):settings["data"];
        if(!settings["cache"]){
            url += "?_" + (+new Date);
        }
    }else {
        throw new Error("argument 'type' was wrong!!!");
    }

    if (window.XMLHttpRequest) {
        xmlhttp = new XMLHttpRequest();
    }else {
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange = function(){
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200){
            if(settings["callback"]){
                var result = xmlhttp.responseText;
                switch (settings["dataType"].toLowerCase()){
                    case "json":
                        result = JSON.parse(result);
                        break;
                    case "javascript":
                        result = eval(result);
                        break;
                    case "xml":
                        result = xmlhttp.responseXML;
                        break;
                }
                settings["callback"].call(this, result);
            }
        }
    }
    xmlhttp.open(settings["type"], url, settings["async"]);
    if(settings["type"].toUpperCase() === "POST"){
        xmlhttp.send(data);
    }else {
        xmlhttp.send();
    }
}