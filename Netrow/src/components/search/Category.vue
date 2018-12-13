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
    }
  },

  methods: {
    selectCategory() {
      this.$store.commit("setCategorySelected", this.category);
    },
    getCategories() {
    this.categoriesList = this.$store.getters.categories;      
    // console.log('catlist')
    // console.log(this.categoriesList)
    return this.categoriesList;
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