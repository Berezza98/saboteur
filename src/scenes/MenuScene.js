import Scene from "../custom/Scene";
import { bootAssets } from '../assetConfig';
import { MENU_SCENE, MAIN_SCENE, ASSETS_NAMES } from '../constants';

export default class BootScene extends Scene {
  constructor() {
    super(MENU_SCENE);
  };

  preloadAssets = bootAssets;

  create() {
    this.createBackground();
    this.createStartText();
    this.addTapHandler();
  };

  createBackground() {
    this.add.sprite(0, 0, ASSETS_NAMES.mainBg).setOrigin(0, 0);
  };

  createStartText() {
    const { width, height } = this.sys.game.config;
    this.add.text(width / 2, height / 2, 'Tap to Start', {
      font: '36px Kronika',
      fill: '#ff0000',
    }).setOrigin(0.5);
  };

  addTapHandler() {
    this.input.on('pointerdown', this.startGameHandler.bind(this));
  }

  startGameHandler(pointer, gameObjects) {
    this.scene.start(MAIN_SCENE);
  };
};