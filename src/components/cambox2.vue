<template>
  <div class="cambox">
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

    <div class="info-row top">
      <input
        type="checkbox"
        enabled
        v-model="isWsConnected"
        id="ws-state-checkbox"
      />
      <label class="info-cell" for="ws-state-checkbox"
        >{{ `网关地址: ${gwAddress}` }}&nbsp;</label
      >
      <span class="info-cell">{{ wsConnectedText }}</span
      ><span class="info-cell" v-if="durationSeconds"
        >:&nbsp;{{ durationSeconds }}秒</span
      >
    </div>
    <!-- charts -->
    <div id="chart1">
      <!-- <div class="chart" ref="chart1Ref"></div> -->
      <v-chart class="chart" :option="optionLeq"></v-chart>
    </div>

    <v-list class="videoStream">
      <v-list-item>
        <v-list-group :value="true" no-action sub-group>
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title class="videoSwitch"
                >展开或收起视频</v-list-item-title
              >
            </v-list-item-content>
          </template>
          <v-list-item-content>
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
          </v-list-item-content>
        </v-list-group>
      </v-list-item>
    </v-list>

    <div class="info-row bottom">
      <span class="info-cell">{{ deviceInfoText }}</span>
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

const wsPort = 6380;
const wsInitConnDelay = 30; // 首次连接的延迟
const wsReconnectCycle = 5; // 断开后重连的重试间隔
const maxRetryTimes = 5; // 重试连接次数上限

let hlsPlayer;
let imageLoader;

// var chartDom = document.getElementById('chart');
// var chart = echarts.init(chartDom);

var xAxisData = [ 0, -1, -2, -3, -4, -5, -6, -7, -8, -9, -10, -11, -12, -13, -14, -15, -16, -17, -18, -19, -20 ];
var data = [Math.random() * 150];

// + data[data.length - 1]

function addData(shift) {
  // now = [now.getFullYear(), now.getMonth() + 1, now.getDate()].join("/");
  // xAxisData.push(now);
  data.unshift((Math.random() ) * 100 );
  if (data.length > xAxisData.length) {
    // xAxisData.shift();
    data.pop();
  }
  // now = new Date(+new Date(now) + oneDay);
}
for (var i = 1; i < 100; i++) {
  addData();
}
// console.log(optionLeq);

