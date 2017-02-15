(function(window) {
    /**
     * 带参数绑定
      * @type {{cache: null, bind: events.bind, unbind: events.unbind, _save: events._save, _delete: events._delete, _get: events._get, _isInArray: events._isInArray}}
     */
  var events = {
      cache: null,
      bind: function (obj, type, fn, args){
          try{
              var eventHander = fn;
              if(args){
                  if(args.constructor == Array){
                      //数组
                      var len = args.length;
                      eventHander = function (e){
                        if(len + 1 === args.length){
                          args.shift();
                        }
                        args.unshift(e || event);
                        fn.apply(obj, args);
                      }
                  }else {
                      //多个参数
                      var fnArgs = [];
                      for(var i = 3, len = arguments.length; i < len; i++){
                          fnArgs.push(arguments[i]);
                      }
                      var len = fnArgs.length;
                      eventHander = function (e){
                        if(fnArgs.length === len + 1){
                          fnArgs.shift();
                        }
                        fnArgs.unshift(e || event);
                        fn.apply(obj, fnArgs);
                      }
                  }
              }
              if(window.attachEvent){//IE
                  obj.attachEvent("on" + type, eventHander );
              }else{//FF
                  obj.addEventListener(type, eventHander, false);
              }
              this._save(obj, type, fn, eventHander);

          }catch (e) {
              throw new Error(e);
          }
      },
      unbind: function (obj, type, fn){
          var typeEventArr = this._get(obj, type, fn);
          if(typeEventArr.length){
              if(window.detachEvent){//IE
                  obj.detachEvent("on" + type, typeEventArr[2] );
              }else{//FF
                  obj.removeEventListener(type, typeEventArr[2], false);
              }
              this._delete(obj, type, fn);
          }
      },
      _save: function (obj, type, fn, otherFN){
          this.cache = this.cache || {};
          this.cache[type] = this.cache[type] || [];
          if(this._isInArray(obj, type, fn) === -1){
              this.cache[type].push([obj, fn, otherFN]);
          }
      },
      _delete: function (obj, type, fn) {
          var flag = false;
          if(this._isInArray(obj, type, fn) !== -1){
              this.cache[type].splice(this._isInArray(obj, type, fn),1);
              flag = true;
          }
          return flag;
      },
      _get: function (obj, type, fn) {
          var result = [];
          if(this._isInArray(obj, type, fn) !== -1){
              result = this.cache[type][this._isInArray(obj, type, fn)];
          }
          return result;
      },
      _isInArray: function (obj, type, fn) {
          if(this.cache){
              if(this.cache[type]){
                  for( var i = 0,len = this.cache[type].length;i < len;i++ ){
                      var o = this.cache[type][i][0];
                      var f = this.cache[type][i][1];
                      if(o == obj && f == fn){
                          return i;
                      }
                  }
              }
          }
          return -1;
      }
  }

    /**
     * 拖拽
      * @param dom
     * @private
     */
  function _Drag ( dom ) {
     this.dom = dom;
     this.originX = 0;
     this.originY = 0;
     this.originLeft = 0;
     this.originTop = 0;
     this.settings = {

     };
  }
  _Drag.prototype.init = function (opts) {
     for (var attr in opts) {
       this.settings[attr] = opts[attr];
     }
     this.addEvent();
  }
  _Drag.prototype.drag = function (e, _this) {
    var position = _this._pos(e);
    var x = position.x;
    var y = position.y;
    var disX = x - _this.originX;
    var disY = y - _this.originY;
    _this.dom.style.left = _this.originLeft + disX + "px";
    _this.dom.style.top = _this.originTop + disY + "px";
  }
  _Drag.prototype.addEvent = function () {
     if( this.dom ){
       var _this = this;
       events.bind(this.dom, "mousedown", function (e) {
         var ev = e || event;
            var position = _this._pos(ev);
            _this.originX = position.x;
            _this.originY = position.y;
            _this.originLeft = _this.dom.offsetLeft;
            _this.originTop = _this.dom.offsetTop;
            events.bind(document, "mousemove", _this.drag, _this);
            events.bind(document, "mouseup", function () {
              events.unbind(document, "mouseup", arguments.callee); 
              events.unbind(document, "mousemove", _this.drag);
            })
       })
     }
  }
  _Drag.prototype._pos = function (e) {
    var posx = 0;
    var posy = 0;
    if(e.pageX || e.pageY){
        posx = e.pageX;
        posy = e.pageY;
    }else if(e.clientX || e.clientY) {
        posx = e.clientX + document.documentElement.scrollLeft + document.body.scrollLeft;
        posy = e.clientY + document.documentElement.scrollTop + document.body.scrollTop;
    }
    return {
      x: posx,
      y: posy
    };
  }
  window.Drag = _Drag;
})(window)
