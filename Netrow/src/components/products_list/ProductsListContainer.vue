<template>
  <div class="columns is-centered is-multiline">
    <div class="card column is-one-quarter" v-for="product in products" :key="product.id">
      <products-component :product="product"></products-component>
    </div>
    <div class="section" v-if="products.length === 0">
      <p>{{ noProductLabel }}</p>
    </div>
  </div>
</template>

<script>
import ProductsComponent from "../Products";
import { getByTitle, getByCategory, getInPriceRange } from "../../filters";

export default {
  name: "products-list-component",

  components: {
    "products-component": ProductsComponent
  },

  data() {
    return {
      id: "",
      noProductLabel: "No product found",
      productsFiltered: []
    };
  },

  computed: {
    products() {
      let prods = this.getProductByCategory();
      prods = this.getProductInRange(prods);
      if (this.$store.state.userInfo.hasSearched) {
        return this.getProductByTitle(prods);
      } else {
        return prods;
      }
    }
  },

  methods: {
    getProductByTitle(products) {
      let listOfProducts = products,
        titleSearched = this.$store.state.userInfo.productTitleSearched;

      return (this.productsFiltered = getByTitle(
        listOfProducts,
        titleSearched
      ));
    },
    getProductByCategory() {
      let listOfProducts = this.$store.state.products,
        categoryFilter = this.$store.state.userInfo.categoryFilter;

      return (this.productsFiltered = getByCategory(
        listOfProducts,
        categoryFilter
      ));
    },
    getProductInRange(products) {
      let listOfProducts = products,
        priceRange = this.$store.state.userInfo.selectedPriceRange;

      return (this.productsFiltered = getInPriceRange(
        listOfProducts,
        priceRange
      ));
    }
  }
};
</script>

<style lang="scss" scoped>
.card {
  margin: 10px;
}
</style>
