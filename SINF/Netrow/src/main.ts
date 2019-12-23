import Vue from 'vue';
import '@fortawesome/fontawesome-free/css/all.css';
import 'bulma';
import 'babel-polyfill';
import "v-toaster/dist/v-toaster.css";

//@ts-ignore
import App from './App';
//@ts-ignore
import router from './router';
import store from './store';
//@ts-ignore
import Toaster from "v-toaster";
import VeeValidate from "vee-validate";

Vue.use(VeeValidate);
Vue.use(Toaster, { timeout: 5000 });

Vue.config.productionTip = false;

new Vue({
  //@ts-ignore
  router,
  store,
  render: h => h(App),
}).$mount('#app');
