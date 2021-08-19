import Vue from 'vue'
import Vuex from '../kstore/kvuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    counter: 1
  },
  mutations: {
    updateCounter(state, data) {
      state.counter = data
    }
  },
  getters: {
    doubleCounter: state => state.counter * 20
  },
  actions: {
    dispatchCounter({ commit }, data) {
      setTimeout(() => {
        commit('updateCounter', data)
      }, 300)
    }
  },
  modules: {
  }
})
