import Scene from "../custom/Scene";
import { bootAssets } from '../assetConfig';
import { BOOT_SCENE, PRELOAD_SCENE } from '../constants';

export default class BootScene extends Scene {
  constructor() {
    super(BOOT_SCENE);
  };

  preloadAssets = bootAssets;

  create() {
    this.scene.start(PRELOAD_SCENE);
  };
};