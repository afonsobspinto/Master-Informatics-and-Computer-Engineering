import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    products: [

    ],
    categories: [],
    userInfo: {
      isLoggedIn: false,
      isSignedUp: false,
      hasSearched: false,
      showMoreFilters: false,
      selectedPriceRange: [0, 500],
      categoryFilter: "all",
      name: "",
      productTitleSearched: "",
      username: "",
    },
    systemInfo: {
      openLoginModal: false,
      openSignupModal: false,
      openCheckoutModal: false
    }
  },
  getters: {
    username: state => state.userInfo.username,
    productsAdded: state => {
      return state.products.filter(el => {
        return el.isAddedToCart;
      });
    },
    productsAddedToFavourite: state => {
      return state.products.filter(el => {
        return el.isFavourite;
      });
    },
    getProductById: state => id => {
      return state.products.find(product => product.id == id);
    },
    isUserLoggedIn: state => {
      return state.userInfo.isLoggedIn;
    },
    isUserSignedUp: state => {
      return state.userInfo.isSignedUp;
    },
    getUserName: state => {
      return state.userInfo.name;
    },
    isLoginModalOpen: state => {
      return state.systemInfo.openLoginModal;
    },
    isSignupModalOpen: state => {
      return state.systemInfo.openSignupModal;
    },
    isCheckoutModalOpen: state => {
      return state.systemInfo.openCheckoutModal;
    },
    quantity: state => {
      return state.products.quantity;
    },
    categories: state => {
      return state.categories;
    },
    isExtraFiltersVisible: state => {
      return state.userInfo.showMoreFilters;
    }
  },

  mutations: {
    addUsername: (state, username) => {
      state.userInfo.username = username;
    },
    addToCart: (state, id) => {
      state.products.forEach(el => {
        if (id === el.id) {
          el.isAddedToCart = true;
        }
      });
    },
    setAddedBtn: (state, data) => {
      state.products.forEach(el => {
        if (data.id === el.id) {
          el.isAddedBtn = data.status;
        }
      });
    },
    removeFromCart: (state, id) => {
      state.products.forEach(el => {
        if (id === el.id) {
          el.isAddedToCart = false;
        }
      });
    },
    removeProductsFromFavourite: state => {
      state.products.filter(el => {
        el.isFavourite = false;
      });
    },
    isUserLoggedIn: (state, isUserLoggedIn) => {
      state.userInfo.isLoggedIn = isUserLoggedIn;
    },
    isUserSignedUp: (state, isSignedUp) => {
      state.userInfo.isSignedUp = isSignedUp;
    },
    setHasUserSearched: (state, hasSearched) => {
      state.userInfo.hasSearched = hasSearched;
    },
    setCategorySelected: (state, categorySelected) => {
      state.userInfo.categoryFilter = categorySelected;
    },
    showMoreFilters: (state, showFilters) => {
      state.userInfo.showMoreFilters = showFilters;
    },
    setPriceRangeSelected: (state, range) => {
      state.userInfo.selectedPriceRange = range;
    },
    setUserName: (state, name) => {
      state.userInfo.name = name;
    },
    setProductTitleSearched: (state, titleSearched) => {
      state.userInfo.productTitleSearched = titleSearched;
    },
    showLoginModal: (state, show) => {
      state.systemInfo.openLoginModal = show;
    },
    showSignupModal: (state, show) => {
      state.systemInfo.openSignupModal = show;
    },
    showCheckoutModal: (state, show) => {
      state.systemInfo.openCheckoutModal = show;
    },
    addToFavourite: (state, id) => {
      state.products.forEach(el => {
        if (id === el.id) {
          el.isFavourite = true;
        }
      });
    },
    removeFromFavourite: (state, id) => {
      state.products.forEach(el => {
        if (id === el.id) {
          el.isFavourite = false;
        }
      });
    },
    setCategories: (state, data) => {
      state.categories = data;
    },
    quantity: (state, data) => {
      state.products.forEach(el => {
        if (data.id === el.id) {
          el.quantity = data.quantity;
        }
      });
    },
    addProduct: (state, data) => {
      if(state.products.filter( prod => prod.id === data.id ).length === 0 || state.products.length === 0 )
        state.products.push(data);
    },
  },

  actions: {}
});
