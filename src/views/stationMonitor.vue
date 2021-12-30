<template>
  <div class="mt-2">
    <div class="monitor-container">
      <!--     <div class="addrSelect">
       <v-card max-width="500">
          <v-list>
            <v-list-item-group
              active-class="border"
              color="indigo"
              @change="onSelectedChange"
            >
              <v-list-item
                v-for="addr in selectedGwAddrs"
                :key="addr"
              >
                <v-list-item-content>
                  <input
                    type="checkbox"
                    enabled
                    v-model="isWsConnected"
                    id="ws-state-checkbox"
                  />
                  <v-list-item-title>{{ addr }}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-card>
      </div> -->
      <div class="box-column ml-2 mr-2">
        <!-- <v-app-bar-nav-icon
          @click="drawerRight = !drawerRight"
        ></v-app-bar-nav-icon> -->
        <div class="setting-btn-row">
          <v-bottom-sheet max-width="300px" inset>
            <template v-slot:activator="{ on, attrs }">
              <v-btn class="acq-ctl-btn-label" color="red" dark elevation="3" v-bind="attrs" v-on="on">
                采集控制
              </v-btn>
            </template>
            <v-card tile>
              <v-card-title>
                <v-icon>mdi-play-network-outline</v-icon>设备控制
              </v-card-title>
              <v-card-actions class="justify-center ">
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
          </v-bottom-sheet>

          <v-dialog transition="dialog-bottom-transition" max-width="888">
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                class="setting-panel-btn-label pa-1"
                v-bind="attrs"
                v-on="on"
                ><v-icon small>mdi-cog-outline</v-icon>控制面板</v-btn
              >
            </template>
            <template v-slot:default="dialog">
              <v-card class="settings">
                <v-toolbar color="grey darken-2" dark>控制面板</v-toolbar>
                <div class="setting-container">
                  <v-card class="pa-3 ml-2 mt-2 panel acq-opt">
                    <v-card-title>
                      <v-icon>mdi-eye-settings-outline</v-icon>采集选项
                    </v-card-title>
                    <v-radio-group
                      v-model="captureOptions.cameraMode"
                      label="相机分辨率 & 帧率:"
                      dense
                      hide-details
                    >
                      <v-radio
                        v-for="m in picks.cameraMode"
                        :key="m.value"
                        :label="m.label"
                        :value="m.value"
                      ></v-radio>
                    </v-radio-group>
                    <v-radio-group
                      v-model="captureOptions.acousticFrameRate"
                      label="声学成像帧率:"
                      dense
                      hide-details
                    >
                      <v-radio
                        v-for="m in picks.acousticFrameRate"
                        :key="m.value"
                        :label="m.label"
                        :value="m.value"
                      ></v-radio>
                    </v-radio-group>
                    <v-card-actions>
                      <v-btn small @click="saveOptions">保存</v-btn>
                    </v-card-actions>
                  </v-card>

                  <!-- <v-card class="pa-3 mt-2 panel control">
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
                  </v-card> -->

                  <v-card class="pa-3 panel mt-2 img-param">
                    <v-card-title>
                      <v-icon>mdi-image-auto-adjust</v-icon>成像参数
                    </v-card-title>
                    <v-tabs
                      v-model="imageSettings.modeIndex"
                      @change="imageModeChanged"
                      hide-slider
                      fixed-tabs
                    >
                      <v-tab>自动模式</v-tab>
                      <v-tab>阈值模式</v-tab>
                      <v-tab>去噪模式</v-tab>
                    </v-tabs>

                    <p class="mt-2">
                      <label>动态范围:</label>&nbsp;<span>{{
                        dynamicRangeText
                      }}</span>
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
                        <label>最大值:</label>&nbsp;<span>{{
                          fixedThresholdText
                        }}</span>
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
                  <v-card class="pa-3 mr-2 mt-2 panel acq-param">
                    <v-card-title>
                      <v-icon>mdi-tune</v-icon>采集参数
                    </v-card-title>

                    <p style="width: 240px">
                      <label>频率范围:</label>&nbsp;<span>{{
                        freqRangeLabel
                      }}</span>
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
                </div>

                <v-card-actions class="settings-panel-footer justify-end">
                  <p class="setting-note">更改配置即时生效</p>
                  <v-btn
                    class="setting-panel-btn-text"
                    @click="dialog.value = false"
                    >关闭</v-btn
                  >
                </v-card-actions>
              </v-card>
            </template>
          </v-dialog>
        </div>
        <div class="box-container">
          <cam-box
            ref="box"
            v-for="addr in selectedGwAddrs"
            :key="addr"
            :gw-address="addr"
            @state-changed="onBoxStateChanged"
          />
        </div>
      </div>
    </div>

    <!-- <v-navigation-drawer v-model="drawerRight" app clipped right width="308">
      <aside class="panel panel-opt__wrap">
        <div class="setting-container">
          <v-card class="pa-3 panel panel-opt" width="292">
            <v-card-title>
              <v-icon>mdi-eye-settings-outline</v-icon>采集选项
            </v-card-title>
            <v-radio-group
              v-model="captureOptions.cameraMode"
              label="相机分辨率 & 帧率:"
              dense
              hide-details
            >
              <v-radio
                v-for="m in picks.cameraMode"
                :key="m.value"
                :label="m.label"
                :value="m.value"
              ></v-radio>
            </v-radio-group>
            <v-radio-group
              v-model="captureOptions.acousticFrameRate"
              label="声学成像帧率:"
              dense
              hide-details
            >
              <v-radio
                v-for="m in picks.acousticFrameRate"
                :key="m.value"
                :label="m.label"
                :value="m.value"
              ></v-radio>
            </v-radio-group>
            <v-card-actions>
              <v-btn small @click="saveOptions">保存</v-btn>
            </v-card-actions>
          </v-card>
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
                <label>最大值:</label>&nbsp;<span>{{
                  fixedThresholdText
                }}</span>
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
        </div>
      </aside>
    </v-navigation-drawer> -->
  </div>
