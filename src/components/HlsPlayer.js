import Hls from 'hls.js'
export default class HlsPlayer {
  constructor(videoElem) {
    this.videoElem = videoElem
    this.hls = null
    this.pendingTimedMetadata = []
  }

  handleTimedMetadata(event, data) {
    for (let i = 0; i < data.samples.length; i++) {
      const pts = data.samples[i].pts
      const str = new TextDecoder('utf-8').decode(
        data.samples[i].data.subarray(22)
      )
      this.pendingTimedMetadata.push({ pts: pts, value: str })
    }
  }

  timeUpdateCallback() {
    if (
      !this.pendingTimedMetadata ||
      this.pendingTimedMetadata.length == 0 ||
      this.pendingTimedMetadata[0].pts > this.videoElem.currentTime
    ) {
      return
    }
    const e = this.pendingTimedMetadata[0]
    this.pendingTimedMetadata = this.pendingTimedMetadata.slice(1)
    //console.log('Metadata ' + e.value + ' at ' + e.pts + 's')
  }

  play(url) {
    if (this.hls) {
      this.hls.destroy()
    }
    this.hls = new Hls({ /* debug: true */ })
    this.hls.on(Hls.Events.ERROR, (event, data) => {
      console.error(data)
    })
    this.hls.attachMedia(this.videoElem)
    this.videoElem.ontimeupdate = this.timeUpdateCallback
    this.hls.loadSource(url)
    this.hls.on(Hls.Events.MANIFEST_PARSED, (event, data) => {
      this.videoElem.play()
    })
    this.hls.on(Hls.Events.FRAG_PARSING_METADATA, this.handleTimedMetadata)
  }

  pause() {
    this.videoElem.pause()
  }

  stop() {
    this.videoElem.pause()
    this.hls.detachMedia()
    this.pendingTimedMetadata = []
  }
}
