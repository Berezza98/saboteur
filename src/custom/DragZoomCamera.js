import { Cameras } from "phaser";

export default class DragZoomCamera extends Cameras.Scene2D.Camera {
  constructor(scene, x, y, width, height, cameraBounds) {
    super(x, y, width, height);
    this.scene = scene;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.minZoom = 0.5;
    this.maxZoom = 2;
    this.setBounds(cameraBounds.x - cameraBounds.width / 2, cameraBounds.y - cameraBounds.height / 2, cameraBounds.width * 2, cameraBounds.height * 2);
    this.setScroll(cameraBounds.x, cameraBounds.y);
    this.init();
  };

  isDown = false;

  get initPos() {
    return this._initPos;
  };

  set initPos({ x, y }) {
    this._initPos = {
      x,
      y
    };
  };

  init() {
    this._rectangle = new Phaser.Geom.Rectangle(this.x, this.y, this.width, this.height);
    this.setZoomDragEvent();

    this.scene.cameras.addExisting(this);
  };

  isOver(pointer) {
    return this._rectangle.contains(pointer.x, pointer.y);
  };

  setZoomDragEvent() {
    this.scene.input.on('wheel', (pointer, el, deltaX, deltaY) => {
      if (this.isOver(pointer)) {
        const changeValue = this.zoom + deltaY * 0.001;
        if (changeValue >= this.minZoom && changeValue <= this.maxZoom) {
          this.zoom = changeValue;
        }
      }
    });
  
    this.scene.input.on('pointerdown', (pointer, gameObjects) => {
      if (this.isOver(pointer)) {
        this.isDown = true;
        this.initPos = pointer;
      }
    });

    this.scene.input.on('pointermove', (pointer, gameObjects) => {
      if (this.isDown && this.isOver(pointer)) {
        const { zoom } = this;
        this.scrollY += (this.initPos.y - pointer.y) / zoom;
        this.scrollX += (this.initPos.x - pointer.x) / zoom;
        this.initPos = pointer;
      }
    });
  
    this.scene.input.on('pointerup', (pointer, gameObjects) => {
      if (this.isDown) {
        this.isDown = false;
      }
    });
  };
}