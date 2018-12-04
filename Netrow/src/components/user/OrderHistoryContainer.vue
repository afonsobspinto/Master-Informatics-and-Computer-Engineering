<template>
  <div class="section">
    <h3 class="title">{{ pageTitle }}</h3>
    <div class="columns is-centered is-multiline">
      <div class="column">
          <table class="table">
              <thead>
              <tr>
                  <th scope="col">#</th>
                  <th scope="col">Name</th>
                  <th scope="col">Quantity</th>
                  <th scope="col">Price</th>
              </tr>
              </thead>
              <tbody>

              <tr>
                  <th scope="row">1</th>
                  <td>Product 1</td>
                  <td>3</td>
                  <td>30€</td>
              </tr>
              <tr>
                  <th scope="row">2</th>
                  <td>Product 2</td>
                  <td>1</td>
                  <td>10€</td>
              </tr>
              <tr>
                <td>Date:</td>
                <td>02/12/2018</td>
                <td>TOTAL:</td>
                <td>100€</td>
              </tr>
              <tr>
                <td>Shipped</td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              </tbody>
          </table>
      </div>
      <div class="column">
          <table class="table">
              <thead>
              <tr>
                  <th scope="col">#</th>
                  <th scope="col">Name</th>
                  <th scope="col">Quantity</th>
                  <th scope="col">Price</th>
              </tr>
              </thead>
              <tbody>

              <tr>
                  <th scope="row">1</th>
                  <td>Product 1</td>
                  <td>3</td>
                  <td>30€</td>
              </tr>
              <tr>
                  <th scope="row">2</th>
                  <td>Product 2</td>
                  <td>1</td>
                  <td>10€</td>
              </tr>
              <tr>
                <td>Date:</td>
                <td>02/12/2018</td>
                <td>TOTAL:</td>
                <td>100€</td>
              </tr>
              <tr>
                <td>Shipped</td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              </tbody>
          </table>
      </div>
      <div class="column">
          <table class="table">
              <thead>
              <tr>
                  <th scope="col">#</th>
                  <th scope="col">Name</th>
                  <th scope="col">Quantity</th>
                  <th scope="col">Price</th>
              </tr>
              </thead>
              <tbody>

              <tr>
                  <th scope="row">1</th>
                  <td>Product 1</td>
                  <td>3</td>
                  <td>30€</td>
              </tr>
              <tr>
                  <th scope="row">2</th>
                  <td>Product 2</td>
                  <td>1</td>
                  <td>10€</td>
              </tr>
              <tr>
                <td>Date:</td>
                <td>02/12/2018</td>
                <td>TOTAL:</td>
                <td>100€</td>
              </tr>
              <tr>
                <td>Shipped</td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              </tbody>
          </table>
      </div>
      <div class="column">
          <table class="table">
              <thead>
              <tr>
                  <th scope="col">#</th>
                  <th scope="col">Name</th>
                  <th scope="col">Quantity</th>
                  <th scope="col">Price</th>
              </tr>
              </thead>
              <tbody>

              <tr>
                  <th scope="row">1</th>
                  <td>Product 1</td>
                  <td>3</td>
                  <td>30€</td>
              </tr>
              <tr>
                  <th scope="row">2</th>
                  <td>Product 2</td>
                  <td>1</td>
                  <td>10€</td>
              </tr>
              <tr>
                  <td>Date:</td>
                  <td>02/12/2018</td>
                  <td>TOTAL:</td>
                  <td>100€</td>
              </tr>
              <tr>
                <td>Shipped</td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              </tbody>
          </table>
      </div>
      <div class="section" v-if="productsInOrderHistory.length === 0">
        <p>{{ noProductLabel }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import ProductsComponent from '../OrderedProduct';
import { getByTitle } from '../../filters';

export default {
  name: 'order-history-container-component',
  data () {
    return {
      pageTitle: 'Your Order history',
      noProductLabel: 'Your Order history is empty'
    }
  },

  components: {
    'products-component': ProductsComponent
  },

  computed: {
    productsInOrderHistory () {
      if (this.$store.state.userInfo.hasSearched) {
        return this.getProductByTitle();
      } else {
        return this.$store.getters.productsAddedToFavourite;
      }
    }
  },

  methods: {
    getProductByTitle () {
      let listOfProducts = this.$store.getters.productsAddedToFavourite,
          titleSearched = this.$store.state.userInfo.productTitleSearched;

      return this.productsFiltered = getByTitle(listOfProducts, titleSearched);
    }
  }
}
</script>

<style lang="scss" scoped>
  .card {
    margin: 10px;
  }
</style>
