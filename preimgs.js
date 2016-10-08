//js本地图片预览，兼容ie[6-11]、火狐、Chrome17+、Opera11+、Maxthon3+、360浏览器、百度浏览器
function PreviewImage(fileObj, imgPreviewId, divPreviewId) {
    var allowExtention = '.jpg,.bmp,.gif,.png';//document.getElementById("hfAllowPicSuffix").value; //.jpg,.bmp,.gif,.png,允许上传文件的后缀名
    var extention = fileObj.value.substring(fileObj.value.lastIndexOf(".") + 1).toLowerCase(); //获取当前上传文件的扩展名
    var browserVersion = window.navigator.userAgent.toUpperCase();
    if (allowExtention.indexOf(extention) > -1) {
        if (fileObj.files) {//兼容chrome、火狐7+、360浏览器5.5+等，应该也兼容ie10，HTML5实现预览
            if (window.FileReader) {
                var reader = new FileReader();
                reader.onload = function(e) {
                    document.getElementById(imgPreviewId).setAttribute("src", e.target.result);
                }
                reader.readAsDataURL(fileObj.files[0]);
            } else if (browserVersion.indexOf("SAFARI") > -1) {
                alert("不支持Safari浏览器6.0以下版本的图片预览!");
            } else {
                alert("不支持您当前使用的浏览器的图片预览!");
            }
        } else if (browserVersion.indexOf("MSIE") > -1) {//ie、360低版本预览
            if (browserVersion.indexOf("MSIE 6") > -1) {//ie6
                document.getElementById(imgPreviewId).setAttribute("src", fileObj.value);
            } else {//ie[7-9]
                fileObj.select();
                if (browserVersion.indexOf("MSIE 9") > -1) {
                    fileObj.blur(); //不加上document.selection.createRange().text在ie9会拒绝访问
                    document.getElementById(divPreviewId).focus(); //www.yiyaojing.com
                }
                var newPreview = document.getElementById(divPreviewId);
                //alert(document.selection.createRange().text);
                newPreview.setAttribute("src",'');
                newPreview.setAttribute("alt",'');
                newPreview.style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod='scale',src='" + document.selection.createRange().text + "')";
            }
        } else if (browserVersion.indexOf("FIREFOX") > -1) {//firefox
            var firefoxVersion = parseFloat(browserVersion.toLowerCase().match(/firefox\/([\d.]+)/)[1]);
            if (firefoxVersion < 7) {//firefox7以下版本
                document.getElementById(imgPreviewId).setAttribute("src", fileObj.files[0].getAsDataURL());
            } else {//firefox7.0+                    
                document.getElementById(imgPreviewId).setAttribute("src", window.URL.createObjectURL(fileObj.files[0]));
            }
        } else {
            alert("不支持您当前使用的浏览器的图片预览!");
        }
    } else {
        alert("仅支持" + allowExtention + "为后缀名的文件!");
        fileObj.value = ""; //清空选中文件
        if (browserVersion.indexOf("MSIE") > -1) {
            fileObj.select();
            document.selection.clear();
        }
        fileObj.outerHTML = fileObj.outerHTML;
    }
}