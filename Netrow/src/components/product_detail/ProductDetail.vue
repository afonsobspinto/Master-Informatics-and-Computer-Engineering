<template>
  <div class="section">
    <div class="card is-clearfix columns">
        <figure class="card-image is-480x480 column is-one-thirds">
          <img src={{ product.image }}>
        </figure>
        <div class="card-content column is-two-thirds">
          <h2 class="title is-4">{{ product.title }}</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            Ut enim ad minim veniam, quis nostrud
          </p>
          <div>
            <p>{{ product.stock > 0 ? `${product.stock} stock` : 'No stock' }}</p>
          </div>
          <div>
            <span class="title is-3"><strong>{{ product.price }}&euro;</strong></span>
          </div>
          <div class="select is-rounded is-small">
            <select @change="onSelectQuantity(product.id)" v-model="selected">
              <option v-for="quantity in quantityArray" :value="quantity">{{ quantity }}</option>
            </select>
          </div>
          <div class="is-pulled-right">
            <button class="button is-primary" v-if="!isAddedBtn" @click="addToCart(product.id)">{{ addToCartLabel }}</button>
            <button class="button is-text" v-if="isAddedBtn" @click="removeFromCart(product.id)">{{ removeFromCartLabel }}</button>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'product-detail-component',
  
  data () {
    return {
      addToCartLabel: 'Add to cart',
      removeFromCartLabel: 'Remove from cart',
      product: {},
      selected: 1,
      quantityArray: []
    };
  },

  mounted () {
    this.product = this.$store.getters.getProductById(this.$route.params.id);
    this.selected = this.product.quantity;

    for (let i = 1; i <= 20; i++) {
      this.quantityArray.push(i);
    }
  },

  computed: {
    isAddedBtn () {
      return this.product.isAddedBtn;
    }
  },

  methods: {
    addToCart (id) {
      let data = {
        id: id,
        status: true
      }
      this.$store.commit('addToCart', id);
      this.$store.commit('setAddedBtn', data);
    },
    removeFromCart (id) {
      let data = {
        id: id,
        status: false
      }
      this.$store.commit('removeFromCart', id);
      this.$store.commit('setAddedBtn', data);
    },
    onSelectQuantity (id) {
      let data = {
        id: id,
        quantity: this.selected
      }
      this.$store.commit('quantity', data);
    }
  }
};
</script>
