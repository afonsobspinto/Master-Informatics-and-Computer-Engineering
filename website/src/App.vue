<template>
  <div id="app">
    <Header/>
    <div class="container">
      <router-view class="mt-5"/>
    </div>
  </div>
</template>


<script lang="ts">
import Vue from 'vue';
import Header from './components/Header.vue';

export default Vue.extend({
  name: 'app',
  components: {
    Header,
  },
});
</script>

<style lang="scss">
</style>
