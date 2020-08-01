/**
 * 判断浏览器
 * **/
export function browser () {
    const userAgent = window.navigator.userAgent // 取得浏览器的userAgent字符串
    const isOpera = userAgent.indexOf('Opera') > -1 // 判断是否Opera浏览器
    const isIE = (() => 'ActiveXObject' in window)() // 判断是否IE浏览器
    const isEdge = userAgent.indexOf('Edge') > -1 // 判断是否IE的Edge浏览器
    const isFF = userAgent.indexOf('Firefox') > -1 // 判断是否Firefox浏览器
    const isSafari = userAgent.indexOf('Safari') > -1 && userAgent.indexOf('Chrome') == -1 // 判断是否Safari浏览器
    var isChrome = userAgent.indexOf('Chrome') > -1 && userAgent.indexOf('Safari') > -1 // 判断Chrome浏览器
    if (isIE) {
        return 'IE'
    }
    if (isEdge) {
        return 'Edge'
    }
    if (isFF) {
        return 'Fox'
    }
    if (isSafari) {
        return 'Safari'
    }
    if (isChrome) {
        return 'Chrome'
    }
    if (isOpera) {
        return 'Opera'
    }
}


/**
 * @param {Function} func
 * @param {number} wait
 * @param {boolean} immediate
 * @return {*}
 */
export function debounce (func, wait, immediate) {
    let timeout, args, context, timestamp, result

    const later = function () {
        // 据上一次触发时间间隔
        const last = +new Date() - timestamp

        // 上次被包装函数被调用时间间隔 last 小于设定时间间隔 wait
        if (last < wait && last > 0) {
            timeout = setTimeout(later, wait - last)
        } else {
            timeout = null
            // 如果设定为immediate===true，因为开始边界已经调用过了此处无需调用
            if (!immediate) {
                result = func.apply(context, args)
                if (!timeout) context = args = null
            }
        }
    }

    return function (...args) {
        context = this
        timestamp = +new Date()
        const callNow = immediate && !timeout
        // 如果延时不存在，重新设定延时
        if (!timeout) timeout = setTimeout(later, wait)
        if (callNow) {
            result = func.apply(context, args)
            context = args = null
        }

        return result
    }
}

/**
 * 深拷贝
 * @param {Object} source
 * @returns {Object}
 */
export function deepClone (source) {
    if (!source && typeof source !== 'object') {
        throw new Error('error arguments', 'deepClone')
    }
    const targetObj = source.constructor === Array ? [] : {}
    Object.keys(source).forEach(keys => {
        if (source[keys] && typeof source[keys] === 'object') {
            targetObj[keys] = deepClone(source[keys])
        } else {
            targetObj[keys] = source[keys]
        }
    })
    return targetObj
}

/**
 * Parse the time to string
 * @param {(Object|string|number)} time
 * @param {string} cFormat
 * @returns {string | null}
 */
export function parseTime (time, cFormat) {
    if (arguments.length === 0 || !time) {
        return null
    }
    const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
    let date
    if (typeof time === 'object') {
        date = time
    } else {
        if ((typeof time === 'string')) {
            if ((/^[0-9]+$/.test(time))) {
                // support "1548221490638"
                time = parseInt(time)
            } else {
                // support safari
                // https://stackoverflow.com/questions/4310953/invalid-date-in-safari
                time = time.replace(new RegExp(/-/gm), '/')
            }
        }

        if ((typeof time === 'number') && (time.toString().length === 10)) {
            time = time * 1000
        }
        date = new Date(time)
    }
    const formatObj = {
        y: date.getFullYear(),
        m: date.getMonth() + 1,
        d: date.getDate(),
        h: date.getHours(),
        i: date.getMinutes(),
        s: date.getSeconds(),
        a: date.getDay()
    }
    const time_str = format.replace(/{([ymdhisa])+}/g, (result, key) => {
        const value = formatObj[key]
        // Note: getDay() returns 0 on Sunday
        if (key === 'a') { return ['日', '一', '二', '三', '四', '五', '六'][value ] }
        return value.toString().padStart(2, '0')
    })
    return time_str
}

/**
 * 根据单位计算实际值
 * params: '1vw' 屏幕宽
 * **/
export function formatSize(value) {
    let size = parseFloat(value);
    let { vh, vw } = getScreenUint();
    if (typeof value === "string" && ~value.indexOf("vh")) {
        return vh * size;
    }
    if (typeof value === "string" && ~value.indexOf("vw")) {
        return vw * size;
    }
    return size;
}
/**
 * 获取屏幕单位宽高
 * **/
export function getScreenUint() {
    let { clientWidth, clientHeight } = document.documentElement;
    let vh = clientHeight / 100;
    let vw = clientWidth / 100;
    return {
        vh,
        vw
    };
}
