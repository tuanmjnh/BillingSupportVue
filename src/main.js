// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import './extensions/filter' // filter
// import VueFire from 'vuefire'
// import firebase from 'firebase/app'
// import 'firebase/firestore'
// import firebaseConfig from './connection/firebaseConfig';

// Firebase
// Initialize Firebase
// Vue.use(VueFire);

// const firebaseApp = firebase.initializeApp(firebaseConfig);
// export default firebaseApp.firestore();
// export const db = firebase.firestore();
// Config
Vue.config.productionTip = false;
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {
    App
  },
  template: '<App/>'
});
