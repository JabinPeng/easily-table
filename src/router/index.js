import Vue from 'vue'
import Router from 'vue-router'
import { constRouterMap, asyncRouterMap } from '@/config/router.config'

const originalPush = Router.prototype.push
Router.prototype.push = function push (location) {
    return originalPush.call(this, location).catch(err => err)
}
Vue.use(Router)
export default new Router({
    mode: 'hash',
    // base: process.env.BASE_URL,
    scrollBehavior: () => ({ y: 0 }),
    routes: constRouterMap.concat(asyncRouterMap)
})
