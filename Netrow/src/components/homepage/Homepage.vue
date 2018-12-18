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
      HttpClient.instance(console.error)
          .getProducts()
          .then(prods => {
              console.log(prods)
          })
          .catch(e => {
        console.error(e);
        vm.$toaster.error("Failed to fetch profile data");
      })
    })
  }
};
</script>
