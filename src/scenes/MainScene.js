import Scene from '../custom/Scene';
import Card from '../gameObjects/Card';
import GameField from '../gameObjects/GameField';
import DragZoomScene from '../custom/DragZoomScene';
import { ASSETS_NAMES, CARD_NAMES, MAIN_SCENE } from '../constants';
import CustomCamera from '../custom/CustomCamera';
import Cell from '../gameObjects/Cell';
import { mainAssets } from '../assetConfig';

export default class MainScene extends Scene {
  constructor() {
    super(MAIN_SCENE);
  }

  create() {
    const { width, height } = this.sys.game.config;
    this.createBackground();
    this.createGnomeCard();
    this.createCardDeck();
    // this.scene.add('DragZoomScene', new DragZoomScene({
    //   x: width / 2,
    //   y: height / 2,
    //   height: 800,
    //   width: 1200
    // }), true);
    const g = this.add.graphics();
    g.lineStyle(2, 0xdd0000);
    g.strokeRect(width / 2 - 500, height / 2 - 400, 1000, 800);
    // this.scene.add('GameField', new GameField({
    //   x: width / 2,
    //   y: height / 2,
    //   height: 800,
    //   width: 1000,
    // }), true);
    this.createOwnCards();
    this.createTexts();

    // this.makeGraphics();
    // this.makeContent();
    // this.camera1 = new CustomCamera(this, {
    //   x: 50,
    //   y: 50,
    //   width: 300,
    //   height: 500,
    //   scrollX: width,
    //   scrollY: height,
    // });
  };

  makeGraphics() {
    const g = this.add.graphics();
    g.lineStyle(2, 0xdd0000);
    g.strokeRect(45, 45, 310, 510);
    g.fillStyle(0xdd0000, 1);
    g.fillTriangle(80, 290, 80, 310, 120, 300);
    g.fillTriangle(320, 290, 320, 310, 280, 300);
  };

  makeContent() {
    const { width, height } = this.sys.game.config;
    new Cell(this, { x: width, y: height }).setOrigin(0);
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