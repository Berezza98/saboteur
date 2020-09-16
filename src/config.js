import { AUTO } from 'phaser';

import MainScene from './scenes/MainScene';

export const gameConfig = {
  type: AUTO,
  width: 1920,
  height: 1200,
  scene: new MainScene()
};