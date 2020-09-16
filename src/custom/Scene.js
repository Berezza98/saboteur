import Phaser from 'phaser';

export default class Scene extends Phaser.Scene {
  constructor(name) {
    super(name);
  }

  preload() {
    console.log(this.preloadAssets);
    this.preloadAssets.forEach(({ type, name, src, options }) => {
      this.load[type](name, src, options);
    });
  };

  create() {
    console.log('create');
  };
};