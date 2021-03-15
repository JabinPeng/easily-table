const responseBody = {
    message: '',
    timestamp: 0,
    result: null,
    code: 0
}

export const builder = (data, message, code = 0, headers = {}) => {
    responseBody.result = data
    if (message !== undefined && message !== null) {
        responseBody.message = message
    }
    if (code !== undefined && code !== 0) {
        responseBody.code = code
        responseBody._status = code
    }
    if (headers !== null && typeof headers === 'object' && Object.keys(headers).length > 0) {
        responseBody._headers = headers
    }
    responseBody.timestamp = new Date().getTime()
    return responseBody
}

export const getQueryParameters = (options) => {
    const url = options.url
    const search = url.split('?')[1]
    if (!search) {
        return {}
    }
    return JSON.parse('{"' + decodeURIComponent(search)
        .replace(/"/g, '\\"')
        .replace(/&/g, '","')
        .replace(/=/g, '":"') + '"}')
}

export const getBody = (options) => {
    return options.body && JSON.parse(options.body)
}

/**
 * 过滤对象中为空的属性
 * @param obj
 * @returns {*}
 */
export function filterObj (obj) {
    if (!(typeof obj === 'object')) {
        return
    }

    for (var key in obj) {
        if (obj.hasOwnProperty(key) &&
            (obj[key] == null || obj[key] == undefined || obj[key] === '')) {
            delete obj[key]
        }
    }
    return obj
}
