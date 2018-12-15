<template>
  <p class="control has-icons-right">
    <select class="input is-rounded" id="categoryInput" v-model="category" @change="selectCategory">
      <option value="all" selected>All categories</option>

      <optgroup v-for="cat in categoriesList" :key="cat.familia" :label="cat.descricao">
        <option :value="'cat_'+cat.descricao" selected>all {{cat.descricao.toLowerCase()}}</option>
        <option
          v-for="sub in cat.subCategories"
          :key="sub.subFamilia"
          :value="sub.subFamilia"
        >{{sub.descricao}}</option>
      </optgroup>
    </select>
    <span class="icon is-small is-right">
      <i class="fas fa-caret-down"></i>
    </span>
  </p>
</template>

<script>
import { HttpClient } from "../../lib/httpClient";
import Vue from "vue";

export default {
  name: "category-component",
  data() {
    return {
      category: "all",
      categoriesList: []
    };
  },
  mounted() {
    let that = this;
    HttpClient.instance(console.error, instance => {
      instance
        .getCategories()
        .then(catObj => {
          let categories = catObj.DataSet.Table;
          let organizedCategories = [];
          categories.forEach(subCat => {
            let found = false;
            organizedCategories.forEach(category => {
              if (category.familia === subCat.Familia) {
                found = true;
                category.subCategories.push({
                  subFamilia: subCat.SubFamilia,
                  descricao: subCat.SubDescricao
                });
              }
            });

            if (!found) {
              organizedCategories.push({
                familia: subCat.Familia,
                descricao: subCat.Descricao,
                subCategories: [
                  {
                    subFamilia: subCat.SubFamilia,
                    descricao: subCat.SubDescricao
                  }
                ]
              });
            }
          });

          that.categoriesList = organizedCategories;
        })
        .catch(e => {
          console.error(e);
          console.error("Failed to fetch categories data");
          that.$toaster.error("Failed to fetch categories data");
        });
    });
  },
  computed: {
    placeholder() {
      if (this.$route.path === "/wishlist") {
        return "Search in wishlist...";
      } else {
        return "Search...";
      }
    },
    getCategories: function() {
      return this.$store.getters.categories;
    }
  },

  methods: {
    selectCategory() {
      this.$store.commit("setCategorySelected", this.category);
    }
  }
};
</script>

<style lang="scss" scoped>
#categoryInput {
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
}
</style>