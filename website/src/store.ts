import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userId: null,
    cart: [{id:0,amount:0}]
  },
  mutations: {
    logIn(state, userId) {
        state.userId = userId;
    },
    logOut(state) {
        state.userId = null;
    },
    addToCart(state, product) {
      let found = false;
      state.cart.forEach(prod => {
        if(prod.id == product.id)
        {
          prod.amount++;
          found = true;
        }
      })
      if(!found)
      {
        state.cart = state.cart.concat(product);
      }
    },
    removeFromCart(state, product) {
      let remove = false;
      let i = -1;
      state.cart.forEach((prod, index) => {
        if(prod.id == product.id)
        {
          if(prod.amount > 1)
          {
            prod.amount--;
          } else {
            remove = true;
            i = index;
          }
        }
      })

      if(remove)
      {
        state.cart.splice(i, 1);
      }

    }
  },
  getters: {
    isLoggedin: state => state.userId,
    isLoggedout: (state, getters) => !getters.isLoggedin,
    userId: state => state.userId,
    cart: state => state.cart,
  },
  actions: {

  },
});
