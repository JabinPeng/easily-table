import Vue from 'vue'
import Vuex from 'vuex'

import getters from './getters'

import system from './modules/system'
import material from './modules/material'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
      system,
      material
    },
    state: {
    },
    mutations: {
    },
    actions: {
    },
    getters
})
