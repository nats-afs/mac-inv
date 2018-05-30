import Vue from 'vue'
import App from './App.vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.css'

import store from "./store";
import router from "./router";

Vue.use(Vuetify)

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
