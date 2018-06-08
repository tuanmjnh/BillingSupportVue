import Vue from 'vue';
import Vuex from 'vuex';
import {firestore} from '../connection/firebaseInit.js'
import auth from './modules/auth';
import cart from './modules/cart'
import products from './modules/products'

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth,
    cart,
    products
  },
  state: { // = data
  },

  getters: { // = computed properties
  },

  actions: {},

  mutations: {}

});
