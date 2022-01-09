<template>
  <div class="cambox v-card v-sheet">
    <img
      ref="sampleImg"
      style="display: none"
      src="data:image/png;base64,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"
    />
    <ws-client
      ref="wsClient"
      :uri="wsUri"
      @state-changed="onWsStateChanged"
      @data-received="onWsDataReceived"
      @message-received="onWsMessageReceived"
    ></ws-client>

    <div class="info-row top ">
      <input
        type="checkbox"
        disabled
        v-model="isWsConnected"
        id="ws-state-checkbox"
        class=" mr-2"
      />
      <label class="info-cell" for="ws-state-checkbox"
        >{{ `网关地址: ${gwAddress}` }}&nbsp;</label
      >
      <span class="info-cell">{{ wsConnectedText }}</span
      ><span class="info-cell" v-if="durationSeconds"
        >:&nbsp;{{ durationSeconds }}秒</span
      >
      <v-spacer></v-spacer>
      <label class="info-cell leq-label"
        >{{ `Leq: ${leqValue}` }}&nbsp;dBA&nbsp;</label
      >
      <label class="info-cell battery-level">
        &nbsp;{{ `电量: ${batteryLevel}%` }}
      </label>
    </div>
    <!-- charts -->
    <div id="chart1">
      <!-- <div class="chart" ref="chart1Ref"></div> -->
      <v-chart class="chart" :option="optionLeq"></v-chart>
    </div>

    <!-- <v-list class="videoStream">
      <v-list-item>
        <v-list-group :value="true" no-action sub-group>
          <template color="grey darken-2" v-slot:activator>
            <v-list-item-content>
              <v-list-item-title class="videoSwitch"
                >展开或收起视频</v-list-item-title
              >
            </v-list-item-content>
          </template>
          <v-list-item-content> -->

    <canvas
      ref="camCanvas"
      :width="pictureSize.width"
      :height="pictureSize.height"
      class="cam-canvas"
      :style="canvasStyle"
    />
    <video
      ref="camVideo"
      :width="pictureSize.width"
      :height="pictureSize.height"
      class="cam-video"
      :style="videoStyle"
    />

    <!-- </v-list-item-content>
        </v-list-group>
      </v-list-item>
    </v-list> -->

    <div class="info-row bottom">
      <span class="info-cell mr-3">{{ deviceInfoText }}</span>
      <span class="info-cell" v-if="cameraStatus === 'recording'">
        <v-chip label x-small>
          <v-icon left color="red">mdi-record-rec</v-icon>采集中...
        </v-chip>
      </span>
      <span class="info-cell" v-if="cameraStatus === 'standby'">
        <v-chip label x-small>待命</v-chip>
      </span>
    </div>
  </div>
</template>
<script>
import ImgLoader from "../components/imgLoader";
import wsClient from "../components/WsClient.js";
import HlsPlayer from "../components/HlsPlayer.js";
// import {ref} from "vue";

import * as echarts from "echarts";
import VChart from "vue-echarts";
import moment from "moment";

const wsPort = 6380;
const wsInitConnDelay = 30; // 首次连接的延迟
const wsReconnectCycle = 5; // 断开后重连的重试间隔
const maxRetryTimes = 5; // 重试连接次数上限

let hlsPlayer;
let imageLoader;

// var xAxisData = [ 0, -1, -2, -3, -4, -5, -6, -7, -8, -9, -10, -11, -12, -13, -14, -15, -16, -17, -18, -19, -20 ];
// var xAxisData = [];
// var data = [Math.random() * 150];
// var data = [];
// const d = [];
// let demo = [];
// const labels = [];
// const values = [];
// function roundValue(value) {
  // return Math.round(value * 1000000) / 1000000;
// }

// buildLeqData();
// function addData(shift) {

//   data.unshift((Math.random() ) * 100 );
//   if (data.length > xAxisData.length) {
//     data.pop();
//   }
//   // now = new Date(+new Date(now) + oneDay);
// }
// for (var i = 1; i < 1000; i++) {
  // addData();
  // this.refreshCharts();
// }
// console.log(optionLeq);

