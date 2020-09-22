import Scene from "../custom/Scene";
import { mainAssets } from '../assetConfig';
import { PRELOAD_SCENE, MENU_SCENE, ASSETS_NAMES } from '../constants';
import LoadingBar from '../gameObjects/LoadingBar';

export default class PreloadScene extends Scene {
  constructor() {
    super(PRELOAD_SCENE);
  };

  preloadAssets = mainAssets;

  preload() {
    super.preload();
    new LoadingBar(this);
  };

  init() {
    this.createBackground();
    this.createDownloadText();
  }

  create() {
    console.log('create');
    this.scene.start(MENU_SCENE);
  };

  createBackground() {
    this.add.sprite(0, 0, ASSETS_NAMES.mainBg).setOrigin(0, 0);
  };

  createDownloadText() {
    const { width, height } = this.sys.game.config;
    this.add.text(width / 2, height / 2, 'Downloading...', {
      font: '36px Kronika',
      fill: '#ff0000',
    }).setOrigin(0.5);
  };
};