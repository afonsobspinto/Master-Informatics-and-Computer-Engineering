<template>
  <div class="footer">
    <div class="columns container">
      <div class="column">
        <p>Phasellus feugiat arcu sapien, et iaculis ipsum elementum sit amet.</p>
      </div>
      <div class="column has-text-right">
        <p>
          Netrow | Made with
          <a href="https://vuejs.org/">Vue</a> |
          <router-link :to="{ path: '/about', name: 'about-component' }">About us</router-link>
        </p>
      </div>
      <!-- TODO remove this -->
      <a @click="$store.commit('isUserLoggedIn', true); $store.commit('addUsername', 'C0001');">Just Login</a>
    </div>
  </div>
</template>

<script>
export default {
  name: "footer-component"
};
</script>

<style lang="scss" scoped>
.footer {
  background: #b9e2fc;
  color: black;
  height: 13rem;
}
</style>
