import Vue from 'vue';
import { sync } from 'vuex-router-sync';
import App from './containers/App.vue';
import router from './router';
import store from './store';
sync(store, router);

console.log('app');

const app = new Vue({
  router,
  store,
  ...App
});

export { app, router, store };
