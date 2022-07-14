<template>
  <v-app id="inspire">
    <!-- 左侧面板 -->
    <v-navigation-drawer v-model="drawerLeft" app class="gw-nav">
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="nav-title"> 声学相机控制系统 </v-list-item-title>
          <v-list-item-subtitle class="nav-subtitle"> Rhythm-tech </v-list-item-subtitle>
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
      <v-img href="./assets/img/rhythm-tech.png" class="nav-logo" alt="Rhythm-tech"></v-img>
    </v-navigation-drawer>

    <v-app-bar app>
      <v-app-bar-nav-icon
        @click="drawerLeft = !drawerLeft"
      ></v-app-bar-nav-icon>
      <!-- title -->
      <v-toolbar-title class="app-bar-title">声学成像模块</v-toolbar-title>

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
      /** 控制左侧面板的显示 */
      drawerLeft: true,
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
.app-bar-title{
  font-weight: 700;
}
.gw-nav .nav-menu .v-list-item .v-list-item__title{
  font-size: 0.8125rem;
  font-style: normal;
  font-variant: normal;
  font-weight: 700;
  line-height: 20px;
}
.gw-nav .v-list-item .nav-title {
  font-size: 22px;
  font-weight: 700;
}
.nav-subtitle{
  font-weight: 700;
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