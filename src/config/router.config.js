/** 动态路由 **/
export const asyncRouterMap = []
/** 基础路由 **/
export const constRouterMap = [
    {
        path: '/',
        name: 'Main',
        component: () => import('@views/Main'),
        meta: { title: '首页' },
        redirect: '/Main'
    }
]

