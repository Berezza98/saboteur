import { GameObjects } from 'phaser';
import Cell from '../gameObjects/Cell';
import { mainAssets } from '../assetConfig';
import { ASSETS_NAMES, START_FIELD_STATE } from '../constants';

export default class GameField extends GameObjects.Container {
  constructor(scene, x, y) {
    super(scene, x, y);
    this.scene = scene;
    this.elements = [];
    this.gameField = {
      rows: 5,
      columns: 9,
    };
    this.cellMargin = 5;

    const { width, height } = this.scene.sys.game.config;
    const coefSize = 2;
    this.marginLeft = width * coefSize;
    this.marginTop = height * coefSize;
    
    this.createUI();
    this.scene.add.existing(this);
  };

  get countRows() {
    return this.elements.length;
  };

  get countColumns() {
    return this.elements[0].length;
  }

  get topLeftPos() {
    const { x, y } = this.elements[0][0];
    return {
      x,
      y
    };
  };

  get bottomRightPos() {
    const { x, y, height, width } = this.elements[this.countRows - 1][this.countColumns - 1];
    return {
      x: x + width,
      y: y + height
    };
  };

  get size() {
    return {
      width: this.bottomRightPos.x - this.topLeftPos.x,
      height: this.bottomRightPos.y - this.topLeftPos.y
    };
  };

  findCellPos(cell) {
    let col;
    const row = this.elements.findIndex(row => {
      col = row.findIndex(col => col === cell);
      return col >= 0;
    });
    return {
      row,
      col
    };
  };

  activateFieldsAround(cell) {
    this.addNewCells(cell);
  
    const { row, col } = this.findCellPos(cell);

    this.elements[row][col + 1].visible = true;
    this.elements[row][col - 1].visible = true;
    this.elements[row - 1][col].visible = true;
    this.elements[row + 1][col].visible = true;
  };

  addNewCells(cell) {
    const { row, col } = this.findCellPos(cell);

    if (!this.elements[row][col + 1]) {
      this.addLastCol();
    }
    if (!this.elements[row][col - 1]) {
      this.addFirstCol();
      console.log(this);
      console.log('first col was added');
    }
    if (!this.elements[row - 1]) {
      this.addFirstRow();
    }
    if (!this.elements[row + 1]) {
      this.addLastRow();
    }
  };

  addFirstRow() {
    const { frameWidth, frameHeight } = mainAssets.find(obj => obj.name === ASSETS_NAMES.card).options;
    const { x, y } = this.elements[0][0];
    const newRow = [];
    for(let i = 0; i < this.countColumns; i++) {
      const pos = {
        x: x + (frameWidth + this.cellMargin) * i,
        y: y - frameHeight - this.cellMargin
      };
      const cell = new Cell(this.scene, this, pos);
      newRow.push(cell);
      this.add(cell);
    }
    this.elements.unshift(newRow);
  };

  addLastRow() {
    const { frameWidth, frameHeight } = mainAssets.find(obj => obj.name === ASSETS_NAMES.card).options;
    const { x, y } = this.elements[this.elements.length - 1][0];
    const newRow = [];
    for(let i = 0; i < this.countColumns; i++) {
      const pos = {
        x: x + (frameWidth + this.cellMargin) * i,
        y: y + frameHeight + this.cellMargin
      };
      const cell = new Cell(this.scene, this, pos);
      newRow.push(cell);
      this.add(cell);
    }
    this.elements.push(newRow);
  };

  addLastCol() {
    const { frameWidth, frameHeight } = mainAssets.find(obj => obj.name === ASSETS_NAMES.card).options;
    this.elements.forEach(row => {
      const { x, y } = row[row.length - 1];
      const pos = {
        x: x + frameWidth + this.cellMargin,
        y
      };
      const cell = new Cell(this.scene, this, pos);
      row.push(cell);
      this.add(cell);
    });
    console.log(this.elements);
  };

  addFirstCol() {
    const { frameWidth, frameHeight } = mainAssets.find(obj => obj.name === ASSETS_NAMES.card).options;
    this.elements.forEach(row => {
      const { x, y } = row[0];
      const pos = {
        x: x - frameWidth - this.cellMargin,
        y
      };
      const cell = new Cell(this.scene, this, pos);
      row.unshift(cell);
      this.add(cell);
    });
  };

  findActiveCell(x, y) {
    return Object.values(START_FIELD_STATE).find(el => el.x === x && el.y === y);
  };

  createUI() {
    const { frameWidth, frameHeight } = mainAssets.find(obj => obj.name === ASSETS_NAMES.card).options;
    const { rows, columns } = this.gameField;

    for(let row = 0; row < rows; row++){
      this.elements[row] = [];
      for(let col = 0; col < columns; col++){
        const pos = {
          x: col * (frameWidth + this.cellMargin) + this.marginLeft,
          y: row * (frameHeight + this.cellMargin) + this.marginTop,
        };
        const fieldPos = {
          row,
          col
        };
        const cell = new Cell(this.scene, this, pos, fieldPos);
        this.add(cell);
        this.elements[row][col] = cell;
        if (this.findActiveCell(col, row)) {
          cell.visible = true;
        }
      }
    }
  };
};