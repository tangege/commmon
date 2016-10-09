/**
 * Created by tanyonglong on 2016/10/9.
 */

/**
 * 扩展Array的原型对象 添加变量数组的每一个元素,并让每一个元素都执行fn函数 (可变量多维数组)
 * @param {Object} fn
 */
Array.prototype.each = function(fn){
    try{
        //1 目的： 遍历数组的每一项 //计数器 记录当前遍历的元素位置
        this.i || (this.i=0);  //var i = 0 ;
        //2 严谨的判断什么时候去走each核心方法
        // 当数组的长度大于0的时候 && 传递的参数必须为函数
        if(this.length >0 && fn.constructor == Function){
            // 循环遍历数组的每一项
            while(this.i < this.length){    //while循环的范围
                //获取数组的每一项
                var e = this[this.i];
                //如果当前元素获取到了 并且当前元素是一个数组
                if(e && e.constructor == Array){
                    // 直接做递归操作
                    e.each(fn);
                } else {
                    //如果不是数组 （那就是一个单个元素）
                    // 这的目的就是为了把数组的当前元素传递给fn函数 并让函数执行
                    //fn.apply(e,[e]);
                    fn.call(e,e);
                }
                this.i++ ;
            }
            this.i = null ; // 释放内存 垃圾回收机制回收变量
        }

    } catch(ex){
        // do something
    }
    return this ;
}

//数组去重
function uniqueArray (arr) {
    try {
        var result = [];
        var obj = new Object();
        for (var i = 0, len = arr.length; i < len; i++){
            obj[arr[i]] = 1;
        }
        for (var attr in obj){
            result.push(attr);
        }
        return result;
    }catch (e) {
        throw new Error(e);
    }
}

//遍历一唯数组
Array.prototype.for = function (fn) {
    try {

        this.i || (this.i  = 0);
        if( this.length > 0 && typeof fn === "function" ){
            while (this.i < this.length) {
                var e = this[this.i];
                fn.call(e,e,this.i);
                this.i++;
            }
            this.i = null;
        }

    }catch (e) {
        throw new Error(e);
    }
    return this;
}

//检索值在数组中的位置
function indexOf (arr, value) {
    try {
        for (var i = 0, len = arr.length; i < len; i++){
            if(value === arr[i]){
                return i;
            }
        }
        return -1;
    }catch (e) {
        throw new Error(e);
    }
}
//值是否在数组中
function isInArray (arr, value) {
    return indexOf.call(this, arr, value) > -1? true: false;
}

//删除数组中的某个值
function removeValue (arr, value) {
    var index = indexOf(arr, value);
    if(index !== -1) {
        return arr.splice(index,1);
    }
    return -1;
}