import Vue from 'vue'
import App from './App.vue'
import router from '@/router'
import '@/core'

Vue.config.productionTip = false
Vue.use(router)
new Vue({
  render: h => h(App),
  router,
}).$mount('#app')
