import { service } from '@/utils/axios'

export function getList(params) {
    return service({
        url: '/list',
        method: 'get',
        params
    })
}
