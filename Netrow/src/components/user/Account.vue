<template>
    <div class="section">
      <div class="card">
        <div class="field">
          <label class="label">Username</label>
          <div class="control">
            <input class="input" type="text" placeholder="e. g. ab123" :value="profile.username">
          </div>
        </div>
        <div class="field">
          <label class="label">Name</label>
          <div class="control">
            <input class="input" type="text" placeholder="e.g Alex Smith" :value="profile.name">
          </div>
        </div>
        <div class="field">
          <label class="label">Email</label>
          <div class="control">
            <input class="input" type="email" placeholder="e.g. alexsmith@gmail.com" :value="profile.email">
          </div>
        </div>
        <div class="field">
          <label class="label">Password</label>
          <div class="control">
            <input class="input" type="password" placeholder="e.g. Str0ngestP@ssw0rdEver" :value="profile.password">
          </div>
        </div>
        <div class="field">
          <label class="label">Phone</label>
          <div class="control">
            <input class="input" type="number" placeholder="e.g. 920546432" :value="profile.phone">
          </div>
        </div>
        <div class="field">
          <label class="label">Address</label>
          <div class="control">
            <input class="input" type="text" placeholder="e.g. Rom D. Dom" :value="profile.address">
          </div>
        </div>
        <div class="field">
          <label class="label">City</label>
          <div class="control">
            <input class="input" type="text" placeholder="e.g. Porto" :value="profile.city">
          </div>
        </div>
        <div class="field">
          <label class="label">Zip-Code</label>
          <div class="control">
            <input class="input" type="text" placeholder="e.g. 1111-231" :value="profile.zip_code">
          </div>
        </div>
        <div class="field">
          <label class="label">Country</label>
          <div class="control">
            <input class="input" type="text" placeholder="e.g. Portugal" :value="profile.country">
          </div>
        </div>
        <div class="field">
          <label class="label">Fiscal Number</label>
          <div class="control">
            <input class="input" type="number" placeholder="e.g. 241241234" :value="profile.fiscal_number">
          </div>
        </div>
      </div>
        <div class="text-center"><button class="btn btn-primary btn-sx mt-3" type="button">Update</button></div>
  </div>
</template>

<script>
import { HttpClient } from '../../lib/httpClient';


export default {
  name: 'account-component',
  data () {
    return {
      profile: {
        username: "",
        name: "",
        email: "",
        password: "",
        phone: "",
        address: "",
        city: "",
        zip_code: "",
        country: "",
        fiscal_number: "",
      }
    };
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      const username = vm.$store.getters.username;
      HttpClient.instance(console.error)
        .getProfile(username)
        .then(profile => {
          console.log(profile);
          vm.profile = {
            ... vm.profile, 
            username: username,
            name: profile.Nome,
            email: profile.CDU_Email,
            password: profile.CDU_Password,
            phone: profile.Telefone,
            address: profile.Morada,
            city: profile.Localidade,
            zip_code: profile.CodigoPostal,
            country: profile.Pais,
            fiscal_number: profile.NumContribuinte,
          }
        }).catch(e => {
          console.error(e);
          vm.$toaster.error("Failed to fetch profile data");
        })
    })
  }
};
</script>