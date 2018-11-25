<script lang="ts">
import Vue from "vue";
import Account from "./Account.vue";

export default Vue.extend({
  name: "Register",
  data: function() {
    return {
      credentials: {
        name: "",
        email: "",
        password: "",
        phone: "",
        address: "",
        city: "",
        zip_code: "",
        country: "",
        nif: ""
      }
    };
  },
  methods: {
    register: function() {
      console.log("hi");
    }
  },
  components: {
    Account
  }
});
</script>


<template>
  <Account :credentials="credentials" title="Register" buttonText="Register" :onFormSubmit="register"> 
    <router-link to="/login" class="btn btn-link" tag="a">Already have an account? Login</router-link> 
  </Account>

</template>


