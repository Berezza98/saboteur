export default class LoadingBar {
  constructor(scene) {
    const { width, height } = scene.sys.game.config;
    const loadingWidth = width - 200;
    const loadingHeight = 50;
    this.scene = scene;
    this.style = {
      boxColor: 0xD3D3D3,
      loadingColor: 0xFFFFFF,
      height: loadingHeight,
      width: loadingWidth,
      x: (width - loadingWidth) / 2,
      y: height - 200,
    };
    this.loadingBox = this.scene.add.graphics();
    this.progressBar = this.scene.add.graphics();
    this.addEvents();
    this.show();
  };

  addEvents() {
    this.scene.load.on('progress', this.progressHandler.bind(this));
  };

  show() {
    const { boxColor, x, y, width, height } = this.style;
    this.loadingBox.fillStyle(boxColor).fillRect(x, y, width, height);
  };

  progressHandler(value) {
    const { loadingColor, x, y, width, height } = this.style;
    const margin = 10;
    this.progressBar.fillStyle(loadingColor).fillRect(x + margin, y + margin, value * (width - margin * 2), height - margin * 2);
  };
};