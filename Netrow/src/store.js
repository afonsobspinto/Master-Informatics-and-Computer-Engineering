import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    products: [
      {
        id: 1,
        title: "Product 1",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
        price: 50,
        stock: 5,
        isAddedToCart: false,
        isAddedBtn: false,
        category: "Lorem",
        quantity: 1
      },
      {
        id: 2,
        title: "Product 2",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
        price: 35,
        stock: 10,
        isAddedToCart: false,
        isAddedBtn: false,
        category: "Lorem",
        quantity: 1
      },
      {
        id: 3,
        title: "Product 3",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
        price: 110,
        stock: 3,
        isAddedToCart: false,
        isAddedBtn: false,
        category: "Ipsum",
        quantity: 1
      },
      {
        id: 4,
        title: "Product 4",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
        price: 50,
        stock: 0,
        isAddedToCart: false,
        isAddedBtn: false,
        category: "Ipsum",
        isFavourite: true,
        orderStatus: "Shipped",
        amountOrdered: 2,
        date: "02/12/2018",
        quantity: 1
      },
      {
        id: 5,
        title: "Product 5",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
        price: 35,
        stock: 2,
        isAddedToCart: false,
        isAddedBtn: false,
        category: "Lorem",
        isFavourite: true,
        orderStatus: "Not Shipped",
        amountOrdered: 3,
        date: "04/12/2018",
        quantity: 1
      },
      {
        id: 6,
        title: "Product 6",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
        price: 110,
        stock: 1,
        isAddedToCart: false,
        isAddedBtn: false,
        category: "Ipsum",
        quantity: 1
      },
      {
        id: 7,
        title: "Product 7",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
        price: 50,
        stock: 7,
        isAddedToCart: false,
        isAddedBtn: false,
        category: "Dolor",
        quantity: 1
      },
      {
        id: 8,
        title: "Product 8",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
        price: 35,
        stock: 0,
        isAddedToCart: false,
        isAddedBtn: false,
        category: "Ipsum",
        quantity: 1
      },
      {
        id: 9,
        title: "Product 9",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
        price: 110,
        stock: 2,
        isAddedToCart: false,
        isAddedBtn: false,
        category: "Dolor",
        quantity: 1
      }
    ],
    categories: ["Lorem", "Ipsum", "Dolor", "Sit"],
    userInfo: {
      isLoggedIn: false,
      isSignedUp: false,
      hasSearched: false,
      showMoreFilters: false,
      selectedPriceRange: [0, 500],
      categoryFilter: "all",
      name: "",
      productTitleSearched: ""
    },
    systemInfo: {
      openLoginModal: false,
      openSignupModal: false,
      openCheckoutModal: false
    }
  },
  getters: {
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
    quantity: (state, data) => {
      state.products.forEach(el => {
        if (data.id === el.id) {
          el.quantity = data.quantity;
        }
      });
    }
  },

  actions: {}
});
