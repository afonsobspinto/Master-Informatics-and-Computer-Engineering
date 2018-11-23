<template>
 
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    
    <router-link to="/" class="navbar-brand" tag="a">Netrow</router-link> 

    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav mr-auto">
        
        <li class="nav-item">
          <router-link to="/products" class="nav-link" tag="a">Products</router-link> 
        </li>

        <li class="nav-item">
          <router-link to="/profile" class="nav-link" tag="a">Profile</router-link> 
        </li>

        <li class="nav-item">
          <router-link to="/about" class="nav-link" tag="a">About Us</router-link> 
        </li>

      </ul>

      <ul class="navbar-nav my-2 my-lg-0">
        
        <li class="nav-item mr-2">
          <router-link to="/login" class="nav-link" tag="a">Login</router-link> 
        </li>
        
        <li class="nav-item">
          <router-link to="/cart" class="nav-link btn btn-info" tag="button">Shopping Cart</router-link> 
        </li>

      </ul>
    </div>
  </nav>

</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'Header'
});
</script>

<style lang="scss">
</style>
