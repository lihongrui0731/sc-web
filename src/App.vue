<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawerLeft" app>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="text-h6"> 功能 </v-list-item-title>
          <v-list-item-subtitle> 击穿系统 </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list dense nav>
        <v-list-item v-for="item in items" :key="item.title" :to="item.to" link>
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app>
      <v-app-bar-nav-icon
        @click="drawerLeft = !drawerLeft"
      ></v-app-bar-nav-icon>

      <v-toolbar-title>声学成像模块</v-toolbar-title>
    </v-app-bar>

    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>

  export default {
    data () {
      return {
        drawerLeft: null,
        items: [
          { title: '网关配置', icon: 'mdi-ip-network', to: '/gateWay' },
          { title: '实时监测', icon: 'mdi-monitor-dashboard', to: '/stationMonitor' },
          { title: '数据', icon: 'mdi-database-arrow-down', to: '/data' },
          { title: 'Home', icon: 'mdi-help-box', to: '/Home' },
          { title: 'About', icon: 'mdi-help-box', to: '/About' },
        ],
        right: null,
      }
    },
  }
</script>
