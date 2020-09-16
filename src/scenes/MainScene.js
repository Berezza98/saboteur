import Scene from '../custom/Scene';
import Card from '../gameObjects/Card';
import GameField from '../gameObjects/GameField';
import DragZoomScene from '../custom/DragZoomScene';

import { mainAssets } from '../assetConfig';
import { ASSETS_NAMES, CARD_NAMES } from '../constants';

export default class MainScene extends Scene {
  constructor() {
    super('Main');
    this.gameField = new GameField(this);
  }

  preloadAssets = mainAssets;

  create() {
    this.scene.add('LittleScene', new DragZoomScene(), true);
    this.createBackground();
    this.createGnomeCard();
    this.createCardDeck();
    this.gameField.render();
    this.createOwnCards();
    this.createTexts();
  };

  createTexts() {
    this.add.text(0, 0, 'Saboteur', {
      font: '36px Kronika',
      fill: '#ffffff',
    });
  }

  createBackground() {
    this.add.sprite(0, 0, ASSETS_NAMES.mainBg).setOrigin(0, 0);
  };

  getGnomeCardPosition() {
    const { frameWidth, frameHeight } = mainAssets.find(obj => obj.name === ASSETS_NAMES.card).options;
    const { width, height } = this.sys.game.config;
    return {
      x: 10,
      y: height - (frameHeight + 20)
    };
  };

  createGnomeCard() {
    const gnomeCardPos = this.getGnomeCardPosition();
    new Card(this, gnomeCardPos, CARD_NAMES.badGnome);
  }

  createCardDeck() {
    const { frameWidth, frameHeight } = mainAssets.find(obj => obj.name === ASSETS_NAMES.card).options;
    const { x, y } = this.getGnomeCardPosition();
    const pos = {
      x: x + frameWidth + 10,
      y
    };
    new Card(this, pos, CARD_NAMES.backRegular);

    const textPos = {
      x: pos.x + (frameWidth / 2),
      y: pos.y + (frameHeight / 2)
    };
    this.add.text(textPos.x, textPos.y, '23', {
      font: '65px Kronika',
      fill: '#ffffff',
    }).setOrigin(0.5, 0.5);
  }

  createGameField() {
    
    
  };

  createOwnCards() {
    const { frameWidth, frameHeight } = mainAssets.find(obj => obj.name === ASSETS_NAMES.card).options;
    const { width, height } = this.sys.game.config;
    const margin = 5;
    const ownCards = [1, 2, 3, 4, 5, 6];
    const diffX = (width - (ownCards.length * (frameWidth + margin ))) / 2;
    const showDelay = 150;
    ownCards.forEach((card, index) => {
      const pos = {
        x: index * (frameWidth + margin) + diffX,
        y: height - (frameHeight + 20),
      };
      new Card(this, pos, CARD_NAMES.cross, showDelay * index);
    });
  };
};