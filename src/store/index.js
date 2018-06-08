import Vue from 'vue';
import Vuex from 'vuex';

import models from "./modules/models";
import projects from "./modules/projects";
import store from "./modules/store";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    drawer: true
  },
  getters: {
    isVisible: (state) => {
      return state.drawer
    }
  },
  mutations: {
    toogleSidebar: (state) => state.drawer = !state.drawer
  },
  modules: {
    models,
    projects,
    store
  }
});