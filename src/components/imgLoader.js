export default class ImgLoader {
  constructor(camCanvas, spectCanvas) {
    // TODO 放入map保存，绘图时可选择
    if (camCanvas) {
      this.camSize = [camCanvas.width, camCanvas.height];
      this.camCtx = camCanvas.getContext("2d");
    }
    if (spectCanvas) {
      this.spectSize = [spectCanvas.width, spectCanvas.height];
      this.spectCtx = spectCanvas.getContext("2d");
    }
  }

  clearCanvas(ctx, width, height) {
    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, width, height);
  }

  /** 清空暂存的 img */
  clear() {
    if (this.camCtx)
      this.clearCanvas(this.camCtx, this.camSize[0], this.camSize[1]);
    if (this.spectCtx)
      this.clearCanvas(this.spectCtx, this.spectSize[0], this.spectSize[1]);
  }

  /**
   * 新建一个 Image 对象，加载 src 指定的内容，加载完成后绘制在 canvas 上
   */
  loadAndDrawImage(src, ctx = this.camCtx, size = this.camSize) {
    const img = new Image();
    const onload = () => {
      ctx.drawImage(img, 0, 0, size[0], size[1]);
      img.removeEventListener("load", onload);
    };
    img.addEventListener("load", onload);
    img.src = src;
  }

  drawLoadedImage(img) {
    let ctx = this.camCtx;
    let size = this.camSize;

    ctx.drawImage(img, 0, 0, size[0], size[1]);
  }

  /**
   * 接收从 ws server 发来的 PNG 字节流，绘制在 canvas 上
   */
  receiveArrayBuffer(buffer) {
    const prefix = "data:image/png;base64,";
    var uint8 = new Uint8ClampedArray(buffer);
    const src = prefix + base64Module.fromByteArray(uint8);
    this.loadAndDrawImage(src);
  }

  /**
   * 接收从 ws server 发来的数据帧 { frameType, timestamp, data}
   **/
  receive(dataFrame) {
    let ctx, size;
    if (dataFrame.frameType === "composite") {
      ctx = this.camCtx;
      size = this.camSize;
    } else if (dataFrame.frameType === "spectrum") {
      ctx = this.spectCtx;
      size = this.spectSize;
    }

    this.loadAndDrawImage(dataFrame.data, ctx, size);
  }
}
