<template>
  <v-app id="inspire">
    <!-- 左侧面板 -->
    <v-navigation-drawer v-model="drawerLeft" app class="gw-nav">
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="text-h6"> Nav </v-list-item-title>
          <v-list-item-subtitle> 击穿系统 </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list dense nav class="nav-menu">
        <v-list-item v-for="item in items" :key="item.title" :to="item.to" link>
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title class="">{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app>
      <v-app-bar-nav-icon
        @click="drawerLeft = !drawerLeft"
      ></v-app-bar-nav-icon>
      <!-- title -->
      <v-toolbar-title>声学成像模块</v-toolbar-title>

      <v-spacer></v-spacer>

    </v-app-bar>

    <v-main>
      <!-- <keep-alive> -->
      <router-view></router-view>
      <!-- <router-view v-if="$route.meta.keepAlive"></router-view>
       </keep-alive>
      <router-view v-if="!$route.meta.keepAlive"></router-view> -->
   
    </v-main>
  </v-app>
</template>

<script>
import WsClient from "./components/WsClient.js";
import gwAddress from "./components/address.vue";
// import addressList from "./components/address.vue"

// var imageModes = ["auto", "fixed", "avg"];

export default {
  components: {
    'ws-client': WsClient,
  },
  data() {
    return {
      drawerLeft: null,
      drawerRight: null,
      items: [
        { title: "网关列表", icon: "mdi-ip-network", to: "/gateway" },
        {
          title: "实时监测",
          icon: "mdi-monitor-dashboard",
          to: "/stationMonitor",
        },
        { title: "数据", icon: "mdi-database-arrow-down", to: "/data" },
        // { title: "Test", icon: "mdi-help-box", to: "/Test" },
        // { title: "Arcade", icon: "mdi-help-box", to: "/About" },
      ],
      right: null,
      /** 控制左侧面板的显示 */
      drawerLeft: true,
      /** 控制右侧面板的显示 */
      drawerRight: false,

      // appInfo: appConfigModule.appInfo,
      // uiOptions: appConfigModule.uiOptions,

      /** 网关提供 WebSocket 服务的端口 */
      gwPort: 6380,

      /* 网关 ws 的确定方式：从列表中选择，或采用当前页面所在主机地址 */
      // gwPickMode: appConfigModule.gwPickMode,

      /** 可选择的网关地址列表 */
      gwAddresses: [ ],

      /** 当前选定要连接的网关地址 */
      selectedGwAddr: [],
      /** 是否可对网关发出操作，由当前已连接的各网关的状态决定 */
      gwOpsEnabled: false,

      picks: {
        cameraMode: [
          { value: "640@16", label: "640x480 @ 16fps" },
          { value: "320@50", label: "320x240 @ 50fps" },
        ],
        acousticFrameRate: [
          { value: 50, label: "50 fps" },
          { value: 100, label: "100 fps" },
        ],
      },

      captureOptions: {
        cameraMode: "640@16",
        acousticFrameRate: 50,
      },

      captureSettings: {
        freqRange: [4000, 7000],
        distance: 3000,
        //cameraLighting: false,
      },
      imageSettings: {
        modeIndex: 0,
        imageMode: "auto",
        dynamicRange: 1.1,
        fixedThreshold: 60,
        thresholdMargin: 5.0,
      },

      running: null,
    };
  },
  // computed: {
  //   
  // },
  // methods: {
  //  
  // },
  // mounted() {
  //  
  // },
};
</script>
<style>
.gw-nav .nav-menu .v-list-item .v-list-item__title{
  font-size: 0.8125rem;
  /* font-family: Arial; */
  font-style: normal;
  font-variant: normal;
  font-weight: 700;
  line-height: 20px;
}
.app-root .v-label,
.app-container .v-label {
  font-size: 14px;
}

.panel .v-card__title {
  padding: 8px 0;
}

.panel .v-card__actions {
  justify-content: center;
}

.panel .v-input--selection-controls {
  margin-top: 0;
}

/* app layout */

/* .panel-opt__wrap {
  height: 100%;
  width: 100%;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
} */
</style>