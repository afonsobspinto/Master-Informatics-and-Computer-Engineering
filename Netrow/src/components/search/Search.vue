<template>
  <p class="control has-icons-left">
    <input
      class="input is-rounded"
      id="searchInput"
      type="text"
      v-model="value"
      :placeholder="placeholder"
      @keyup="search(value)"
    >
    <span class="icon is-small is-left">
      <i class="fas fa-search"></i>
    </span>
  </p>
</template>

<script>
export default {
  name: "search-component",
  data() {
    return {
      value: ""
    };
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
    search(value) {
      if (value.length > 0) {
        this.$store.commit("setHasUserSearched", true);
        this.$store.commit("setProductTitleSearched", value);
      } else {
        this.$store.commit("setHasUserSearched", false);
        this.$store.commit("setProductTitleSearched", "");
      }
    }
  }
};
</script>

<style lang="scss" scoped>
#searchInput {
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
}
</style>
