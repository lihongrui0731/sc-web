var imageModes = ['auto', 'fixed', 'avg'];
var viewModes = ['snapshot', 'video'];

var frameMillis = 1000 / 25;

// import class
var HlsPlayer = hlsPlayerModule.HlsPlayer;
var ImgLoader = imgLoaderModule.ImgLoader;

// component instance
var hlsPlayer;
var imgLoader;

var app = new Vue({
  el: '#app',
  //template: '#app-template',
  vuetify: new Vuetify(),
  components: {
    'ws-client': wsClientModule.WSClient,
  },
  data() {
    return {
      cw: 640,
      ch: 480,
      liveRefreshInterval: 100,
      isLiveRefreshOn: false,
      isLiveRefreshPaused: false,
      liveRefreshLastTs: null,

      toggleRecordMode: 0,

      drawerRight: false,

      host: {
        address: document.location.hostname,
        port: 6380,
      },

      picks: {
        cameraMode: [
          { value: '640@16', label: '640x480 @ 16fps' },
          { value: '320@50', label: '320x240 @ 50fps' },
        ],
        acousticFrameRate: [
          { value: 50, label: '50 fps' },
          { value: 100, label: '100 fps' },
        ],
      },
      captureOptions: {
        cameraMode: '640@16',
        acousticFrameRate: 50,
      },
      captureSettings: {
        freqRange: [1000, 5000],
        distance: 500,
        //cameraLighting: false,
      },
      imageSettings: {
        modeIndex: 0,
        imageMode: 'auto',
        dynamicRange: 5.0,
        fixedThreshold: 60,
        thresholdMargin: 5.0,
      },

      sessionProgress: {
        beginTimestamp: 0,
        endTimestamp: 100,
        position: 0,
      },

      wsConnected: false,
      lastConnected: null,
      connTimerInterval: null,
      sessionSeconds: null,

      deviceInfo: null,

      isTestButtonVisible: false,

      viewMode: 'video',
      // 当前运行状态 'recording' / 'paused' / null
      running: null,
    };
  },
  mounted() {
    hlsPlayer = new HlsPlayer(this.$refs.camVideo);
    imgLoader = new ImgLoader(this.$refs.camCanvas, this.$refs.spectrumCanvas);

    this.$refs.wsClient.connect();
  },
  watch: {
    toggleRecordMode() {
      const body = {};
      if (this.toggleRecordMode === 1) {
        body.recordMode = 'mp4';
      } else if (this.toggleRecordMode === 0) {
        body.recordMode = 'hls';
      }
      console.debug('recordMode', body.recordMode);
      this.sendSetParam(body);
    },
  },
  computed: {
    hostUri() {
      return `ws://${this.host.address}:${this.host.port}/`;
    },
    connectButtonText() {
      return this.wsConnected ? '断开' : '连接';
    },

    canvasStyle() {
      return { display: this.viewMode === 'snapshot' ? 'block' : 'none' };
    },
    videoStyle() {
      return { display: this.viewMode === 'video' ? 'block' : 'none' };
    },

    freqRangeLabel() {
      return (
        this.captureSettings.freqRange[0].toString() + 'Hz ~ ' + this.captureSettings.freqRange[1].toString() + 'Hz'
      );
    },
    distanceLabel() {
      return (this.captureSettings.distance / 10).toFixed(0) + 'cm';
    },
    dynamicRangeText() {
      return this.imageSettings.dynamicRange.toFixed(1) + 'dB';
    },
    fixedThresholdText() {
      return this.imageSettings.fixedThreshold.toFixed(1) + 'dB';
    },
    thresholdMarginText() {
      return this.imageSettings.thresholdMargin.toFixed(1) + 'dB';
    },
    imageModeValue() {
      return imageModes[this.imageSettings.modeIndex];
    },
    hasSessionData() {
      return this.sessionProgress.endTimestamp - this.sessionProgress.beginTimestamp > 100;
    },
  },
  methods: {
    toggleConnect() {
      this.$refs.wsClient.toggleConnect();
    },

    onWsStateChanged(isOpen) {
      this.wsConnected = isOpen;
      console.debug('this.wsConnected', this.wsConnected);

      if (isOpen) {
        this.lastConnected = Date.now();
        this.connTimerInterval = setInterval(() => {
          this.sessionSeconds = Math.floor((Date.now() - this.lastConnected) / 1000);
        }, 1000);
      } else {
        this.running = null;
        clearInterval(this.connTimerInterval);
        this.lastConnected = null;
        this.sessionSeconds = null;
        this.deviceInfo = null;
        this.sessionProgress = {
          beginTimestamp: 0,
          endTimestamp: 100,
          position: 0,
        };
      }
    },

    /** 收到JSON数据 */
    onWsMessageReceived(data) {
      if (data.msgType === 'sessionInfo') {
        this.handleSessionUpdate(data.body);
      } else if (data.msgType === 'dataFrame') {
        imgLoader.receive(data.body);
      } else if (data.msgType === 'deviceID') {
        this.deviceInfo = { ...data.body };
      }
    },

    /** 收到字节流数据 */
    onWsDataReceived(data) {},

    toolbarBtn(name) {
      if (name === 'record') {
        // 目前不能在后台完成上一命令前发出别的命令，待后台实现请求排队
        this.sendCmd(name);
        this.running = 'recording';
        this.resetProgress();
        imgLoader.clear();
      } else if (name === 'record-pause') {
        this.sendCmd(name);
        this.running = 'paused';
      } else if (name === 'stop') {
        this.sendCmd(name);
        this.running = null;
        hlsPlayer.stop();
      } else if (name === 'step-prev') {
        this.seekStep(-1);
      } else if (name === 'step-next') {
        this.seekStep(1);
      } else if (name === 'play') {
        //this.sendCmd(name);
        this.running = null;
      } else if (name === 'play-pause') {
        //this.sendCmd(name);
        this.running = null;
      } else if (name === 'test') {
        //this.sendCmd('saveMemory');
        if (this.viewMode === 'snapshot') {
          this.viewMode = 'video';
        } else {
          this.viewMode = 'snapshot';
        }
      }
    },

    /** 发送无参数命令 */
    sendCmd(action) {
      this.$refs.wsClient.sendMessage(action);
    },

    /** 发送 seek 命令 */
    sendSeek(timestamp) {
      const action = 'seek';
      const body = { timestamp };
      this.$refs.wsClient.sendMessage(action, body);
    },

    /** 发送 setParam 命令 */
    sendSetParam(body) {
      const action = 'setParam';
      this.$refs.wsClient.sendMessage(action, body);
    },

    /** 设置采集参数 */
    setCaptureParams() {
      const body = { ...this.captureSettings };
      this.sendSetParam(body);
    },

    /** 设置采集选项 */
    saveOptions() {
      const body = { ...this.captureOptions };
      this.sendSetParam(body);
    },

    imageModeChanged() {
      this.imageSettings.imageMode = imageModes[this.imageSettings.modeIndex];
      console.debug('imageMode', this.imageSettings.imageMode);
      const body = { imageMode: this.imageSettings.imageMode };
      this.sendSetParam(body);
    },
    dynamicRangeChanged() {
      console.debug('dynamicRange', this.imageSettings.dynamicRange);
      const body = { dynamicRange: this.imageSettings.dynamicRange };
      this.sendSetParam(body);
    },
    fixedThresholdChanged() {
      console.debug('fixedThreshold', this.imageSettings.fixedThreshold);
      const body = { fixedThreshold: this.imageSettings.fixedThreshold };
      this.sendSetParam(body);
    },
    thresholdMarginChanged() {
      console.debug('thresholdMargin', this.imageSettings.thresholdMargin);
      const body = { thresholdMargin: this.imageSettings.thresholdMargin };
      this.sendSetParam(body);
    },

    resetProgress() {
      this.sessionProgress.beginTimestamp = 0;
      this.sessionProgress.endTimestamp = 100;
      this.sessionProgress.position = 0;
    },

    /** 拖动进度条时，请求跳转到相应的位置 */
    seekPosition() {
      let position = this.sessionProgress.position - (this.sessionProgress.position % frameMillis);
      this.sendSeek(position);
    },

    seekStep(d) {
      this.sessionProgress.position += d * frameMillis;
      this.sendSeek(this.sessionProgress.position);
    },

    /** 采集起始和结束时收到的消息 */
    handleSessionUpdate(sessionInfo) {
      console.debug('sessionInfo:', JSON.stringify(sessionInfo, null, 1));
      if (sessionInfo.isRunning) {
        this.running = 'recording';

        console.debug('session begin, ts:', sessionInfo.timestamp);
        this.sessionProgress.beginTimestamp = sessionInfo.timestamp;
        this.sessionProgress.endTimestamp = sessionInfo.timestamp;
        this.sessionProgress.position = this.sessionProgress.beginTimestamp;

        if (sessionInfo.filename.endsWith('m3u8')) {
          const url = document.location.protocol + '//' + document.location.hostname + sessionInfo.filename;
          console.debug('url:', url);
          const playDelay = sessionInfo.isInitial ? 1500 : 20;
          setTimeout(() => {
            hlsPlayer.play(url);
          }, playDelay);
        }
      } else {
        console.debug('session end, ts:', sessionInfo.timestamp);
        this.sessionProgress.endTimestamp = sessionInfo.timestamp;
        console.debug('range: [' + this.sessionProgress.beginTimestamp + ',' + this.sessionProgress.endTimestamp + ']');
        console.debug('position: ' + this.sessionProgress.position);

        hlsPlayer.stop();
      }

      this.viewMode = this.hasSessionData ? 'snapshot' : 'video';
    },
  },
});