export default {
  components: {
    "ws-client": wsClient,
    "v-chart": VChart,
  },
  // props: ["gwAddress"],
  data() {
    return {
      gwAddress: "10.0.0.86",
      updateDurationInterval: null,
      checkConnectionHandle: null,
      checkedTimes: 0,

      isWsConnected: false,
      lastConnected: null,
      durationSeconds: null,

      viewMode: "snapshot",
      pictureSize: {
        width: 640,
        height: 480,
      },

      sessionProgress: {
        beginTimestamp: 0,
        endTimestamp: 100,
        position: 0,
      },

      deviceInfo: {
        deviceID: null,
      },

      deviceStatus: {
        isReady: false,
        isMeasuring: false,
      },
      batteryLevel: 0,
      leqValue: 0,
      //chart

      optionLeq: {
        grid: {
          left: "2%",
          right: "8%",
          bottom: "30%",
          top: "10%",
        },
        animation: false,
        xAxis: {
          name: "时间(s)",
          nameGap: 20,
          nameLocation: "middle",
          nameTextStyle: {
            fontSize: 10,
          },
          // type: "time",
          type: "category",
          // type: "value",
          boundaryGap: false,
          // min: -20,
          // max: 0,
          // interval: 1,
          inverse: true,
          // data: [
          //   "0","-1","-2","-3","-4","-5","-6","-7","-8","-9","-10","-11","-12","-13","-14","-15","-16","-17","-18","-19","-20",
          // ],
          data: [
            "0",
            "-0.5",
            "-1",
            "-1.5",
            "-2",
            "-2.5",
            "-3",
            "-3.5",
            "-4",
            "-4.5",
            "-5",
            "-5.5",
            "-6",
            "-6.5",
            "-7",
            "-7.5",
            "-8",
            "-8.5",
            "-9",
            "-9.5",
            "-10",
            "-10.5",
            "-11",
            "-11.5",
            "-12",
            "-12.5",
            "-13",
            "-13.5",
            "-14",
            "-14.5",
            "-15",
            "-15.5",
            "-16",
            "-16.5",
            "-17",
            "-17.5",
            "-18",
            "-18.5",
            "-19",
            "-19.5",
            "-20",
          ],
          // data: [0, -0.5, -1, -1.5, -2, -2.5, -3, -3.5, -4, -4.5, -5, -5.5, -6, -6.5, -7, -7.5, -8, -8.5, -9, -9.5, -10, -10.5, -11, -11.5, -12, -12.5, -13, -13.5, -14, -14.5, -15, -15.5, -16, -16.5, -17, -17.5, -18, -18.5, -19, -19.5, -20],
          axisLabel: {
            interval: 1,
            // min: -20,
            // max: 0,
          },
          //       minorTick: {
          //   show: true
          // },
          // minorSplitLine: {
          //   show: true
          // },
          // axisLabel: {
          //   formatter: "{s}:{SSS}",
          //   // show: true,
          //   show: false,
          //   interval: 500,
          // },
          splitLine: {
            show: true,
            // interval: 1000,
          },
          splitNumber: 20,
        },
        yAxis: {
          name: "Leq(dBA)",
          nameGap: 27,
          nameRotate: -90,
          nameTextStyle: {
            fontSize: 10,
          },
          nameLocation: "middle",
          // position: "left",
          position: "right",
          boundaryGap: [0, "50%"],
          type: "value",
          // data: [],
          min: function (value) {
            return (value.min - 5).toFixed(0);
          },
          max: function (value) {
            return (value.max + 5).toFixed(0);
          },
          axisTick: {
            show: true,
          },

          minorSplitLine: {
            show: true,
          },
          // interval: 20,
          axisLabel: {
            show: true,
            fontSize: 11,
          },
          axisLine: {
            // show: false,
            interval: 20,
          },
        },
        series: [
          {
            type: "line",
            smooth: true,
            symbol: "none",
            // stack: 'a',
            // areaStyle: {
            //   normal: {}
            // },
            data: [],
          },
        ],
      },
    };
  },

  mounted() {
    // this.optionLeq;
    //异步初始化echarts
    // function initEcharts() {
    //   let newPromise = new Promise((resolve) => {
    //     resolve();
    //   });
    //   newPromise.then(() => {
    //     echarts.init(chartDom);
    //   });
    // }
    // setInterval(() => {
    // addData(true);
    // this.refreshCharts();
    // this.buildLeqData();
    // }, 500);
    if (this.optionLeq.series[0].data.length !== 0) {
      this.optionLeq.series[0].data = [];
    }
    // 启动连接维持定时器
    if (this.gwAddress) {
      this.checkWsConnection(true);
    }

    hlsPlayer = new HlsPlayer(this.$refs.camVideo);
    imageLoader = new ImgLoader(this.$refs.camCanvas);

    // show placeholder image
    imageLoader.loadAndDrawImage(this.$refs.sampleImg.src);
  },

  beforeDestroy() {
    this.stopConnectionChecking(true);
    console.debug(`beforeDestroy, closing ws ${this.gwAddress}`);
    if (this.isWsConnected) {
      this.$refs.wsClient.disconnect();
      this.isWsConnected = false;
    }
  },
  destroyed() {
    this.$emit("state-changed", this.gwAddress);
  },

  computed: {
    wsUri() {
      return `ws://${this.gwAddress}:${wsPort}/`;
    },

    canvasStyle() {
      return { display: this.viewMode === "snapshot" ? "block" : "none" };
    },
    videoStyle() {
      return { display: this.viewMode === "video" ? "block" : "none" };
    },

    wsConnectedText() {
      return this.isWsConnected ? "已连接" : "未连接";
    },
    isDeviceConnected() {
      return this.deviceStatus.isReady && this.deviceInfo.deviceID;
    },
    deviceInfoText() {
      if (!this.deviceStatus.isReady) {
        console.debug("deviceInfoText - not ready");
        return "未连接设备";
      } else if (this.deviceInfo) {
        console.debug("deviceInfoText - ", JSON.stringify(this.deviceInfo));
        return (
          "设备SN: " +
          this.deviceInfo.deviceSN +
          ", 固件版本: " +
          this.deviceInfo.fwVersion
        );
      }
    },
    cameraStatus() {
      if (!this.deviceStatus.isReady) {
        return null;
      } else if (!this.deviceStatus.isMeasuring) {
        return "standby";
      } else {
        return "recording";
      }
    },
    hasSessionData() {
      return (
        this.sessionProgress.endTimestamp -
          this.sessionProgress.beginTimestamp >
        100
      );
    },
  },
  methods: {
    // refreshCharts(labels, values) {
    //   [labels, values] = buildLeqData();
    //   // console.debug(labels, values);
    //   this.optionLeq.xAxis.data = labels;
    //   this.optionLeq.series.data = values;
    // },
    // buildLeqData(timestamp, data) {
    //   let base = Date.parse(timestamp);
    //   let d = [];
    //   const dt = data.dt;
    //   // const data = dataFrame.data;
    //   console.log(moment(base).format("hh:mm:ss.SSS"));

    //   // for (let i = 0; i < 20; i++) {
    //     // this.optionLeq.series[0].data.unshift({
    //     this.optionLeq.yAxis.data.unshift(
    //       // timestamp: moment(base + i * dt).format("hh:mm:ss.SSS"),
    //       // timestamp: base + i * dt,
    //       // value: data.values[i],
    //       data.values[0].toFixed(1)
    //     );
    //     // if (this.optionLeq.series[0].data.length > 1200) {
    //     // this.optionLeq.series[0].data.pop();
    //   // }
    //   if (this.optionLeq.yAxis.data.length > 20) {
    //     this.optionLeq.yAxis.data.pop();
    //   }
    //   // }
    //   this.leqValue = data.values[0].toFixed(2);
    //   // console.log(JSON.stringify(this.optionLeq.series[0].data));
    //   console.log(JSON.stringify(this.optionLeq.yAxis.data));
    //   // console.log("length of data: " + this.optionLeq.series[0].data.length);
    //   console.log("length of data: " + this.optionLeq.yAxis.data.length);
    // },
    buildLeqData(timestamp, data) {
      // console.log(moment(base).format("hh:mm:ss.SSS"));
      // this.leqValue = data.values[0].toFixed(2);
      this.leqValue = Math.max(...data.values).toFixed(2);

      this.optionLeq.series[0].data.unshift(
        Math.max(...data.values).toFixed(1)
      );
      if (this.optionLeq.series[0].data.length > 41) {
        this.optionLeq.series[0].data.pop();
      }
      console.log(JSON.stringify(this.optionLeq.series[0].data));
      console.log("length of data: " + this.optionLeq.series[0].data.length);
    },
    /** 计划一次连接检查 */
    scheduleConnectionChecking(delay) {
      this.checkedTimes++;
      this.checkConnectionHandle = window.setTimeout(
        this.checkWsConnection,
        delay
      );
    },
    /**
     * 停止进行自动连接检查
     * @param {bool} isReset true：连接失败次数清零，允许重新尝试；false：保留已失败次数，不再继续尝试
     */
    stopConnectionChecking(isReset) {
      if (this.checkConnectionHandle)
        window.clearTimeout(this.checkConnectionHandle);
      this.checkConnectionHandle = null;
      if (isReset) this.checkedTimes = 0;
    },
    /**
     * 被周期性执行的连接检查操作
     * @param {bool} isInit 是否初次尝试建立连接，是则延迟较长的时间再执行检查
     * 组件实例初始化期间以 isInit = true 调用一次；此时较大可能是尚未建立物理连接，因此在较长的延迟后再开始重试；
     * 如果是连接后在运行期间中断(由 onWsStateChanged 触发)，则在较短的的延迟后开始重试
     */
    checkWsConnection(isInit) {
      if (this.isWsConnected) {
        // 当前已连接，停止周期性检查
        this.stopConnectionChecking(true);
        return;
      }

      // 尚未建立连接，则尝试连接
      //console.debug(`connect attempt #${this.checkedTimes}`);
      if (this.checkedTimes > maxRetryTimes) {
        console.debug("connect failed too many times, giving up.");
        this.stopConnectionChecking(false);
        return;
      }

      if (!this.$refs.wsClient) return;
      this.$refs.wsClient.connect();

      // 启动定时器，延迟一段时间重复检查连接是否建立成功
      const delay =
        (isInit ? wsInitConnDelay : wsReconnectCycle) * 1000 +
        Math.round(1000 * Math.random());
      //console.debug(`scheduling check after ${delay} ms...`);
      this.scheduleConnectionChecking(delay);
    },

    /** 响应 wsClient 状态变化 */
    onWsStateChanged(isOpen) {
      this.isWsConnected = isOpen;

      if (isOpen) {
        this.deviceStatus.isReady = true;
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
        console.debug(`disconnected ${this.wsUri}`);
        this.deviceInfo = { deviceID: null };
        this.deviceStatus.isReady = false;

        // 清理状态
        window.clearInterval(this.updateDurationInterval);
        this.lastConnected = null;
        this.durationSeconds = null;

        if (this.checkedTimes < maxRetryTimes) {
          // 启动定时重连
          this.scheduleConnectionChecking();
        }
      }

      this.$emit("state-changed", this.gwAddress);
    },

    /** 向所连接的网关发送 RPC 消息 */
    sendRpc(method, params) {
      // || !this.isDeviceConnected
      if (!this.isWsConnected) return;

      this.$refs.wsClient.sendMessage(method, params);
    },

    drawPngBuffer(buffer) {
      imageLoader.receiveArrayBuffer(buffer);
    },

    /** 收到字节流消息 */
    onWsDataReceived(blob) {
      // 前8字节: uint64 时间戳
      const tsBlob = blob.slice(0, 8);
      // 其余内容: PNG 文件字节序列
      const pngBlob = blob.slice(8, blob.size);
      pngBlob.arrayBuffer().then((buffer) => this.drawPngBuffer(buffer));
    },

    /** 收到 JSON 消息 */
    onWsMessageReceived(data) {
      if (data.msgType === "deviceID") {
        this.handleDeviceInfo(data.body);
      } else if (data.msgType === "sessionInfo") {
        this.handleSessionUpdate(data.body);
      }

      // json-rpc
      else if (data.method === "dataFrame") {
        // const dataFrame = data.params;
        this.handleDataFrame(data.params);
      } else if (data.method === "deviceID") {
        this.handleDeviceInfo(data.params);
      } else if (data.method === "deviceStatus") {
        this.handleDeviceStatus(data.params);
        // console.log(data);
      } else if (data.method === "sessionInfo") {
        this.handleSessionUpdate(data.params);
      }
    },

    /** 网关与设备的连接状态发生变化时，发来 deviceID 类型的消息 */
    handleDeviceInfo(deviceInfo) {
      const prevReady = this.isDeviceConnected;

      Object.assign(this.deviceInfo, deviceInfo);
      console.debug(
        "device info updated",
        this.gwAddress,
        JSON.stringify(this.deviceInfo)
      );

      // 设备连接状态发生变化
      if (prevReady !== this.isDeviceConnected) {
        console.debug(
          "box state-changed",
          this.gwAddress,
          "isDeviceConnected: ",
          this.isDeviceConnected
        );
        this.$emit("state-changed", this.gwAddress);
      }
    },

    handleDeviceStatus(deviceStatus) {
      const prevReady = this.isDeviceConnected;

      Object.assign(this.deviceStatus, deviceStatus);
      console.debug(
        "device status update",
        this.gwAddress,
        JSON.stringify(this.deviceStatus)
      );

      if (!deviceStatus.isReady) {
        Vue.set(this, "deviceInfo", { deviceID: null });
      }

      // 设备连接状态发生变化
      if (prevReady !== this.isDeviceConnected) {
        console.debug(
          "box state-changed",
          this.gwAddress,
          "isDeviceConnected: ",
          this.isDeviceConnected
        );
        this.$emit("state-changed", this.gwAddress);
      }
    },
    handleDataFrame(dataFrame) {
      if (dataFrame.frameType === "Leq_A") {
        // const dataFrame = dataFrame.params;
        // console.log(dataFrame);
        this.buildLeqData(dataFrame.timestamp, dataFrame.data);
      }
    },
    /** 采集起始和结束时收到的消息 */
    handleSessionUpdate(sessionInfo) {
      console.debug("sessionInfo:", JSON.stringify(sessionInfo, null, 1));

      if (sessionInfo.isRunning) {
        console.debug("session begin, ts:", sessionInfo.timestamp);
        this.sessionProgress.beginTimestamp = sessionInfo.timestamp;
        this.sessionProgress.endTimestamp = sessionInfo.timestamp;
        this.sessionProgress.position = this.sessionProgress.beginTimestamp;

        if (sessionInfo.filename && sessionInfo.filename.endsWith("m3u8")) {
          const url = `http://${this.gwAddress}${sessionInfo.filename}`;
          console.debug("hls url:", url);
          const playDelay = sessionInfo.isInitial ? 3000 : 20;
          setTimeout(() => {
            console.debug("hlsPlayer.play", url, playDelay);
            hlsPlayer.play(url);
          }, playDelay);
        }
        if (sessionInfo.streamUrl && sessionInfo.streamUrl.endsWith("m3u8")) {
          // //{host}/hls/soundcam.m3u8
          let streamUrl = sessionInfo.streamUrl;
          if (streamUrl.includes("{host}")) {
            streamUrl = streamUrl.replace("{host}", this.gwAddress);
          }
          if (streamUrl.startsWith("//")) {
            streamUrl = "http:" + streamUrl;
          }
          console.debug("hls url:", streamUrl);
          //streamUrl = `http://${this.gwAddress}/hls/soundvis.m3u8`;
          const playDelay = sessionInfo.isInitial ? 4000 : 20;
          setTimeout(() => {
            console.debug("hlsPlayer.play", streamUrl, playDelay);
            hlsPlayer.play(streamUrl);
          }, playDelay);
        }
      } else {
        console.debug("session end, ts:", sessionInfo.timestamp);
        this.sessionProgress.endTimestamp = sessionInfo.timestamp;
        this.optionLeq.series[0].data = [];
        this.leqValue = 0;
        console.debug(
          "range: [" +
            this.sessionProgress.beginTimestamp +
            "," +
            this.sessionProgress.endTimestamp +
            "]"
        );
        console.debug("position: " + this.sessionProgress.position);

        hlsPlayer.stop();
      }

      // 切换显示视频控件
      this.viewMode = this.hasSessionData ? "snapshot" : "video";
    },
  }, // /methods
};
</script>
<style>
.cambox {
  width: 700px;
  position: relative;
  display: flex;
  flex-flow: column nowrap;
  /* flex-grow: 2; */
}

.cambox .cam-canvas,
.cambox .cam-video {
  margin: 0 -1px;
}
.videoStream .videoSwitch {
  font-size: 13px;
  font-weight: 700;
  color: rgba(0, 0, 0, 0.562);
}
.cambox .info-row {
  display: flex;
  flex-flow: row nowrap;
  align-items: flex-end;
  font-size: 12px;
  font-weight: 700;
  padding: 0 12px;
}
.cambox .info-row .v-input,
.cambox .info-row .v-label {
  margin: 0 4px 0 0;
  font-size: 12px;
}

.cambox .info-cell {
  display: inline-block;
  font-weight: 700;
  color: rgba(0, 0, 0, 0.7);
}
.cambox .info-row.top .info-cell {
  /* margin-top: 6px; */
}
.cambox .info-row.top {
  background-color: #bdbdbd;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
}
.cambox .info-row.top .battery-life {
  align-self: flex-end;
}
.cambox .info-row.bottom .info-cell {
  margin-bottom: 8px;
}
.chart {
  height: 100px;
}
</style>