import bg from './assets/sprites/bg.jpg';
import cards from './assets/sprites/cards.png';

import { ASSETS_NAMES } from './constants';

export const bootAssets = [
  {
    name: ASSETS_NAMES.mainBg,
    type: 'image',
    src: bg
  },
];

export const mainAssets = [
  {
    name: ASSETS_NAMES.card,
    type: 'spritesheet',
    src: cards,
    options: {
      frameWidth: 120,
      frameHeight: 177.4,
    }
  }
];