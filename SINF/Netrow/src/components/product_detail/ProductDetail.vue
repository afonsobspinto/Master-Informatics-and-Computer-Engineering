<template>
  <div class="section">
    <div class="card is-clearfix columns">
        <figure class="card-image is-480x480 column is-one-thirds">
          <img :src=product.image style="max-width: 480px; max-height: 480px">
        </figure>
        <div class="card-content column is-two-thirds">
          <h2 class="title is-4">{{ product.title }}</h2>
          <p>
            {{product.description}}
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
          <div v-if="product.artSubst!=null">
          <h2 class="subtitle" style="margin-top: 50px"> Produtos Substitutos: </h2>
          <div class="card column is-one-fifth" :key="product.id">
            <products-related :product="this.$store.getters.getProductById(product.artSubst)"></products-related>
          </div>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
import ProductsRelated from "./ProductRelated";

  export default {
    name: 'product-detail-component',
    components: {
      "products-related": ProductsRelated
    },

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
