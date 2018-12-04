<template>
    <div class="section">
      <div class="card">
        <div class="field">
          <label class="label">Username</label>
          <div class="control">
            <input class="input" type="text" placeholder="e. g. ab123"  v-model="profile.Cliente" disabled>
          </div>
        </div>
        <div class="field">
          <label class="label">Name</label>
          <div class="control">
            <input class="input" type="text" placeholder="e.g Alex Smith"  v-model="profile.Nome">
          </div>
        </div>
        <div class="field">
          <label class="label">Email</label>
          <div class="control">
            <input class="input" type="email" placeholder="e.g. alexsmith@gmail.com"  v-model="profile.CDU_CampoVar1">
          </div>
        </div>
        <div class="field">
          <label class="label">Password</label>
          <div class="control">
            <input class="input" type="password" placeholder="e.g. Str0ngestP@ssw0rdEver"  v-model="profile.CDU_CampoVar2">
          </div>
        </div>
        <div class="field">
          <label class="label">Phone</label>
          <div class="control">
            <input class="input" type="number" placeholder="e.g. 920546432"  v-model="profile.Telefone">
          </div>
        </div>
        <div class="field">
          <label class="label">Address</label>
          <div class="control">
            <input class="input" type="text" placeholder="e.g. Rom D. Dom"  v-model="profile.Morada">
          </div>
        </div>
        <div class="field">
          <label class="label">City</label>
          <div class="control">
            <input class="input" type="text" placeholder="e.g. Porto"  v-model="profile.Localidade">
          </div>
        </div>
        <div class="field">
          <label class="label">Zip-Code</label>
          <div class="control">
            <input class="input" type="text" placeholder="e.g. 1111-231"  v-model="profile.CodigoPostal">
          </div>
        </div>
        <div class="field">
          <label class="label">Country</label>
          <div class="control">
            <input class="input" type="text" placeholder="e.g. Portugal"  v-model="profile.Pais">
          </div>
        </div>
        <div class="field">
          <label class="label">Fiscal Number</label>
          <div class="control">
            <input class="input" type="number" placeholder="e.g. 241241234"  v-model="profile.NumContribuinte">
          </div>
        </div>
      </div>
      <div class="text-center">
        <button class="btn btn-primary btn-sx mt-3" type="button" @click="updateProfile">Update</button>
      </div>
  </div>
</template>

<script>
import { HttpClient } from '../../lib/httpClient';


export default {
  name: 'account-component',
  data () {
    return {
      profile: {
        Cliente: "",
        Nome: "",
        CDU_CampoVar1: "",
        CDU_CampoVar2: "",
        Telefone: "",
        Morada: "",
        Localidade: "",
        CodigoPostal: "",
        Pais: "",
        NumContribuinte: "",
      }
    };
  },
  methods: {
    updateProfile() {
      let requestData = {
        ... this.profile,
        EmModoEdicao: true,
        Moeda: 'EUR',
        CamposUtil: [
          {
            "Nome": "CDU_CampoVar1",
            "Valor": this.profile.CDU_CampoVar1
          },
          {
            "Nome": "CDU_CampoVar2",
            "Valor": this.profile.CDU_CampoVar2
          }
        ]
      }
      delete requestData.CDU_CampoVar1;
      delete requestData.CDU_CampoVar2;

      HttpClient.instance(console.error)
        .postJson("Base/Clientes/Actualiza", requestData)
        .then(data => {
          this.$toaster.success('Updated Profile Successfully.');
        }).catch(e => {
          console.error(e);
          this.$toaster.error("Failed to Update Profile.");
        })
    },
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      const username = vm.$store.getters.username;
      HttpClient.instance(console.error)
        .getProfile(username)
        .then(profile => {
          vm.profile = {
            ... vm.profile, 
            Cliente: username,
            ... profile
          }
        }).catch(e => {
          console.error(e);
          vm.$toaster.error("Failed to fetch profile data");
        })
    })
  }
};
</script>