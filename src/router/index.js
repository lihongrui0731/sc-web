import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import gateWay from '../views/gateWay.vue'
import stationMonitor from '../views/stationMonitor.vue'
import data from '../views/data.vue'


/* import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
// import App from './App.vue'; */
/* 
import Vuex from 'vuex'

Vue.use(ElementUI);

new Vue({
  el: '#app',
  render: h => h(App)
}); */

Vue.use(VueRouter)



/* s */

const routes = [
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/gateWay',
    name: 'gateWay',
    component: gateWay
  },
  {
    path: '/stationMonitor',
    name: 'stationMonitor',
    component: stationMonitor
  },
  {
    path: '/data',
    name: 'data',
    component: data
  },
]

const router = new VueRouter({
  routes
})

export default router
