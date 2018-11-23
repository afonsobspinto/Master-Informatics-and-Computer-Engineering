import Vue, { PluginObject } from 'vue'
import App from './App.vue'
import router from './router'
import BootstrapVue from 'bootstrap-vue'
import store from './store';
import VeeValidate from 'vee-validate';
import 'v-toaster/dist/v-toaster.css';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
//@ts-ignore
import Toaster from 'v-toaster';


Vue.config.productionTip = false

Vue.use(BootstrapVue);
Vue.use(VeeValidate);
Vue.use(Toaster, {timeout: 5000});


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')



