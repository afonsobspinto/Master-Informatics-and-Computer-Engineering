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

              <tr v-for="product in orderHistoryList.Linhas" :key="">
                  <th scope="row">1</th>
                  <td>{{product.Descricao}}</td>
                  <td>{{product.Quantidade}}</td>
                  <td>{{product.PrecUnit}}€</td>
              </tr>
              <tr>
                <td>Date:</td>
                <td>{{orderHistoryList.DataDoc}}</td>
                <td>TOTAL:</td>
                <td>{{orderHistoryList.TotalMerc}}€</td>
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
        instance.getOrderHistory(1)
                .then(obj => {
                    let orderHistoryList = obj;
                    vm.orderHistoryList = orderHistoryList;
                    console.log(vm.orderHistoryList);
                })
                .catch(e => {
                  console.error(e);
                  console.error("Failed to fetch order history data");
                  vm.$toaster.error("Failed to fetch order history data");
                })

                  /*let orderAcc = null;
                  let counter = 1;

                  do {
                        instance.getOrderHistory(counter)
                                .then(obj => {
                                    orderAcc = obj;
                                })
                                .catch(e => {
                                  console.error(e);
                                  console.error("Failed to fetch order history data");
                                  vm.$toaster.error("Failed to fetch order history data");
                                });

                        counter++;

                        if(orderAcc != null){
                            vm.orderHistoryList = vm.orderHistoryList.concat(orderAcc);
                        }
                    } while(orderAcc != null);*/
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
