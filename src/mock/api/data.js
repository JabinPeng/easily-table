import { service } from '@/utils/axios'

export function getList(params) {
    return service({
        url: '/list',
        method: 'get',
        params
    })
}

export function addList(params) {
    return service({
        url: '/list/add',
        method: 'post',
        params
    })
}

export function editList(params) {
    return service({
        url: '/list/edit',
        method: 'put',
        params
    })
}

export function delList(params) {
    return service({
        url: '/list/del',
        method: 'delete',
        params
    })
}
