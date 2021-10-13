<template>
  <div class="box-container">
    <cam-box
      ref="box"
      v-for="(addr, index) in selectedGwAddr"
      :key="addr"
      :gw-address="addr"
      
    />
    <!-- @state-changed="onBoxStateChanged" -->
  </div>
</template>

<script>
import CamBox from "../components/cambox2.vue"
import * as appConfigModule from "../components/appConfig.js"

export default {
  components: { 'cam-box': CamBox },
  data() {
    return {
      /** 控制左侧面板的显示 */
      drawerLeft: true,
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
      selectedGwAddr: ["11111111", "11222222"],
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
};
</script>

<style>

</style>