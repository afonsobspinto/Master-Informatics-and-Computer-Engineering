<script lang="ts">
import Vue from "vue";
import Account from "./Account.vue";

export default Vue.extend({
  name: "Profile",
  data: function() {
    return {
      credentials: {
        name: "John Doe",
        email: "johny@gmail.com",
        password: "12345",
        phone: "920546432",
        address: "Rom D. Dom",
        city: "Porto",
        zip_code: "1111-231",
        country: "Portugal",
        nif: "241241234"
      }
    };
  },
  methods: {
    update: function() {
      console.log("hi");
      alert("hi");
    }
  },
  components: {
    Account
  }
});
</script>


<template>
  <Account :credentials="credentials" title="Profile" buttonText="Update" :onFormSubmit="update"> 
    <!-- Account id: {{ $store.getters.userId }} TODO remove me -->
  </Account>
</template>


