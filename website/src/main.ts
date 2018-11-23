import Vue from 'vue'
import App from './App.vue'
import router from './router'
import BootstrapVue from 'bootstrap-vue'
import store from './store';
import VeeValidate from 'vee-validate';

Vue.config.productionTip = false

Vue.use(BootstrapVue)
Vue.use(VeeValidate)

let vue = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
