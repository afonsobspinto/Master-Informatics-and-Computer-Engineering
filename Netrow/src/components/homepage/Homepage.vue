<template>
  <div>
    <hero></hero>
    <products-list-container></products-list-container>
  </div>
</template>

<script>
import ProductsListContainer from '../products_list/ProductsListContainer';
import HeroSection from '../hero/Hero';
import { HttpClient } from '../../lib/httpClient';

export default {
  name: 'homepage-component',
  components: {
    'products-list-container': ProductsListContainer,
    'hero': HeroSection
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      HttpClient.instance(console.error, instance => {
        instance
                .getProducts()
                .then(obj => {
                  let products = obj.DataSet.Table;
                  products.forEach(prod => {
                    console.log(prod)
                          }
                  )
                })
                .catch(e => {
                  console.error(e);
                  console.error("Failed to fetch products data");
                  vm.$toaster.error("Failed to fetch products data");
                })
      });
    })
  }
}
</script>
