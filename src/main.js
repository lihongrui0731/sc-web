import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import ECharts from 'vue-echarts';
// import * as echarts from 'echarts/core'
import { use } from "echarts/core";

import { CanvasRenderer } from "echarts/renderers";
import { TooltipComponent, GridComponent } from "echarts/components";
import { LineChart } from "echarts/charts";
import { UniversalTransition } from "echarts/features";
import moment from "moment";
import 'moment/locale/zh-cn';
use([
  CanvasRenderer,
  TooltipComponent,
  GridComponent,
  LineChart,
  UniversalTransition,
]);
moment.locale('zh-cn')
Vue.prototype.$moment = moment
Vue.config.productionTip = false;
Vue.component("v-chart", ECharts);

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");