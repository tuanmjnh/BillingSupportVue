import Vue from 'vue'
import Router from 'vue-router'
import home from '@/modules/home/home'
import datatable from '@/modules/datatable/datatable'
import vue2datatable from '@/modules/vue2datatable/vue2datatable';
import tmDatatable from '@/modules/tm-datatable/datatable';
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {path: '/', name: '', component: home},
    {path: '/home', name: 'home', component: home},
    {path: '/datatable', name: 'datatable', component: datatable},
    {path: '/vue2datatable', name: 'vue2datatable', component: vue2datatable},
    {path: '/tmdatatable', name: 'tmDatatable', component: tmDatatable}
  ]
})
