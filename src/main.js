// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/index';
import './extensions/filter' // filter
import {firebase} from './connection/firebaseInit.js'
// Config
Vue.config.productionTip = false;
/* eslint-disable no-new */
// new Vue({
//   el: '#app',
//   router,
//   store,
//   components: {App},
//   template: '<App/>'
// });
let app
firebase.auth().onAuthStateChanged(user => {
  // console.log(user)
  if (!app) {
    app = new Vue({
      el: '#app',
      router,
      store,
      components: {App},
      template: '<App/>'
    });
  }
})
