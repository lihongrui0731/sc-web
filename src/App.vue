<template>
  <v-app id="inspire">
    <!-- 左侧面板 -->
    <v-navigation-drawer v-model="drawerLeft" app>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="text-h6"> Nav </v-list-item-title>
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
      <!-- title -->
      <v-toolbar-title>声学成像模块</v-toolbar-title>

      <v-spacer></v-spacer>

      <!-- <v-app-bar-nav-icon
        @click="drawerRight = !drawerRight"
      ></v-app-bar-nav-icon> -->
    </v-app-bar>
    <!-- 右侧控制面板 -->
   <!--  <v-navigation-drawer v-model="drawerRight" app clipped right width="308">
      <aside class="panel panel-opt__wrap">
        <v-card class="pa-3 mb-3" width="292">
          <v-card-title> <v-icon>mdi-tune</v-icon>采集参数 </v-card-title>
          <p>
            <label>频率范围:</label>&nbsp;<span>{{ freqRangeLabel }}</span>
          </p>
          <v-range-slider
            :min="0"
            :max="24400"
            step="100"
            v-model="captureSettings.freqRange"
          >
          </v-range-slider>

          <p>
            <label>距离:</label>&nbsp;<span>{{ distanceLabel }}</span>
          </p>
          <v-slider
            dense
            :min="100"
            :max="3500"
            step="100"
            v-model="captureSettings.distance"
          >
          </v-slider>

          <v-card-actions>
            <v-btn
              small
              :disabled="!gwOpsEnabled"
              @click="setCaptureParamsMulti"
              >设置采集参数</v-btn
            >
          </v-card-actions>
        </v-card>

        <v-card class="pa-3 mb-3" width="292">
          <v-card-title>
            <v-icon>mdi-play-network-outline</v-icon>设备控制
          </v-card-title>
          <v-card-actions>
            <v-btn
              small
              @click="toolbarBtn('record')"
              title="启动采集"
              :disabled="!gwOpsEnabled"
            >
              <v-icon color="#F44336">mdi-record</v-icon>
            </v-btn>
            <v-btn
              small
              @click="toolbarBtn('stop')"
              title="停止采集"
              :disabled="!gwOpsEnabled"
            >
              <v-icon>mdi-stop</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>

        <v-card class="pa-3" width="292">
          <v-card-title>
            <v-icon>mdi-image-auto-adjust</v-icon>成像参数
          </v-card-title>
          <v-tabs
            v-model="imageSettings.modeIndex"
            @change="imageModeChanged"
            hide-slider
          >
            <v-tab>自动模式</v-tab>
            <v-tab>阈值模式</v-tab>
            <v-tab>去噪模式</v-tab>
          </v-tabs>

          <p class="mt-2">
            <label>动态范围:</label>&nbsp;<span>{{ dynamicRangeText }}</span>
          </p>
          <v-slider
            :min="0.1"
            :max="12.0"
            step=".1"
            v-model="imageSettings.dynamicRange"
            :disabled="!gwOpsEnabled"
            @click="dynamicRangeChanged"
            @end="dynamicRangeChanged"
          />

          <div v-if="imageModeValue === 'fixed'">
            <p>
              <label>最大值:</label>&nbsp;<span>{{ fixedThresholdText }}</span>
            </p>
            <v-slider
              dense
              :min="0.1"
              :max="120.0"
              step=".1"
              v-model="imageSettings.fixedThreshold"
              :disabled="!gwOpsEnabled"
              @click="fixedThresholdChanged"
              @end="fixedThresholdChanged"
            />
          </div>

          <div v-if="imageModeValue === 'avg'">
            <p>
              <label>峰值因子:</label>&nbsp;<span>{{
                thresholdMarginText
              }}</span>
            </p>
            <v-slider
              dense
              :min="5.0"
              :max="15.0"
              step=".1"
              v-model="imageSettings.thresholdMargin"
              :disabled="!gwOpsEnabled"
              @click="thresholdMarginChanged"
              @end="thresholdMarginChanged"
            />
          </div>
        </v-card>
      </aside>
    </v-navigation-drawer>
 -->
    <v-main>
      <keep-alive>
      <!-- <router-view></router-view> -->
      <router-view v-if="$route.meta.keepAlive"></router-view>
       </keep-alive>
      <router-view v-if="!$route.meta.keepAlive"></router-view>
   
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
  //   /** 背景为暗色时文字改为亮灰色 */
  //   appBarTextStyle() {
  //     if (this.uiOptions.appBarTheme === "dark") {
  //       return { color: "#d0d0d0" };
  //     }
  //   },
  //   freqRangeLabel() {
  //     return (
  //       this.captureSettings.freqRange[0].toString() +
  //       "Hz ~ " +
  //       this.captureSettings.freqRange[1].toString() +
  //       "Hz"
  //     );
  //   },
  //   distanceLabel() {
  //     return (this.captureSettings.distance / 10).toFixed(0) + "cm";
  //   },

  //   dynamicRangeText() {
  //     return this.imageSettings.dynamicRange.toFixed(1) + "dB";
  //   },
  //   fixedThresholdText() {
  //     return this.imageSettings.fixedThreshold.toFixed(1) + "dB";
  //   },
  //   thresholdMarginText() {
  //     return this.imageSettings.thresholdMargin.toFixed(1) + "dB";
  //   },
  //   imageModeValue() {
  //     return imageModes[this.imageSettings.modeIndex];
  //   },
  // },
  // methods: {
  //   /** 更新是否允许对网关发送操作命令的状态 */
  //   updateOpEnabled() {
  //     if (!this.gwAddress || this.selectedGwAddr.length === 0) {
  //       this.gwOpsEnabled = false;
  //       return;
  //     }

  //     console.debug(
  //       "checking state of boxes: ",
  //       JSON.stringify(this.selectedGwAddr)
  //     );
  //     this.gwOpsEnabled = this.selectedGwAddr.some((addr) => {
  //       if (!this.$refs.box) {
  //         console.debug("$refs.box not ready");
  //         return false;
  //       }
  //       const box = this.$refs.box.find((b) => b.$vnode.key === addr);

  //       console.debug(
  //         `box(${box.$vnode.key}): ${box.isWsConnected} ${box.isDeviceConnected}`
  //       );
  //       return box.isWsConnected && box.isDeviceConnected;
  //     });
  //   },

  //   onBoxStateChanged(gwAddress) {
  //     //console.debug('box state changed', gwAddress);
  //     this.updateOpEnabled();
  //     // 与网关建立连接后，发送初始设置
  //     this.dynamicRangeChanged();
  //   },

  //   /** 向已建立ws连接并已连接设备的网关发送 rpc 请求 */
  //   sendRpcMulti(method, params) {
  //     this.selectedGwAddr.forEach((addr) => {
  //       const box = this.$refs.box.find((b) => b.gwAddress === addr);
  //       if (!box || !box.isDeviceConnected || !box.sendRpc) return;

  //       console.debug(
  //         `sending to ${addr}: ${method} ${JSON.stringify(params)}`
  //       );
  //       box.sendRpc(method, params);
  //     });
  //   },

  //   saveOptions() {
  //     const params = { ...this.captureOptions };
  //     this.sendRpcMulti(methodName_SetParam, params);
  //   },

  //   /** 设置采集参数 */
  //   setCaptureParamsMulti() {
  //     const body = { ...this.captureSettings };
  //     this.sendRpcMulti(methodName_SetParam, body);
  //   },

  //   imageModeChanged() {
  //     this.imageSettings.imageMode = imageModes[this.imageSettings.modeIndex];
  //     console.debug("imageMode", this.imageSettings.imageMode);
  //     const body = { imageMode: this.imageSettings.imageMode };
  //     this.sendRpcMulti(methodName_SetParam, body);
  //   },
  //   dynamicRangeChanged() {
  //     console.debug("dynamicRange", this.imageSettings.dynamicRange);
  //     const body = { dynamicRange: this.imageSettings.dynamicRange };
  //     this.sendRpcMulti(methodName_SetParam, body);
  //   },
  //   fixedThresholdChanged() {
  //     console.debug("fixedThreshold", this.imageSettings.fixedThreshold);
  //     const body = { fixedThreshold: this.imageSettings.fixedThreshold };
  //     this.sendRpcMulti(methodName_SetParam, body);
  //   },
  //   thresholdMarginChanged() {
  //     console.debug("thresholdMargin", this.imageSettings.thresholdMargin);
  //     const body = { thresholdMargin: this.imageSettings.thresholdMargin };
  //     this.sendRpcMulti(methodName_SetParam, body);
  //   },

  //   toolbarBtn(name) {
  //     if (name === "record") {
  //       // 目前不能在后台完成上一命令前发出别的命令，待后台实现请求排队
  //       this.sendRpcMulti(name);
  //       this.running = "recording";
  //       // this.resetProgress();
  //       // imgLoader.clear();
  //     } else if (name === "stop") {
  //       this.sendRpcMulti(name);
  //       this.running = null;
  //     }
  //   },
  // },
  // mounted() {
  //  this.gwAddresses = JSON.parse( localStorage.getItem('addressList'))
  // },
};
</script>
<style>
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

.panel-opt__wrap {
  height: 100%;
  width: 100%;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
}
</style>