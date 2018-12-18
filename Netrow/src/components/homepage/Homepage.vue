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
    let products = []
    next(vm => {
      HttpClient.instance(console.error, instance => {
        instance.getProducts()
                .then(obj => {
                  let products = obj.DataSet.Table;
                  products.forEach(prod => {
                    instance.getProduct(prod.Artigo)
                            .then(p => {

                              let prod = {
                                id: p.Artigo,
                                title: p.Descricao,
                                description: p.DescricaoComercial ? p.DescricaoComercial : "Sem descrição adicional",
                                price: p.PCUltimo,
                                stock: p.StkActual,
                                isAddedToCart: false,
                                isAddedBtn: false,
                                category: p.Familia ? p.Familia : "Sem Categoria",
                                quantity: 1,
                                image: p.CamposUtil.url ? p.CamposUtil.url :"https://bulma.io/images/placeholders/480x480.png"
                              };

                              console.log(prod)

                              products.push(prod); // TODO: push to Store
                                    }
                            ).catch(e => {
                      console.error(e);
                      console.error("Failed to fetch product data");
                      vm.$toaster.error("Failed to fetch product data");
                    })
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
