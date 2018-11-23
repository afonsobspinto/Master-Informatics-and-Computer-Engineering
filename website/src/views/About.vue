<template>
  <div class="about">
    <p>This is a computer shop company You are </p>
    <p> {{ $store.state.isLoggedin }} </p>
  </div>
</template>


<script lang="ts">
import Vue from 'vue';
import store from '../store';

export default Vue.extend({
  name: 'About',
});
</script>


