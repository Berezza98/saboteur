import Cell from '../gameObjects/Cell';
import { mainAssets } from '../assetConfig';
import { ASSETS_NAMES, START_FIELD_STATE } from '../constants';

export default class GameField {
  constructor(scene) {
    this.elements = [];
    this.startCardPos = [2, 0];
    this.scene = scene;
    this.gameField = {
      rows: 5,
      columns: 9,
    };
    this.cellMargin = 5;
    this.topMargin = 170;
  };

  get countRows() {
    return this.elements.length;
  };

  get countColumns() {
    return this.elements[0].length;
  }

  addFirstRow() {
    const { frameWidth, frameHeight } = mainAssets.find(obj => obj.name === ASSETS_NAMES.card).options;
    const { x, y } = this.elements[0][0];
    const newRow = [];
    for(let i = 0; i < this.countColumns; i++) {
      newRow.push(new Cell(this.scene, {
        x: x + (frameWidth + this.cellMargin) * i,
        y: y - frameHeight - this.cellMargin
      }));
    }
    this.elements.push(newRow);
  };

  addLastRow() {
    const { frameWidth, frameHeight } = mainAssets.find(obj => obj.name === ASSETS_NAMES.card).options;
    const { x, y } = this.elements[this.elements.length - 1][0];
    const newRow = [];
    for(let i = 0; i < this.countColumns; i++) {
      newRow.push(new Cell(this.scene, {
        x: x + (frameWidth + this.cellMargin) * i,
        y: y + frameHeight + this.cellMargin
      }));
    }
    this.elements.push(newRow);
  };

  addLastCol() {
    const { frameWidth, frameHeight } = mainAssets.find(obj => obj.name === ASSETS_NAMES.card).options;
    this.elements.forEach(row => {
      const { x, y } = row[row.length - 1];
      row.push(new Cell(this.scene, {
        x: x + frameWidth + this.cellMargin,
        y
      }));
    });
  };

  addFirstCol() {
    const { frameWidth, frameHeight } = mainAssets.find(obj => obj.name === ASSETS_NAMES.card).options;
    this.elements.forEach(row => {
      const { x, y } = row[0];
      row.unshift(new Cell(this.scene, {
        x: x - frameWidth - this.cellMargin,
        y
      }));
    });
  };

  findActiveCell(x, y) {
    return Object.values(START_FIELD_STATE).find(el => el.x === x && el.y === y);
  };

  render() {
    const { frameWidth, frameHeight } = mainAssets.find(obj => obj.name === ASSETS_NAMES.card).options;
    const { width, height } = this.scene.sys.game.config;
    const { rows, columns } = this.gameField;
    const diffX = ((width - (columns * (frameWidth + this.cellMargin ))) / 2) + frameWidth / 2;

    for(let row = 0; row < rows; row++){
      this.elements[row] = [];
      for(let col = 0; col < columns; col++){
        const pos = {
          x: col * (frameWidth + this.cellMargin) + diffX,
          y: row * (frameHeight + this.cellMargin) + this.topMargin,
        };
        const cell = new Cell(this.scene, pos);
        this.elements[row][col] = cell;
        if (this.findActiveCell(col, row)) {
          cell.visible = true;
        }
      } 
    }
  };
};