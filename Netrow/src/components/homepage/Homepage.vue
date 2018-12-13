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
   beforeRouteEnter(to, from, next) {
        next(vm => {
          HttpClient.instance(console.error, (instance) => instance.getCategories())
            .then(catObj => {
              let categories = catObj.DataSet.Table;
              let organizedCategories = [];
              categories.forEach(category => {
                if(organizedCategories[category.Descricao] === undefined)
                {
                  organizedCategories[category.Descricao] = [];
                }
                organizedCategories[category.Descricao].push({
                    subCategory: category.SubFamilia,
                    subCatDesc: category.SubDescricao
                });
              });

              vm.$store.commit("setCategories", organizedCategories);
              console.log(organizedCategories)
            })
            .catch(e => {
              console.error(e);
              console.error("Failed to fetch categories data");
              vm.$toaster.error("Failed to fetch categories data");
            });
        });
      },
};
</script>
