import { AUTO } from 'phaser';

import BootScene from './scenes/BootScene';
import PreloadScene from './scenes/PreloadScene';
import MenuScene from './scenes/MenuScene';
import MainScene from './scenes/MainScene';

export const gameConfig = {
  type: AUTO,
  width: 1920,
  height: 1200,
  scene: [new BootScene(), new PreloadScene(),new MenuScene(), new MainScene()]
};