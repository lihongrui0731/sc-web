const commandsWithNoBody = [
  'record',
  'pause',
  'stop',
  'replay',
  'replay-pause',
  'saveMemory',
]
const commandsWithBody = ['setParam', 'seek']
const requests = ['getParam']
const compatMode = true // 旧版本接口协议，待后端迁移到 JSON-PRC 2.0 后废弃
let lastMsgID = 0

export default {
  render: () => '',
  props: ['uri'],
  emits: ['state-changed', 'message-received', 'data-received'],
  data() {
    return {
      websocket: null,
    }
  },
  computed: {
    isOpen() {
      return this.websocket && this.websocket.readyState == 1
    },
  },
  methods: {
    connect() {
      if (!this.uri) return
      //console.debug('connecting to ' + this.uri);
      try {
        if (this.isOpen) this.websocket.close()

        if (typeof MozWebSocket == 'function') WebSocket = MozWebSocket
        this.websocket = new WebSocket(this.uri)

        this.websocket.onopen = (evt) => {
          this.$emit('state-changed', true)
        }
        this.websocket.onclose = (evt) => {
          this.$emit('state-changed', false)
        }

        this.websocket.onmessage = this.onmessage

        this.websocket.onerror = (evt) => {
          //console.debug('WS ERROR: ', JSON.stringify(evt));
        }
      } catch (exception) {
        console.debug('WS EXCEPTION: ', JSON.stringify(exception))
      }
    },
    disconnect() {
      if (this.websocket) this.websocket.close()
    },
    toggleConnect() {
      if (this.websocket && this.websocket.readyState == 1) {
        this.disconnect()
      } else {
        this.connect()
      }
    },
    async sendMessage(method, params, callback) {
      if (!this.isOpen) return

      if (compatMode) {
        const msg = {}
        if (commandsWithNoBody.includes(method)) {
          msg.cmd = method
        } else if (commandsWithBody.includes(method)) {
          msg.cmd = method
          if (params) msg.body = params
        } else if (requests.includes(method)) {
          msg.request = method
          if (params) msg.body = params
        }

        if (msg.cmd) {
          msg.msgID = ++lastMsgID

          const json = JSON.stringify(msg)
          console.debug(Date.now(), 'sending', json)
          this.websocket.send(json)
        } else if (msg.request) {
          // TODO 发送消息并等待应答
        }
      } else {
        // 按 JSON-RPC 2.0 格式发送消息
        const msg = { jsonrpc: '2.0' }
        msg.method = method
        if (params) msg.params = params
        if (requests.includes(method)) {
          msg.id = ++lastMsgID
        }
        if (msg.method) {
          const json = JSON.stringify(msg)
          console.debug(Date.now(), 'sending', json)
          this.websocket.send(json)
        }
        if (msg.id && typeof callback === 'function') {
          // TODO 保存回调函数
        }
      }
    },
    onmessage(evt) {
      if (typeof evt.data === 'string') {
        // TODO 对于响应类消息，查找对应的回调

        this.$emit('message-received', JSON.parse(evt.data))
      } else {
        this.$emit('data-received', evt.data)
      }
    },
  },
}
