<template>
  <p class="control has-icons-right">
    <select class="input is-rounded" id="categoryInput" v-model="category" @change="selectCategory">
      <option value="all" selected>All categories</option>
      <option v-for="cat in categoriesList" :key="cat" :value="cat">{{cat}}</option>
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
    this.categoriesList = this.$store.state.categories;
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