import Bus from 'vue'
const install = function (Vue) {
    Vue.prototype.$bus = new Bus()
}
export default { install }
