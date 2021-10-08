// exports
var camBoxModule = {};

// imports wsClientModule, imgLoaderModule, hlsPlayerModule
// requires #c-cam-box-tmpl(text/x-template script)

void (function (exports) {
  'use strict';

  const wsPort = 6380;
  const wsInitConnDelay = 30; // 首次连接的延迟
  const wsReconnectCycle = 5; // 断开后重连的重试间隔
  const maxRetryTimes = 5; // 重试连接次数上限

  // 以下外部组件对象，只需引用 vm 实例中对应的元素即可工作，不放进 vm 的 data 内
  let hlsPlayer;
  let imageLoader;

  const CamBox = {
    template: '#c-cam-box-tmpl',
    components: {
      'ws-client': wsClientModule.WSClient,
    },
    props: ['gwAddress'],

    data() {
      return {
        updateDurationInterval: null,
        checkConnectionHandle: null,
        checkedTimes: 0,

        isWsConnected: false,
        lastConnected: null,
        durationSeconds: null,
        deviceInfo: {},
        isDeviceConnected: false,

        viewMode: 'snapshot',
        pictureSize: {
          width: 640,
          height: 480,
        },

        sessionProgress: {
          beginTimestamp: 0,
          endTimestamp: 100,
          position: 0,
        },

        cameraStatus: '',
      };
    },

    mounted() {
      // 启动连接维持定时器
      if (this.gwAddress) {
        this.checkWsConnection(true);
      }

      hlsPlayer = new hlsPlayerModule.HlsPlayer(this.$refs.camVideo);
      imageLoader = new imgLoaderModule.ImgLoader(this.$refs.camCanvas);

      // show placeholder image
      imageLoader.loadAndDrawImage(this.$refs.sampleImg.src);
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
      this.$emit('state-changed', this.gwAddress);
    },

    computed: {
      wsUri() {
        return `ws://${this.gwAddress}:${wsPort}/`;
      },

      canvasStyle() {
        return { display: this.viewMode === 'snapshot' ? 'block' : 'none' };
      },
      videoStyle() {
        return { display: this.viewMode === 'video' ? 'block' : 'none' };
      },

      wsConnectedText() {
        return this.isWsConnected ? '已连接' : '未连接';
      },

      deviceInfoText() {
        if (!this.isDeviceConnected) {
          return '未连接设备';
        } else {
          return '设备SN: ' + this.deviceInfo.deviceSN + ', 固件版本: ' + this.deviceInfo.fwVersion;
        }
      },

      hasSessionData() {
        return this.sessionProgress.endTimestamp - this.sessionProgress.beginTimestamp > 100;
      },
    },

    methods: {
      /** 计划一次连接检查 */
      scheduleConnectionChecking(delay) {
        this.checkedTimes++;
        this.checkConnectionHandle = window.setTimeout(this.checkWsConnection, delay);
      },
      /**
       * 停止进行自动连接检查
       * @param {bool} isReset true：连接失败次数清零，允许重新尝试；false：保留已失败次数，不再继续尝试
       */
      stopConnectionChecking(isReset) {
        if (this.checkConnectionHandle) window.clearTimeout(this.checkConnectionHandle);
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
          console.debug('connect failed too many times, giving up.');
          this.stopConnectionChecking(false);
          return;
        }

        if (!this.$refs.wsClient) return;
        this.$refs.wsClient.connect();

        // 启动定时器，延迟一段时间重复检查连接是否建立成功
        const delay = (isInit ? wsInitConnDelay : wsReconnectCycle) * 1000 + Math.round(1000 * Math.random());
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
            this.durationSeconds = Math.floor((Date.now() - this.lastConnected) / 1000);
          }, 1000);
          console.debug(`connected to ${this.wsUri} (${this.lastConnected})`);
        } else {
          // 连接已断开
          this.cameraStatus = '';
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

        this.$emit('state-changed', this.gwAddress);
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
        if (data.msgType === 'deviceID') {
          this.handleDeviceInfo(data.body);
        } else if (data.msgType === 'sessionInfo') {
          this.handleSessionUpdate(data.body);
        } else if (data.msgType === 'dataFrame') {
          const dataFrame = data.body;
          if (dataFrame.frameType === 'indicator-Leq') {
            let d = new Date(dataFrame.timestamp * 1000);
            //console.debug('Leq ts', d);
          }
        }
        // json-rpc
        else if (data.method === 'deviceID') {
          this.deviceInfo = { ...data.body };
          console.debug('deviceInfo', this.deviceInfo);
        } else if (data.method === 'sessionInfo') {
          this.handleSessionUpdate(data.params);
        }
      },

      /** 网关与设备的连接状态发生变化时，发来 deviceID 类型的消息 */
      handleDeviceInfo(deviceInfo) {
        this.deviceInfo = { ...deviceInfo };
        console.debug('deviceInfo received', this.gwAddress, JSON.stringify(this.deviceInfo));
        const prevDevConn = this.isDeviceConnected;
        this.isDeviceConnected =
          this.deviceInfo &&
          this.deviceInfo.deviceSN &&
          (this.deviceInfo.deviceSN !== '0' || this.deviceInfo.ipAddress !== '0.0.0.0');

        // 设备连接成功时显示待命状态，设备掉线则置空
        this.cameraStatus = this.isDeviceConnected ? 'standby' : '';

        // 设备连接状态发生变化
        if (prevDevConn !== this.isDeviceConnected) {
          console.debug('deviceInfo changed', this.gwAddress, 'isDeviceConnected: ', this.isDeviceConnected);
          this.$emit('state-changed', this.gwAddress);
        }
      },

      /** 采集起始和结束时收到的消息 */
      handleSessionUpdate(sessionInfo) {
        console.debug('sessionInfo:', JSON.stringify(sessionInfo, null, 1));

        if (sessionInfo.isRunning) {
          this.cameraStatus = 'recording';

          console.debug('session begin, ts:', sessionInfo.timestamp);
          this.sessionProgress.beginTimestamp = sessionInfo.timestamp;
          this.sessionProgress.endTimestamp = sessionInfo.timestamp;
          this.sessionProgress.position = this.sessionProgress.beginTimestamp;

          if (sessionInfo.filename.endsWith('m3u8')) {
            const url = `http://${this.gwAddress}${sessionInfo.filename}`;
            console.debug('hls url:', url);
            const playDelay = sessionInfo.isInitial ? 3000 : 20;
            setTimeout(() => {
              console.debug('hlsPlayer.play', url, playDelay);
              hlsPlayer.play(url);
            }, playDelay);
          }
        } else {
          this.cameraStatus = 'standby';

          console.debug('session end, ts:', sessionInfo.timestamp);
          this.sessionProgress.endTimestamp = sessionInfo.timestamp;
          console.debug(
            'range: [' + this.sessionProgress.beginTimestamp + ',' + this.sessionProgress.endTimestamp + ']'
          );
          console.debug('position: ' + this.sessionProgress.position);

          hlsPlayer.stop();
        }

        // 切换显示视频控件
        this.viewMode = this.hasSessionData ? 'snapshot' : 'video';
      },
    }, // /methods
  };

  exports.CamBox = CamBox;
})(camBoxModule);
