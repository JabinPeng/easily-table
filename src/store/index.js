import Vue from 'vue'
import Vuex from 'vuex'

import getters from './getters'

import system from './modules/system'
import material from './modules/material'
import canvas from './modules/canvas'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
      system,
      material,
      canvas
    },
    state: {
    },
    mutations: {
    },
    actions: {
    },
    getters
})
