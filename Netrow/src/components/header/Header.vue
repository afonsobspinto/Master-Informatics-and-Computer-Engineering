<template>
  <div>
    <nav class="navbar" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
        <router-link :to="{ path: '/', name: 'homepage-component' }" class="navbar-item">
          <h1 class="title is-3 is-flex-mobile"></h1>
        </router-link>

        <a role="button" class="navbar-burger burger" @click="isMenuOpen = !isMenuOpen" aria-label="menu" aria-expanded="false">
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div class="navbar-menu is-active">
        <div class="navbar-start">
          <div class="navbar-item field">
            <search-component></search-component>
          </div>
        </div>
        
        <div class="navbar-end">
          <div class="navbar-item shopping-cart" @click="showCheckoutModal">
            <span class="icon">
              <i class="fa fa-shopping-cart"></i>
            </span>
            <span :class="[numProductsAdded > 0 ? 'tag is-info' : '']">{{ numProductsAdded }}</span>
          </div>
        </div>
      </div>

      <!-- For mobile and tablet -->
      <!-- <div v-show="isMenuOpen" class="navbar-end">
        <menu-component></menu-component>
      </div> -->

      <!-- For desktop -->
      <div class="navbar-end ">
        <menu-component></menu-component>
      </div>
    </nav>
  </div>
</template>

<script>
  import Menu from '../menu/Menu';
  import Search from '../search/Search';

  export default {
    name: 'header-component',

    data () {
      return {
        isCheckoutActive: false,
        isMenuOpen: false
      }
    },

    computed: {
      numProductsAdded () {
        return this.$store.getters.productsAdded.length;
      }
    },

    components: {
      'search-component': Search,
      'menu-component': Menu
    },

    methods: {
      showCheckoutModal () {
        this.$store.commit('showCheckoutModal', true);
      }
    }
  };
</script>

<style lang="scss" scoped>
  .title {
    background: url('../../../public/assets/netrow-logo.png') no-repeat;
    background-position: 50% 50%;
    background-size: 165px;
    width: 175px;
    height: 35px;
  }
  .shopping-cart {
    cursor: pointer;
  }
  a {
    color: grey;
  }
</style>
