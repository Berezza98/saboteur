import Scene from './Scene';

import codeImg from '../assets/sprites/code.png';

export default class DragZoomScene extends Scene {
  constructor() {
    super('LittleScene');
    this.x = 0;
    this.y = 0;
    this.height = 1000;
    this.width = 1000;
    this.minZoom = 0.5;
    this.maxZoom = 2;
  };

  preloadAssets = [
    {
      name: 'code',
      type: 'image',
      src: codeImg
    },
  ];

  bgCoef = 2;
  isDown = false;

  get camera() {
    return this.cameras.main;
  }

  get initPos() {
    return this._initPos;
  }

  set initPos({ x, y }) {
    this._initPos = {
      x,
      y
    };
  }

  create() {
    const { x, y, bgCoef, height, width } = this;
    const totalWidth = width * bgCoef;
    const totalHeight = height * bgCoef;
    this.rect = new Phaser.Geom.Rectangle(x, y, width, height);
    this.camera.setViewport(x, y, width, height);
    this.camera.setOrigin(0.5);
    this.camera.centerOn(totalWidth / 2, totalHeight / 2);
    this.camera.setBackgroundColor('rgba(255,0,0,0.3)');
    this.camera.setBounds(0, 0, totalWidth, totalHeight);
    this.add.image(totalWidth / 2, totalHeight / 2, 'code');
    this.cursors = this.input.keyboard.createCursorKeys();
    this.addListeners();
  };

  isOver(pointer) {
      return this.rect.contains(pointer.x, pointer.y);
  }

  addListeners() {
    this.input.on('wheel', (pointer, el, deltaX, deltaY) => {
      if (this.isOver(pointer)) {
        const { zoom } = this.camera;
        const changeValue = zoom + deltaY * 0.001;
        if (changeValue >= this.minZoom && changeValue <= this.maxZoom) {
          this.cameras.main.zoom = changeValue;
        }
      }
    });

    this.input.on('pointerdown', (pointer, gameObjects) => {
      if (this.isOver(pointer)) {
        this.isDown = true;
        this.initPos = pointer;
      }
    });

    this.input.on('pointermove', (pointer, gameObjects) => {
      if (this.isDown && this.isOver(pointer)) {
        const { zoom } = this.camera;
        this.camera.scrollY += (this.initPos.y - pointer.y) / zoom;
        this.camera.scrollX += (this.initPos.x - pointer.x) / zoom;
        this.initPos = pointer;
      }
    });
  
    this.input.on('pointerup', (pointer, gameObjects) => {
      if (this.isDown) {
        this.isDown = false;
      }
    });
  };

  update() {
    if (this.cursors.up.isDown) {
      this.cameras.main.scrollY -= 4 / this.cameras.main.zoom;
    } else if (this.cursors.down.isDown) {
      this.cameras.main.scrollY += 4 / this.cameras.main.zoom;
    }

    if (this.cursors.shift.isDown) {
      const zoom = this.cameras.main.zoom - 0.005 < 1 ? 1 : this.cameras.main.zoom - 0.005;
      this.cameras.main.zoom = zoom;
    } else if (this.cursors.space.isDown) {
      this.cameras.main.zoom += 0.005;
    }

    if (this.cursors.left.isDown) {
      this.cameras.main.scrollX -= 4 / this.cameras.main.zoom;
    } else if (this.cursors.right.isDown) {
      this.cameras.main.scrollX += 4 / this.cameras.main.zoom;
    }
  };
}