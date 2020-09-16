import { GameObjects } from 'phaser';

import { ASSETS_NAMES } from '../constants';

export default class Card extends GameObjects.Sprite {
  constructor(scene, position, cardName, delay) {
    super(scene, 0, 0, ASSETS_NAMES.card, cardName);
    this.position = position;
    this.delay = delay;
    this.dropped = false;
    this.setOrigin(0, 0);
    this.setPosition(-this.width, -this.height);
    this.setInteractive({
      draggable: true,
      cursor: 'pointer'
    });

    this.addHandlers();
    this.scene.add.existing(this);
    this.show();
  };

  show() {
    const { x, y } = this.position;
    this.scene.tweens.add({
      targets: this,
      x,
      y,
      ease: 'Linear',
      delay: 500 + this.delay,
      duration: 500,
      onComplete: () => {
        console.log('Hi');
      }
    });
  };

  returnToPosition(x, y) {
    this.scene.tweens.add({
      targets: this,
      x,
      y,
      ease: 'Linear',
      duration: 300,
      onComplete: () => {
        console.log('Returned');
      }
    });
  };

  addHandlers() {
    this.on('dragstart', (gameObject) => {
      this.startDragPosition = {
        x: this.x,
        y: this.y
      };
      this.setDepth(999);
    });

    this.on('drag', (gameObject, x, y) => {
      this.setPosition(x, y);
    });

    this.on('dragend', (gameObject, x, y) => {
      console.log('dragend');
      this.setDepth(0);
      if (!this.dropped) {
        const { x, y } = this.startDragPosition;
        this.returnToPosition(x, y);
      }
    });


    this.on('drop', async (gameObject, dropZone) => {
      const { x, y, active, width, height } = dropZone;
      const correctX = x - width / 2;
      const correctY = y - height / 2;
      console.log('drop', this);
      if (active) {
        this.dropped = true;
        dropZone.onDrop(this);
        this.destroy();
      }
    });

    this.on('dragenter', (gameObject, dropZone) => {
      console.log(dropZone);
      dropZone.onDragEnter();
    });

    this.on('dragleave', (gameObject, dropZone) => {
      dropZone.onDragLeave();
    });
  };
};