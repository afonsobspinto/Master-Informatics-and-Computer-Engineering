<template>
  <p class="control has-icons-right">
    <select class="input is-rounded" id="categoryInput" v-model="category" @change="selectCategory">
      <option value="all" selected>All categories</option>
      <optgroup v-for="(subCat, cat) in categoriesList" :key="cat" :label="cat">
        <option  v-for="sub in subCat" :key="sub.subCategory" :value="sub.subCategory">{{sub.subCatDesc}}</option>
      </optgroup>
    </select>
    <span class="icon is-small is-right">
      <i class="fas fa-caret-down"></i>
    </span>
  </p>
</template>

<script>
export default {
  name: "category-component",
  data() {
    return {
      category: "all",
      categoriesList: []
    };
  },
  mounted() {

  },
  computed: {
    placeholder() {
      if (this.$route.path === "/wishlist") {
        return "Search in wishlist...";
      } else {
        return "Search...";
      }

    },
    getCategories: function () {
      return this.$store.getters.categories;      
    }
  },

  methods: {
    selectCategory() {
      this.$store.commit("setCategorySelected", this.category);
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      HttpClient.instance(console.error, (instance) => {
        instance.getCategories()
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
                vm.categoriesList = organizedCategories;
                console.log('organizedCategories')
                console.log(organizedCategories)
              })
              .catch(e => {
                console.error(e);
                console.error("Failed to fetch categories data");
                vm.$toaster.error("Failed to fetch categories data");
              });
            })
        });
      },
};
</script>

<style lang="scss" scoped>
#categoryInput {
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
}
</style>