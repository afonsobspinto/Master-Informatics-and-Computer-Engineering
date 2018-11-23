<script lang="ts">
import Vue from "vue";
import { tryLogin } from "../lib/authentication";
import { isObjectNotFullySet } from '../lib/utils';

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
  computed: {
    hasErrors: function(): boolean {
        //@ts-ignore
        return this.errors.any() || isObjectNotFullySet(this.credentials);
    }
  },
  methods: {
    register: function() {}
  }
});
</script>


<template>
  
  <div class="w-50 mx-auto mb-5">
    <div class="mt-5 d-flex flex-column mx-auto p-4 bg-light" id="register">
      <fieldset class="d-flex flex-column mx-0">
          
          <h1 class="mx-auto pt-3 mb-5 font-weight-bold"> Register</h1>
          
          <div class="form-group">
              <label for="name">Full Name:</label>
              <div>
                <input id="name" type="text" class="form-control" name="name" v-validate="'required'" v-model="credentials.name">
                <span v-show="errors.has('name')" class="text-danger">{{ errors.first('name') }}</span>
              </div>
          </div>

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

          <div class="form-group">
              <label for="phone">Phone:</label>
              <div>
                  <input id="phone" type="number" class="form-control" name="phone" v-validate="'required|numeric'" v-model="credentials.phone">
                  <span v-show="errors.has('phone')" class="text-danger">{{ errors.first('phone') }}</span>
              </div>
          </div>

          <div class="form-group">
              <label for="address">Address:</label>
              <div>
                  <input id="address" type="text" class="form-control" name="address" v-validate="'required'" v-model="credentials.address">
                  <span v-show="errors.has('address')" class="text-danger">{{ errors.first('address') }}</span>
              </div>
          </div>
          
          <div class="form-group">
              <label for="city">City:</label>
              <div>
                <input id="city" type="text" class="form-control" name="city" v-validate="'required'" v-model="credentials.city">
                <span v-show="errors.has('city')" class="text-danger">{{ errors.first('city') }}</span>
              </div>
          </div>

          <div class="form-group">
              <label for="zip-code">Zip-code:</label>
              <div>
                <input id="zip-code" type="text" class="form-control" name="zip-code" v-validate="'required'" v-model="credentials.zip_code">
                <span v-show="errors.has('zip-code')" class="text-danger">{{ errors.first('zip-code') }}</span>
              </div>
          </div>

          <div class="form-group">
              <label for="country">Country:</label>
              <div>
                <input id="country" type="text" class="form-control" name="country" v-validate="'required'" v-model="credentials.country">
                <span v-show="errors.has('country')" class="text-danger">{{ errors.first('country') }}</span>
              </div>
          </div>

          <div class="form-group">
              <label for="nif">Fiscal Number:</label>
              <div>
                <input id="nif" type="number" class="form-control" name="nif" v-validate="'required|numeric'" v-model="credentials.nif">
                <span v-show="errors.has('nif')" class="text-danger">{{ errors.first('nif') }}</span>
              </div>
          </div>

          <router-link to="/login" class="btn btn-link" tag="a">Already have an account? Login</router-link> 
          
          <button class="btn btn-primary mx-auto w-50 mb-3 mt-4" @click="register" v-bind:disabled="hasErrors">Register</button>
        </fieldset>
    </div>
  </div> 

</template>