export default {
  components: {
    "ws-client": wsClient,
    "v-chart": VChart,
  },
  props: ["gwAddress"],
  data() {
    return {
      // gwAddress: "192.168.1.151",
      updateDurationInterval: null,
      checkConnectionHandle: null,
      checkedTimes: 0,

      isWsConnected: false,
      lastConnected: null,
      durationSeconds: null,
      deviceInfo: {},
      isDeviceConnected: false,

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
      cameraStatus: "",

      //chart
      optionLeq: {
        grid: {
          left: "5%",
          right: "5%",
          bottom: "20%",
          top: "10%",
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          inverse: true,
          data: xAxisData,
          interval: 1,
          axisLabel: {
            show: true,
          
          },
          axisLabel: {
            // formatter: "{HH}:{mm}:{ss}:{SSS}",
            show: true,
          },
          splitLine: {
            show: true,
          },
        },
        yAxis: {
          position: "left",
          boundaryGap: [0, "50%"],
          type: "value",
          max: 300,
          axisLabel: {
            show: true,
          },
          axisLine: {
            show: false,
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
            data: data,
          },
        ],
      },
    };
  },

  mounted() {
    // this.draw();
    this.optionLeq;
    //异步初始化echarts
     function initEcharts() {
       let newPromise = new Promise((resolve) =>{
         resolve()
        })
        newPromise.then(() => {
          echarts.init(chartDom);
        }
        )};

    // 启动连接维持定时器
    if (this.gwAddress) {
      this.checkWsConnection(true);
    }

    hlsPlayer = new HlsPlayer(this.$refs.camVideo);
    imageLoader = new ImgLoader(this.$refs.camCanvas);

    // show placeholder image
    imageLoader.loadAndDrawImage(this.$refs.sampleImg.src);

    // const el1 = this.$refs.chart1Ref;
    // echarts.dispose(el1);
    // this.chart1 = echarts.init(el1);
    // this.chart.setOption(optionLeq);
  },
  beforeDestroy() {
    this.stopConnectionChecking(true);
    console.debug(`beforeDestroy, closing ws ${this.gwAddress}`);
    this.isDeviceConnected = false;
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

    deviceInfoText() {
      if (!this.isDeviceConnected) {
        return "未连接采集设备";
      } else {
        return (
          "设备SN: " +
          this.deviceInfo.deviceSN +
          ", 固件版本: " +
          this.deviceInfo.fwVersion
        );
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
    // draw() {
      // this.chartObj = echarts.init(document.getElementById("chart"));
      // this.chartObj.setOption(optionLeq);
    // },
    setDym: setInterval(() => {
      addData(true);
    }, 500),
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

    /** 向所连接的网关发送 RPC 消息 */
    sendRpc(method, params) {
      if (!this.isWsConnected || !this.isDeviceConnected) return;

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
      } else if (data.msgType === "dataFrame") {
        const dataFrame = data.body;
        if (dataFrame.frameType === "indicator-Leq") {
          let d = new Date(dataFrame.timestamp * 1000);
          //console.debug('Leq ts', d);
        }
      }
      // json-rpc
      else if (data.method === "deviceID") {
        this.deviceInfo = { ...data.body };
        console.debug("deviceInfo", this.deviceInfo);
      } else if (data.method === "sessionInfo") {
        this.handleSessionUpdate(data.params);
      }
    },

    /** 网关与设备的连接状态发生变化时，发来 deviceID 类型的消息 */
    handleDeviceInfo(deviceInfo) {
      this.deviceInfo = { ...deviceInfo };
      console.debug(
        "deviceInfo received",
        this.gwAddress,
        JSON.stringify(this.deviceInfo)
      );
      const prevDevConn = this.isDeviceConnected;
      this.isDeviceConnected =
        this.deviceInfo &&
        this.deviceInfo.deviceSN &&
        (this.deviceInfo.deviceSN !== "0" ||
          this.deviceInfo.ipAddress !== "0.0.0.0");

      // 设备连接成功时显示待命状态，设备掉线则置空
      this.cameraStatus = this.isDeviceConnected ? "standby" : "";

      // 设备连接状态发生变化
      if (prevDevConn !== this.isDeviceConnected) {
        console.debug(
          "deviceInfo changed",
          this.gwAddress,
          "isDeviceConnected: ",
          this.isDeviceConnected
        );
        this.$emit("state-changed", this.gwAddress);
      }
    },

    /** 采集起始和结束时收到的消息 */
    handleSessionUpdate(sessionInfo) {
      console.debug("sessionInfo:", JSON.stringify(sessionInfo, null, 1));

      if (sessionInfo.isRunning) {
        this.cameraStatus = "recording";

        console.debug("session begin, ts:", sessionInfo.timestamp);
        this.sessionProgress.beginTimestamp = sessionInfo.timestamp;
        this.sessionProgress.endTimestamp = sessionInfo.timestamp;
        this.sessionProgress.position = this.sessionProgress.beginTimestamp;

        if (sessionInfo.filename.endsWith("m3u8")) {
          const url = `http://${this.gwAddress}${sessionInfo.filename}`;
          console.debug("hls url:", url);
          const playDelay = sessionInfo.isInitial ? 3000 : 20;
          setTimeout(() => {
            console.debug("hlsPlayer.play", url, playDelay);
            hlsPlayer.play(url);
          }, playDelay);
        }
      } else {
        this.cameraStatus = "standby";

        console.debug("session end, ts:", sessionInfo.timestamp);
        this.sessionProgress.endTimestamp = sessionInfo.timestamp;
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
  align-items: center;
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
  color: rgba(255, 255, 255, 0.3);
}
/* .cambox .info-row.top .info-cell {
  margin-top: 8px;
} */
.cambox .info-row.bottom .info-cell {
  margin-bottom: 8px;
}
.chart {
  height: 100px;
}
</style>