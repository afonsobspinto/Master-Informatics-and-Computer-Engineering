<template>
  <div>
    <div class="card-image">
      <figure class="image is-4by3">
        <img src="https://bulma.io/images/placeholders/1280x960.png" alt="Placeholder image">
      </figure>
    </div>
    <div class="card-content">
      <div class="media">
        <div class="media-content">
          <p class="title is-4">{{ product.title }}</p>
        </div>
      </div>
      <div class="content is-clearfix">
        <p>{{ product.description }}</p>
        <div class="is-pulled-left">
          <p>{{ product.stock > 0 ? `${product.stock} stock` : 'No stock' }}</p>
        </div>
        <p class="is-pulled-right">
          <span class="title is-4">
            <strong>&euro; {{ product.price }}</strong>
          </span>
        </p>
      </div>
      <div class="card-footer btn-actions">
        <div class="card-footer-item field is-grouped">
          <div class="buttons">
            <button
              class="button is-primary"
              v-if="!product.isAddedToCart"
              @click="addToCart(product.id)"
            >{{ addToCartLabel }}</button>
            <button
              class="button is-text"
              v-if="product.isAddedToCart"
              @click="removeFromCart(product.id, false)"
            >{{ removeFromCartLabel }}</button>
            <div>
              <div class="select is-rounded is-small">
                <select @change="onSelectQuantity(product.id)" v-model="selected">
                  <option
                    v-for="quantity in quantityArray"
                    :value="quantity"
                    :key="quantity"
                  >{{ quantity }}</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <router-link
      class="details"
      :to="{
        path: '/product-detail',
        name: 'product-detail-component',
        params: {
          id: product.id,
          title: product.title,
          price: product.price,
          stock: product.stock,
          isAddedBtn: product.isAddedBtn
        }
      }"
    ></router-link>
  </div>
</template>

<script>
export default {
  name: "products-component",
  props: ["product"],

  data() {
    return {
      addToCartLabel: "Add to cart",
      viewDetailsLabel: "Details",
      removeFromCartLabel: "Remove from cart",
      selected: 1,
      quantityArray: []
    };
  },

  mounted() {
    for (let i = 1; i <= 20; i++) {
      this.quantityArray.push(i);
    }

    if (this.$props.product.quantity > 1) {
      this.selected = this.$props.product.quantity;
    }
  },

  computed: {
    isUserLogged() {
      return this.$store.getters.isUserLoggedIn;
    }
  },

  methods: {
    addToCart(id) {
      let data = {
        id: id,
        status: true
      };
      this.$store.commit("addToCart", id);
      this.$store.commit("setAddedBtn", data);
    },
    removeFromCart(id) {
      let data = {
        id: id,
        status: false
      };
      this.$store.commit("removeFromCart", id);
      this.$store.commit("setAddedBtn", data);
    },
    onSelectQuantity(id) {
      let data = {
        id: id,
        quantity: this.selected
      };
      this.$store.commit("quantity", data);
    }
  }
};
</script>

<style lang="scss" scoped>
.details {
  cursor: pointer;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;

  &:hover {
    border: 1px solid #51bafc;
  }
}
.button,
.select {
  z-index: 2;
}
.select {
  position: absolute;
  right: 15px;
}
</style>


