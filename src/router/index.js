import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Gateway from "../views/gateway.vue";
import Data from "../views/data.vue";
import StationMonitor from "../views/stationMonitor.vue"



Vue.use(VueRouter);



const routes = [
  {
    path: "/Test",
    name: "Test",
    component: Home,
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
  {
    path: "/gateway",
    name: "gateway",
    component: Gateway,
  },
  {
    path: "/stationmonitor",
    name: "stationMonitor",
    component: StationMonitor,
  },
  {
    path: "/data",
    name: "data",
    component: Data,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
