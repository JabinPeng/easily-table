import Vue from 'vue'
import App from './App.vue'
import router from '@/router'
import bus from '@/utils/bus'
import store from '@/store'
import '@/core'

Vue.config.productionTip = false
Vue.use(bus)
Vue.use(router)
new Vue({
  store,
  render: h => h(App),
  router,
}).$mount('#app')
