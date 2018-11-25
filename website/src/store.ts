import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userId: null
  },
  mutations: {
    logIn(state, userId) {
        state.userId = userId;
    },
    logOut(state) {
        state.userId = null;
    }
  },
  getters: {
    isLoggedin: state => state.userId,
    isLoggedout: (state, getters) => !getters.isLoggedin,
    userId: state => state.userId,
  },
  actions: {

  },
});
