import Scene from '../custom/Scene';
import Card from '../gameObjects/Card';
import GameField from '../gameObjects/GameField';
import DragZoomScene from '../custom/DragZoomScene';
import DragZoomCamera from '../custom/DragZoomCamera'
import { ASSETS_NAMES, CARD_NAMES, MAIN_SCENE } from '../constants';
import Cell from '../gameObjects/Cell';
import { mainAssets } from '../assetConfig';

export default class MainScene extends Scene {
  constructor() {
    super(MAIN_SCENE);
  }

  create() {
    this.createBackground();
    this.createGnomeCard();
    this.createCardDeck();
    this.addGameField();
    console.log(this.gameField);
    this.createOwnCards();
    this.createTexts();
  };

  addGameField() {
    const { width, height } = this.sys.game.config;

    this.gameField = new GameField(this, 0, height);

    const cameraBounds = {
      x: this.gameField.topLeftPos.x,
      y: this.gameField.topLeftPos.y + height,
      width: this.gameField.size.width,
      height: this.gameField.size.height
    };

    this.dragZoomCamera = new DragZoomCamera(
      this,
      width / 2 - this.gameField.size.width / 2,
      height / 2 - this.gameField.size.height / 2,
      this.gameField.size.width,
      this.gameField.size.height,
      cameraBounds
    );

    this.createFieldFrame();

    const g = this.add.graphics();
    g.fillStyle(0xffffff, 1);
    g.fillPoint(this.gameField.topLeftPos.x, this.gameField.topLeftPos.y + height, 100);
    g.fillPoint(this.gameField.bottomRightPos.x, this.gameField.bottomRightPos.y + height, 100);
  };

  createFieldFrame() {
    const { width, height } = this.sys.game.config;
    const { size } = this.gameField;
    const g = this.add.graphics();
    g.lineStyle(5, 0xffffff, 0.6);
    g.strokeRect(
      width / 2 - size.width / 2,
      height / 2 - size.height / 2,
      size.width,
      size.height
    );
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