<template>
  <div>
<!--     <div class="setting-container">
      <v-app-bar-nav-icon @click.stop="drawerRight = !drawerRight">
        <template>
          <v-icon :style="appBarTextStyle">mdi-cog</v-icon>
        </template>
      </v-app-bar-nav-icon>
    </div> -->
    <div class="box-container">
      <cam-box
        ref="box"
        
        v-for="(addr) in selectedGwAddrs"
        :key="addr"
        :gw-address="addr"
      />
      <!-- @state-changed="onBoxStateChanged" -->
    </div>
<!--     <v-navigation-drawer v-model="drawerRight" app clipped right width="308">
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
    </v-navigation-drawer> -->
  </div>
</template>

<script>
import CamBox from "../components/cambox2.vue";
import * as appConfigModule from "../components/appConfig.js";
import addressList from "../components/address.vue";

// let selectedGwAddrs = localStorage.getItem('gwAddress')
export default {
  components: { "cam-box": CamBox },
  // props: [ 'gwAddress', 'addressList'],
  data() {
    return {
      /** 控制左侧面板的显示 */
      //   drawerLeft: true,
      /** 控制右侧面板的显示 */
      drawerRight: true,

      appInfo: appConfigModule.appInfo,
      uiOptions: appConfigModule.uiOptions,

      /** 网关提供 WebSocket 服务的端口 */
      gwPort: 6380,

      /* 网关 ws 的确定方式：从列表中选择，或采用当前页面所在主机地址 */
      gwPickMode: appConfigModule.gwPickMode,

      /** 可选择的网关地址列表 */
      gwAddresses: [...appConfigModule.gwAddresses],

      /** 当前选定要连接的网关地址 */
      selectedGwAddrs: [ ],
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
  computed: {
    /** 背景为暗色时文字改为亮灰色 */
    appBarTextStyle() {
      if (this.uiOptions.appBarTheme === "dark") {
        return { color: "#d0d0d0" };
      }
    },
    freqRangeLabel() {
      return (
        this.captureSettings.freqRange[0].toString() +
        "Hz ~ " +
        this.captureSettings.freqRange[1].toString() +
        "Hz"
      );
    },
    distanceLabel() {
      return (this.captureSettings.distance / 10).toFixed(0) + "cm";
    },

    dynamicRangeText() {
      return this.imageSettings.dynamicRange.toFixed(1) + "dB";
    },
    fixedThresholdText() {
      return this.imageSettings.fixedThreshold.toFixed(1) + "dB";
    },
    thresholdMarginText() {
      return this.imageSettings.thresholdMargin.toFixed(1) + "dB";
    },
    imageModeValue() {
      return imageModes[this.imageSettings.modeIndex];
    },
  },
  mounted(){
   this.selectedGwAddrs = JSON.parse( localStorage.getItem('addressList'))
  },
};
</script>

<style>
.box-container {
  display: flex;
  flex-flow: row wrap;
  /* justify-content: space-evenly; */
  justify-content: space-around;
}
.setting-container {
  display: flex;
  justify-content: flex-end;
}

/* 设备列表项前的复选框减小间距 */
.panel .v-card .v-list-item__action:first-child {
  margin-right: 0;
}

/* 设备列表限定高度，超长加滚动条 */
.panel .v-card .scroll-wrap {
  overflow: auto;
}

/* 控制“成像参数”tab宽度 */
.panel .v-card .v-tab {
  padding: 0;
  min-width: 80px;
}

.cambox {
  margin: 8px 0;
  border: 1px solid lightgray;
  position: relative;
  border-radius: 6px;
  display: flex;
  flex-flow: column nowrap;
}

.cambox .cam-canvas,
.cambox .cam-video {
  margin: 0 -1px;
}

.cambox .info-row {
  display: flex;
  flex-flow: row nowrap;
  align-items: flex-start;
  font-size: 12px;
  padding: 0 12px;
}

.cambox .info-row .v-input,
.cambox .info-row .v-label {
  margin: 0 4px 0 0;
  font-size: 12px;
}

.cambox .info-cell {
  display: inline-block;
  color: rgba(0, 0, 0, 0.38);
  margin-right: 12px;
}

.cambox .info-row.top .info-cell {
  margin-top: 8px;
}

.cambox .info-row.bottom .info-cell {
  margin-bottom: 8px;
}
</style>