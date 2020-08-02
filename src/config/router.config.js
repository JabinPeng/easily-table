/** 动态路由 **/
export const asyncRouterMap = []
/** 基础路由 **/
export const constRouterMap = [
    {
        path: '/',
        name: 'main',
        component: ()=>import('@views/main/index'),
        meta: { title: '首页' },


    }
]

