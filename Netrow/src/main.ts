import Vue from 'vue';
import '@fortawesome/fontawesome-free/css/all.css';
import 'bulma';
import 'babel-polyfill';

//@ts-ignore
import App from './App';
//@ts-ignore
import router from './router';
import store from './store';

Vue.config.productionTip = false;


new Vue({
  //@ts-ignore
  router,
  store,
  render: h => h(App),
}).$mount('#app');
