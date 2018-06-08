import Vue from 'vue'
import Router from 'vue-router'
import {firebase} from '../connection/firebaseInit.js'
import home from '@/modules/home/home'
import auth from '@/modules/auth/auth'
import dashboard from '@/modules/dashboard/dashboard'
import datatable from '@/modules/datatable/datatable'
import vue2datatable from '@/modules/vue2datatable/vue2datatable';
import tmDatatable from '@/modules/tm-datatable/datatable';
import demoStore from '@/modules/demo-store/index';

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [{
      path: '*',
      redirect: '/home'
    },
    {
      path: '/home',
      name: 'Home',
      component: home,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/auth',
      name: 'auth',
      component: auth
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: dashboard,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/datatable',
      name: 'Datatable',
      component: datatable,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/vue2datatable',
      name: 'vue2datatable',
      component: vue2datatable,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/tmdatatable',
      name: 'TMDatatable',
      component: tmDatatable,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/demostore',
      name: 'Demostore',
      component: demoStore,
      meta: {
        requiresAuth: true
      }
    }

  ]
});
router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(x => x.meta.requiresAuth)
  const currentUser = firebase.auth().currentUser
  if (requiresAuth && !currentUser) {
    next('/auth')
  } else if (requiresAuth && currentUser) {
    next()
  // } else if (currentUser && to.name === 'auth') {
  //   next('/home')
  } else {
    next()
  }
})

export default router
