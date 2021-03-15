import { service } from '@/utils/axios'

export function httpAction (url, methods, parameter) {
    return service({
        url: url,
        method: methods,
        params: parameter
    })
}

