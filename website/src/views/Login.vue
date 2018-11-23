<script lang="ts">
import Vue from "vue";
import { tryLogin } from "../lib/authentication";

export default Vue.extend({
  name: "Login",
  data: function() {
    return {
      credentials: {
        email: "",
        password: ""
      },
    };
  },
  methods: {
    login: function() {
      if (tryLogin(this.credentials.email, this.credentials.password)) {
        this.$router.push('/');
      }
    }
  }
});
</script>

<template>
  
  <div class="w-50 mx-auto">
    <div class="mt-5 d-flex flex-column mx-auto p-4 bg-light" id="login">
      <fieldset class="d-flex flex-column mx-0">
          
          <h1 class="mx-auto pt-3 mb-5 font-weight-bold"> Login</h1>
          
          <div class="form-group">
              <label for="email">Email:</label>
              <div>
                <input id="email" type="email" class="form-control" name="email" v-validate="'required|email'" v-model="credentials.email">
                <span v-show="errors.has('email')" class="text-danger">{{ errors.first('email') }}</span>
              </div>
          </div>
          
          <div class="form-group">
              <label for="password">Password:</label>
              <div>
                  <input id="password" type="password" class="form-control" name="password" v-validate="'required'" v-model="credentials.password">
                  <span v-show="errors.has('password')" class="text-danger">{{ errors.first('password') }}</span>
              </div>
          </div>
          
          <router-link to="/register" class="btn btn-link" tag="a">Don't have an account? Register</router-link> 
          
          <button class="btn btn-primary mx-auto w-50 mb-3 mt-4" @click="login" v-bind:disabled="errors.any()">Login</button>
        </fieldset>
    </div>
  </div> 

</template>


