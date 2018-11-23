import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isLoggedin: false
  },
  mutations: {
    logIn(state) {
        state.isLoggedin = true;
    },
    logOut(state) {
        state.isLoggedin = false;
    }
  },
  actions: {

  },
});
