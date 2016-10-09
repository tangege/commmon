function TanDialog() {
    this.dialogDom = null;
    this.modelDom = null;
    this.settings = {
        "id": "tandialog",
        "width": 300,
        "text": "您好！",
        "model": true,
        "title": "来自酷派商城",
        "okbutton": true,
        "cancelbutton": true,
        "okfn": null,
        "destroyfn": null
    }
}
TanDialog.instance = null;
TanDialog.getInstance = function (){
    if(!TanDialog.instance){
        TanDialog.instance = new TanDialog();
    }
    return TanDialog.instance;
}
TanDialog.prototype.createDialog = function () {
    var dialogElement = document.getElementById(this.settings['id']);
    if (!dialogElement) {
        dialogElement = document.createElement('div');
        dialogElement.id = this.settings['id'];
        this.setCss(dialogElement, {
            "position": "fixed",
            "left": 0,
            "top": 0,
            "backgroundColor": "#fff",
            "width": "300px",
            "font-family": "微软雅黑",
            "zIndex": 99999
        });
        var contenthtmls = '<div id="td-header" style="height: 45px;background-color: #476DB9;color: #fff;position: relative;">'
            + '<p style="line-height: 45px;margin-left: 10px;">' + this.settings['title'] + '</p><span style="position: absolute;right: 10px;top: 5px;cursor: pointer;">X</span>'
            + '</div>'
            + '<div id="td-body" style="padding: 25px 0;text-align: center;">'
            + '<p style="margin: 0 10px;">' + this.settings['text'] + '</P>'
            + '</div>'
            + '<div id="td-footer" style="height: 45px;background-color: #FAFAFA">'
            + '<a id="td-cancelbtn" href="javascript:;" style="float: right;display: block;background-color: #DDDDDD;color: #333;margin-right: 10px;padding: 5px 18px;margin-top: 9px;">取消</a>'
            + '<a id="td-okbtn" href="javascript:;" style="float: right;display: block;background-color: #476DB9;color: #fff;margin-right: 10px;padding: 5px 18px;margin-top: 9px;">确定</a>'
            + '</div>';
        dialogElement.innerHTML = contenthtmls;
        document.body.appendChild(dialogElement);
    }
    this.dialogDom = dialogElement;
    this.dialogShow();
}
TanDialog.prototype.dialogShow = function () {
    if(this.dialogDom){
        this.dialogDom.style.display = 'block';
        this.center();
    }
}
TanDialog.prototype.dialogHide = function () {
    if(this.dialogDom){
        this.dialogDom.style.display = 'none';
    }
}
TanDialog.prototype.model = function () {
    var modelElement = document.getElementById(this.settings['id'] + '_bg');
    if (!modelElement) {
        modelElement = document.createElement('div');
        modelElement.id = this.settings['id'] + '_bg';
        this.setCss(modelElement, {
            "position": "fixed",
            "left": 0,
            "top": 0,
            "backgroundColor": "#000",
            "width": "100%",
            "height": "100%",
            "opacity": 0.6,
            "filter": "alpha(Opacity=60)",
            "zIndex": 99999
        });
        document.body.appendChild(modelElement);
    }
    this.modelDom = modelElement;
    this.modelShow();
}
TanDialog.prototype.modelShow = function () {
    if(this.modelDom){
        this.modelDom.style.display = 'block';
    }
}
TanDialog.prototype.modelHide = function () {
    if(this.modelDom){
        this.modelDom.style.display = 'none';
    }
}
TanDialog.prototype.init = function (opts) {
    var _this = this;
    if(opts) {
        for (var attr in opts) {
            this.settings[attr] = opts[attr];
        }
    }
    if (this.settings['model']) {
        this.model();
    }
    this.createDialog();
    if (!this.settings['okbutton'] && !this.settings['cancelbutton']) {
        document.getElementById('td-footer').style.display = "none";
    }else {
        document.getElementById('td-footer').style.display = "block";
        if(!this.settings['okbutton']) {
            document.getElementById('td-okbtn').style.display = "none";
        }else {
            document.getElementById('td-okbtn').style.display = "block";
        }
        if(!this.settings['cancelbutton']) {
            document.getElementById('td-cancelbtn').style.display = "none";
        }else {
            document.getElementById('td-cancelbtn').style.display = "block";
        }
    }
    this.setTitle(this.settings['title']);
    this.setContent(this.settings['text']);
    var closebtn = document.getElementById('td-header').getElementsByTagName('span')[0];
    var okbtn = document.getElementById('td-okbtn');
    var cancelbtn = document.getElementById('td-cancelbtn');
    okbtn.onclick = cancelbtn.onclick = closebtn.onclick = function () {
        _this.destroy();
    }
    if (this.settings['okfn']) {
        okbtn.onclick = function () {
            _this.settings['okfn'].call(_this);
            _this.destroy();
        }
    }
}
TanDialog.prototype.setTitle = function (title) {
    var titledom = document.getElementById('td-header').getElementsByTagName('p')[0];
    if (titledom) {
        titledom.innerHTML = title;
    }
}
TanDialog.prototype.setContent = function (content) {
    var contentdom = document.getElementById('td-body').getElementsByTagName('p')[0];
    if (contentdom) {
        contentdom.innerHTML = content;
    }
}
TanDialog.prototype.center = function () {
    if (this.dialogDom) {
        var objwidth = this.dialogDom.offsetWidth;
        var objheight = this.dialogDom.offsetHeight;
        var windowwidth = document.documentElement.clientWidth || document.body.clientWidth;
        var windowheight = document.documentElement.clientHeight || document.body.clientHeight;
        var centerx = (windowwidth - objwidth) / 2;
        var centery = (windowheight - objheight) / 2;
        this.dialogDom.style.left = centerx + 'px';
        this.dialogDom.style.top = centery + 'px';
    }
}
TanDialog.prototype.destroy = function () {
    this.modelHide();
    this.dialogHide();
    if (this.settings['destroyfn']) {
        this.settings['destroyfn'].call(this);
    }
}
TanDialog.prototype.setCss = function (obj, opts){
    if (obj && opts) {
        for (var x in opts) {
            obj.style[x] = opts[x];
        }
    }
}