</template>

<script>
import CamBox from "../components/cambox2.vue";
import * as appConfigModule from "../components/appConfig.js";
import addressList from "../components/address.vue";
import WsClient from "../components/WsClient.js";
import hlsPlayer from "../components/HlsPlayer";
// import { mdiCogOutline } from '@mdi';
var imageModes = ["auto", "fixed", "avg"];
const methodName_SetParam = "setParam";

// let selectedGwAddrs = localStorage.getItem('gwAddress')
export default {
  components: { "cam-box": CamBox, "ws-client": WsClient },
  // props: [ 'gwAddress', 'addressList'],
  data() {
    return {
      drawerRight: null,
      /** 控制左侧面板的显示 */
      //   drawerLeft: true,
      /** 控制右侧面板的显示 */
      drawerRight: false,

      isWsConnected: false,

      appInfo: appConfigModule.appInfo,
      uiOptions: appConfigModule.uiOptions,

      /** 网关提供 WebSocket 服务的端口 */
      gwPort: 6380,

      /* 网关 ws 的确定方式：从列表中选择，或采用当前页面所在主机地址 */
      gwPickMode: appConfigModule.gwPickMode,

      /** 可选择的网关地址列表 */
      gwAddresses: [...appConfigModule.gwAddresses],

      /** 当前选定要连接的网关地址 */
      selectedGwAddrs: [],
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
  methods: {
    onSelectedChange(index) {
      this.selectedGwAddr = this.selectedGwAddrs[index];
      console.log(index);
    },

    onWsStateChanged(isOpen) {
      this.isWsConnected = isOpen;

      if (isOpen) {
        // 连接已建立，停止定时检查重连
        this.stopConnectionChecking(true);

        this.lastConnected = Date.now();
        this.updateDurationInterval = window.setInterval(() => {
          this.durationSeconds = Math.floor(
            (Date.now() - this.lastConnected) / 1000
          );
        }, 1000);
        console.debug(`connected to ${this.wsUri} (${this.lastConnected})`);
      } else {
        // 连接已断开
        this.cameraStatus = "";
        console.debug(`disconnected ${this.wsUri}`);
        //
        this.isDeviceConnected = false;

        // 清理状态
        window.clearInterval(this.updateDurationInterval);
        this.lastConnected = null;
        this.durationSeconds = null;
        this.deviceInfo = null;

        if (this.checkedTimes < maxRetryTimes) {
          // 启动定时重连
          this.scheduleConnectionChecking();
        }
      }

      this.$emit("state-changed", this.gwAddress);
    },
    /** 更新是否允许对网关发送操作命令的状态 */
    updateOpEnabled() {
      if (!this.selectedGwAddrs || this.selectedGwAddrs.length === 0) {
        this.gwOpsEnabled = false;
        return;
      }

      console.debug(
        "checking state of boxes: ",
        JSON.stringify(this.selectedGwAddrs)
      );
      this.gwOpsEnabled = this.selectedGwAddrs.some((addr) => {
        if (!this.$refs.box) {
          console.debug("$refs.box not ready");
          return false;
        }
        const box = this.$refs.box.find((b) => b.$vnode.key === addr);

        console.debug(
          `box(${box.$vnode.key}): ${box.isWsConnected} ${box.isDeviceConnected}`
        );
        return box.isWsConnected && box.isDeviceConnected;
      });
    },

    onBoxStateChanged(gwAddress) {
      //console.debug('box state changed', gwAddress);
      this.updateOpEnabled();
      // 与网关建立连接后，发送初始设置
      this.dynamicRangeChanged();
    },

    /** 向已建立ws连接并已连接设备的网关发送 rpc 请求 */
    sendRpcMulti(method, params) {
      this.selectedGwAddrs.forEach((addr) => {
        const box = this.$refs.box.find((b) => b.gwAddress === addr);
        if (!box || !box.isDeviceConnected || !box.sendRpc) return;

        console.debug(
          `sending to ${addr}: ${method} ${JSON.stringify(params)}`
        );
        box.sendRpc(method, params);
      });
    },

    saveOptions() {
      const params = { ...this.captureOptions };
      this.sendRpcMulti(methodName_SetParam, params);
    },

    /** 设置采集参数 */
    setCaptureParamsMulti() {
      const body = { ...this.captureSettings };
      this.sendRpcMulti(methodName_SetParam, body);
    },

    imageModeChanged() {
      this.imageSettings.imageMode = imageModes[this.imageSettings.modeIndex];
      console.debug("imageMode", this.imageSettings.imageMode);
      const body = { imageMode: this.imageSettings.imageMode };
      this.sendRpcMulti(methodName_SetParam, body);
    },
    dynamicRangeChanged() {
      console.debug("dynamicRange", this.imageSettings.dynamicRange);
      const body = { dynamicRange: this.imageSettings.dynamicRange };
      this.sendRpcMulti(methodName_SetParam, body);
    },
    fixedThresholdChanged() {
      console.debug("fixedThreshold", this.imageSettings.fixedThreshold);
      const body = { fixedThreshold: this.imageSettings.fixedThreshold };
      this.sendRpcMulti(methodName_SetParam, body);
    },
    thresholdMarginChanged() {
      console.debug("thresholdMargin", this.imageSettings.thresholdMargin);
      const body = { thresholdMargin: this.imageSettings.thresholdMargin };
      this.sendRpcMulti(methodName_SetParam, body);
    },

    toolbarBtn(name) {
      if (name === "record") {
        // 目前不能在后台完成上一命令前发出别的命令，待后台实现请求排队
        this.sendRpcMulti(name);
        this.running = "recording";
        // this.resetProgress();
        // imgLoader.clear();
      } else if (name === "stop") {
        this.sendRpcMulti(name);
        this.running = null;
      }
    },
  },
  mounted() {
    this.selectedGwAddrs = JSON.parse(localStorage.getItem("addressList"));

    // if (this.gwAddress) {
    //   this.checkWsConnection(true);
    // }
  },

  //     beforeDestroy() {
  //   this.stopConnectionChecking(true);
  //   console.debug(`beforeDestroy, closing ws ${this.gwAddress}`);
  //   this.isDeviceConnected = false;
  //   if (this.isWsConnected) {
  //     this.$refs.wsClient.disconnect();
  //     this.isWsConnected = false;
  //   }
  // },
  // destroyed() {
  //   this.$emit("state-changed", this.gwAddress);
  // }
};
</script>

<style>
.monitor-container {
  display: flex;
  flex-direction: column;
}
.v-bottom-sheet .bottom-ctl {
  border: 5px;
  border-top-color: #f55246;
}
.box-column .setting-btn-row {
  display: flex;
  flex-direction: row;
  align-self: flex-end;
  gap: 8px;
}
.acq-ctl-btn-label {
  font-weight: 700;
}
.setting-panel-btn-label {
  font-weight: 700;
}
.box-container {
  display: flex;
  flex-flow: row wrap;
  gap: 5px 10px; /* row-gap column gap */
  align-items: flex-start;
  justify-content: space-around;
}
.box-column {
  display: flex;
  flex-flow: column;
  align-items: center;
}
.setting-container {
  display: grid;
  grid-template-columns: auto auto auto;
  grid-template-rows: 300px;
  grid-auto-flow: column;
  gap: 5px 8px;
}
.acq-opt {
  grid-row: 1 / 2;
  grid-column: 1;
  place-self: stretch stretch;
}
.control {
  grid-row: 1 / 2;
  grid-column: 2;
  place-self: stretch stretch;
}

.img-param {
  grid-row: 1 / 2;
  grid-column: 2;
  place-self: stretch stretch;
}
.acq-param {
  grid-row: 1 / 2;
  grid-column: 3;
  place-self: stretch stretch;
  margin: 0px;
}
.settings-panel-footer {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  /* align-items: center; */
  gap: 15px;
}
.settings-panel-footer .setting-note {
  margin-bottom: 0px;
  font-size: 14px;
  font-weight: 700;
  color: #8e8e8f;
}
.settings-panel-footer .setting-panel-btn-text {
  font-weight: 700;
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
  /* min-width: 80px; */
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

/* .cambox .info-cell {
  display: inline-block;
  color: rgba(0, 0, 0, 0.38);
  margin-right: 12px;
} */

/* .cambox .info-row.top .info-cell {
  margin-top: 8px;
}

.cambox .info-row.bottom .info-cell {
  margin-bottom: 8px;
} */
</style>