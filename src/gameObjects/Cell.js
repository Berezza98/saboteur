import { GameObjects } from 'phaser';

import { ASSETS_NAMES, CARD_NAMES } from '../constants';

export default class Cell extends GameObjects.Sprite {
  constructor(scene, gameField, { x, y }) {
    super(scene, x, y, ASSETS_NAMES.card, CARD_NAMES.empty);
    this.gameField = gameField;
    this.active = true;
    this.visible = false;
    this.setOrigin(0, 0);
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
  };

  onDragEnter() {
    this.setTint(0x00ff00);
  };

  async onDragLeave() {
    this.clearTint();
  };

  async onDrop({ texture: { key }, frame: { name } }) {
    this.active = false;
    await this.onDragLeave();
    this.setTexture(key, name);
    this.gameField.activateFieldsAround(this);
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