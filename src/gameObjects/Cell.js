import { GameObjects } from 'phaser';

import { ASSETS_NAMES, CARD_NAMES } from '../constants';

export default class Cell extends GameObjects.Sprite {
  constructor(scene, { x, y }) {
    super(scene, x, y, ASSETS_NAMES.card, CARD_NAMES.empty);
    this.active = true;
    this.visible = false;
    this.scene.add.existing(this);
  };

  get active() {
    return this._active;
  };

  set active(value) {
    this._active = value;
    if (value) {
      this.setInteractive({
        dropZone: true,
      });
    } else {
      this.disableInteractive();
    }
  }

  onDragEnter() {
    this.changeScale(1.2);
    this.setTint(0x00ff00);
  };

  async onDragLeave() {
    await this.changeScale(1);
    this.clearTint();
  };

  async onDrop({ texture: { key }, frame: { name } }) {
    this.active = false;
    await this.onDragLeave(1);
    this.setTexture(key, name);
  };

  changeScale(scale) {
    return new Promise((resolve) => {
      this.scene.tweens.add({
        targets: this,
        scale,
        ease: 'Linear',
        duration: 100,
        onComplete: resolve
      });
    });
  }
};