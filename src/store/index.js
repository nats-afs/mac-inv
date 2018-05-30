import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    drawer: true
  },
  getters: {
    isVisible: (state) => { return state.drawer }
  },
  mutations: {
    toogleSidebar: (state) => state.drawer = !state.drawer
  }
});