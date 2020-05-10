import Vuex from 'vuex'
import Vue from 'vue'
Vue.use(Vuex)
export const store = new Vuex.Store({
  state: {
    count: 1
  },
  mutations: {
    increment (state) {
      // mutate state
      state.count++
    },
    decrement(state) {
        state.count--
    }
  }
})
