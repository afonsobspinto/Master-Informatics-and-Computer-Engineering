import Vue, { PluginObject } from 'vue'
import App from './App.vue'
import router from './router'
import BootstrapVue from 'bootstrap-vue'
import store from './store';
import VeeValidate from 'vee-validate';
import 'v-toaster/dist/v-toaster.css';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import { library } from '@fortawesome/fontawesome-svg-core'

//need to import icons individually as needed
import { faCartPlus } from '@fortawesome/free-solid-svg-icons'

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
//@ts-ignore
import Toaster from 'v-toaster';

//Add to the library every icon needed
library.add(faCartPlus)

Vue.config.productionTip = false

Vue.use(BootstrapVue);
Vue.use(VeeValidate);
Vue.use(Toaster, {timeout: 5000});

Vue.component('font-awesome-icon', FontAwesomeIcon)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')



