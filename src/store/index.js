import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'
import state from './state'
import * as getters from './getters'
import * as mutations from './mutations'
import * as actions from './actions'
Vue.use(Vuex)

const vuexLocal = new VuexPersistence({
  storage: window.sessionStorage,
  reducer: state => ({
    // Specify which state properties to persist
    userDetails: state.userDetails,
    isUserLoggedIn: state.isUserLoggedIn
  })
})

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
  modules: {
  },
  plugins: [vuexLocal.plugin]

})
