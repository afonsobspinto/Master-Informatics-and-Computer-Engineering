import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isLoggedin: false
  },
  mutations: {
    logIn(state) {
        console.log("login");
        state.isLoggedin = true;
    },
    logOut(state) {
        state.isLoggedin = false;
    }
  },
  actions: {

  },
});
