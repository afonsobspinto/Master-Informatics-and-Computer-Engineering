import Vue from 'vue';
import Router from 'vue-router';
import Homepage from '../src/components/homepage/Homepage';
import ProductDetail from '../src/components/product_detail/ProductDetail';
import OrderHistoryContainer from '../src/components/user/OrderHistoryContainer';
import Account from '../src/components/user/Account';
import About from '../src/components/about/About';
import CheckoutPage from "./components/checkout/CheckoutPage";

Vue.use(Router);

export default new Router({
  mode: 'history', // removes hashbang from url
  routes: [
    {
      path: '/',
      name: 'homepage-component',
      component: Homepage,
    },
    {
      path: '/product-detail/:id',
      name: 'product-detail-component',
      props: true,
      component: ProductDetail,
    },
    {
      path: '/order-history',
      name: 'order-history-container-component',
      component: OrderHistoryContainer,
    },
    {
      path: '/account',
      name: 'account-component',
      component: Account,
    },
    {
      path: '/checkoutPage',
      name: 'checkout-page-component',
      component: CheckoutPage,
    },
    {
      path: '/about',
      name: 'about-component',
      component: About,
    }
  ],
});
