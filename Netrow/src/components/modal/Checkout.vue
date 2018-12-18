<template>
  <div :class="[ openModal ? 'is-active' : '', 'modal' ]">
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">{{ modalTitle }}</p>
        <button class="delete" aria-label="close" @click="closeModal(false)"></button>
      </header>
      <section class="modal-card-body">
        <div v-if="!isCheckoutSection">
          <div class="box" v-for="product in products" :key="product.id">
            <div class="is-pulled-right">
              <button
                class="button is-info is-inverted"
                @click="removeFromCart(product.id)"
              >{{ removeLabel }}</button>
              <p style="text-align:right; padding-right: 1em">{{product.stock}} units left</p>
            </div>
            <div>
              <p style="display:inline-block; margin-right: 0.5em">{{ product.title }}</p>
              <p style="display:inline-block;">|</p>
              <p style="display:inline-block; margin-left: 0.5em">{{ product.price }} &euro;</p>
            </div>
            <div>
              <div class="select is-rounded is-small">
                <select
                  @change="onSelectQuantity(product.id, product.quantity)"
                  v-model="product.quantity"
                >
                  <option
                    v-for="quantity in quantityArray"
                    :value="quantity"
                    :key="quantity"
                  >{{ quantity }}</option>
                </select>
              </div>
              <p
                style="display:inline-block; margin-left: 0.5em"
              >Cost {{product.quantity*product.price}} &euro;</p>
            </div>
          </div>
          <div v-if="products.length === 0">
            <p>{{ cartEmptyLabel }}</p>
          </div>
        </div>
        <div v-if="isCheckoutSection">
          <p>You bought it :-)</p>
        </div>
      </section>
      <footer class="modal-card-foot">
          <router-link :to="{ path: '/CheckoutPage', name: 'checkout-page-component' } ">
            <span v-on:click="goToCheckout()">{{buyLabel}}</span>
          </router-link>
        <button
          v-if="isCheckoutSection"
          class="button is-success"
          @click="closeModal(true)"
        >{{ closeLabel }}</button>
      </footer>
    </div>
  </div>
</template>

<script>
export default {
  name: "checkout-component",

  data() {
    return {
      modalTitle: "Checkout",
      removeLabel: "Remove from cart",
      cartEmptyLabel: "Your cart is empty",
      closeLabel: "Close",
      isCheckoutSection: false,
      quantityArray: []
    };
  },
  mounted() {
    for (let i = 1; i <= 20; i++) {
      this.quantityArray.push(i);
    }
  },
  computed: {
    products() {
      return this.$store.getters.productsAdded;
    },
    openModal() {
      if (this.$store.getters.isCheckoutModalOpen) {
        return true;
      } else {
        return false;
      }
    },
    buyLabel() {
      let totalProducts = this.products.length,
        productsAdded = this.$store.getters.productsAdded,
        pricesArray = [],
        productLabel = "",
        finalPrice = "",
        quantity = 1;

      productsAdded.forEach(product => {
        if (product.quantity >= 1) {
          quantity = product.quantity;
        }

        pricesArray.push(product.price * quantity); // get the price of every product added and multiply quantity
      });

      finalPrice = pricesArray.reduce((a, b) => a + b, 0); // sum the prices

      if (totalProducts > 1) {
        // set plural or singular
        productLabel = "products";
      } else {
        productLabel = "product";
      }
      return `Buy ${totalProducts} ${productLabel} at ${finalPrice}€`;
    },
    isUserLoggedIn() {
      return this.$store.getters.isUserLoggedIn;
    }
  },

  methods: {
    closeModal(reloadPage) {
      this.$store.commit("showCheckoutModal", false);

      if (reloadPage) {
        window.location.reload();
      }
    },
    goToCheckout() {
        this.$store.commit("showCheckoutModal", false);
    },
    removeFromCart(id) {
      let data = {
        id: id,
        status: false
      };
      this.$store.commit("removeFromCart", id);
      this.$store.commit("setAddedBtn", data);
    },
    onNextBtn() {
      if (this.isUserLoggedIn) {
        this.isCheckoutSection = true;
      } else {
        this.$store.commit("showCheckoutModal", false);
        this.$store.commit("showLoginModal", true);
      }
    },
    onPrevBtn() {
      this.isCheckoutSection = false;
    },
    onSelectQuantity(id, quantity) {
      let data = {
        id: id,
        quantity: quantity
      };
      this.$store.commit("quantity", data);
    }
  }
};
</script>

