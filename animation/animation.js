/**
 * Created by Administrator on 2016/10/2 0002.
 */
/**
 * 缓冲运动
 * @param obj
 * @param json
 * @param fn
 */
function bufferMove(obj, json, fn) {
    clearInterval(obj.timer)
    obj.timer = setInterval(function() {
        for (var attr in json) {
            var isOver = false;
            var iCurren;
            if (attr == 'opacity') {
                iCurren = parseInt(parseFloat(getStyle(obj, attr)).toFixed(2) * 100);
            } else {
                iCurren = parseInt(getStyle(obj, attr));
            }
            var speed = (json[attr] - iCurren) / 8;
            speed = speed < 0 ? Math.floor(speed) : Math.ceil(speed);

            if (iCurren == json[attr]) {
                isOver = true;
            } else {
                if (attr == 'opacity') {
                    obj.style.filter = "alpha(opacity=" + (iCurren + speed) + ")";
                    obj.style.opacity = (iCurren + speed) / 100;
                } else {
                    obj.style[attr] = iCurren + speed + 'px';
                }
            }
        }
        if (isOver) {
            clearInterval(obj.timer);
            if (fn) {
                fn();
            }
        }

    }, 30);

}
/**
 * 获取样式
 * @param obj
 * @param attr
 * @returns {*}
 */
function getStyle (obj, attr){
    return obj.currentStyle ? obj.currentStyle[attr] : getComputedStyle(obj, false)[attr];
}

/**
 * 函数式匀速运动
 * @param obj
 * @param opts
 * @param speed
 * @param fn
 */
function uniform(obj, opts, speed, fn) {
    clearInterval(obj.timer)
    obj.timer = setInterval(function() {
        for (var attr in opts) {
            var iCurren = parseInt(getStyle(obj, attr));
            if (iCurren < opts[attr]) {
                speed = Math.abs(speed);
            } else {
                speed = -(Math.abs(speed));
            }
            if (Math.abs(opts[attr] - iCurren) < Math.abs(speed)) {
                clearInterval(obj.timer);
                obj.style[attr] = opts[attr] + 'px';
                if (fn) {
                    fn();
                }
            } else {
                obj.style[attr] = (iCurren + speed) + 'px';
            }
        }
    }, 30);
}


