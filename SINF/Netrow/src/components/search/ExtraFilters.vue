<template>
  <div v-if="showMoreFilters" class="control has-icons-left" id="filtersDiv">
    <label id="priceRange">Price:
      <vue-slider @callback="selectPriceRange" v-model="priceRange" v-bind="rangeSelectProps"></vue-slider>
    </label>
  </div>
</template>

<script>
import vueSlider from "vue-slider-component";
export default {
  name: "filters-component",
  data() {
    return {
      priceRange: [],
      rangeSelectProps: {
        width: "100%",
        height: 8,
        dotSize: 16,
        min: 0,
        max: 100,
        tooltip: "always",
        formatter: "{value}€",
        mergeFormatter: "{value1}€ < price < {value2}€"
      }
    };
  },
  mounted() {
    this.priceRange = this.$store.state.userInfo.selectedPriceRange;
  },
  computed: {
    placeholder() {
      if (this.$route.path === "/wishlist") {
        return "Search in wishlist...";
      } else {
        return "Search...";
      }
    },
    showMoreFilters() {
      if (this.$store.getters.isExtraFiltersVisible) {
        return true;
      } else {
        return false;
      }
    }
  },
  components: {
    vueSlider
  },
  methods: {
    selectPriceRange() {
      this.$store.commit("setPriceRangeSelected", this.priceRange);
    }
  }
};
</script>

<style lang="scss" scoped>
#filtersDiv {
  position: absolute;
  top: 3.25rem;
  width: 100%;
  padding: 0.5em 1em;
  background-color: white;
  border-radius: 0 0 1em 1em;
}
#priceRange {
  display: flex;
  flex-direction: row;
  align-content: center;
  width: 100%;
}

#priceRangeSelector {
  margin: 0 auto;
  width: 60%;
}
</style>