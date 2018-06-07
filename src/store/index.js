import Vue from 'vue';
import Vuex from 'vuex';
import db from '../connection/firebaseInit.js'
import auth from './auth';

Vue.use(Vuex);

export const store = new Vuex.Store({
  modules: {
    auth: auth
  }
});
