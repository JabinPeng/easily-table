import Vue from 'vue'
import Vuex from 'vuex'

import getters from './getters'

import Model from './modules/model'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        Model
    },
    state: {
        rem:0
    },
    mutations: {
        setRem(state,val){
            state.rem = val
        }
    },
    actions: {

    },
    getters
})
