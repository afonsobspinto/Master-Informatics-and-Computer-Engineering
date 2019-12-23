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
              <tbody v-for="product in orderHistoryList" :key=""> <!-- TODO: Fix this UI -->
              <tr>
                  <th scope="row">1</th>
                  <td>{{product.Documento}}</td>
              </tr>
              <tr>
                <td>Date:</td>
                <td>{{product.Data}}</td>
                <td>TOTAL:</td>
                <td>{{product.TotalDocumento}}€</td>
              </tr>
              <tr>
                <td>{{product.Estado}}</td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              </tbody>
          </table>
      </div>
      <div class="section" v-if="orderHistoryList.length === 0">
        <p>{{ noProductLabel }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import ProductsComponent from '../OrderedProduct';
import { HttpClient } from '../../lib/httpClient';
import { getByTitle } from '../../filters';

export default {
  name: 'order-history-container-component',
  data () {
    return {
      pageTitle: 'Your Order history',
      noProductLabel: 'Your Order history is empty',
      orderHistoryList: []
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
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      HttpClient.instance(console.error, instance => {
        instance.getOrderHistory(vm.$store.getters.username)
                .then(obj => {
                    let orderHistoryList = obj;
                    vm.orderHistoryList = orderHistoryList.DataSet.Table;
                    console.log(vm.orderHistoryList);
                })
                .catch(e => {
                  console.error(e);
                  console.error("Failed to fetch order history data");
                  vm.$toaster.error("Failed to fetch order history data");
                })

      });
    })
  }
}
</script>

<style lang="scss" scoped>
  .card {
    margin: 10px;
  }
</style>
