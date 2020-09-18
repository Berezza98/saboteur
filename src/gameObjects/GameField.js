import Cell from '../gameObjects/Cell';
import { mainAssets } from '../assetConfig';
import { ASSETS_NAMES, START_FIELD_STATE } from '../constants';
import DragZoomScene from '../custom/DragZoomScene';

export default class GameField extends DragZoomScene {
  constructor(x, y) {
    super(x, y);
    this.elements = [];
    this.startCardPos = [2, 0];
    this.gameField = {
      rows: 5,
      columns: 9,
    };
    this.cellMargin = 5;
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
      newRow.push(new Cell(this, {
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
      newRow.push(new Cell(this, {
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
      row.push(new Cell(this, {
        x: x + frameWidth + this.cellMargin,
        y
      }));
    });
  };

  addFirstCol() {
    const { frameWidth, frameHeight } = mainAssets.find(obj => obj.name === ASSETS_NAMES.card).options;
    this.elements.forEach(row => {
      const { x, y } = row[0];
      row.unshift(new Cell(this, {
        x: x - frameWidth - this.cellMargin,
        y
      }));
    });
  };

  findActiveCell(x, y) {
    return Object.values(START_FIELD_STATE).find(el => el.x === x && el.y === y);
  };

  createUI() {
    const { frameWidth, frameHeight } = mainAssets.find(obj => obj.name === ASSETS_NAMES.card).options;
    const { width, height } = this;
    const { rows, columns } = this.gameField;
    const container = this.add.container(width / 2, height / 2);

    for(let row = 0; row < rows; row++){
      this.elements[row] = [];
      for(let col = 0; col < columns; col++){
        const pos = {
          x: col * (frameWidth + this.cellMargin),
          y: row * (frameHeight + this.cellMargin),
        };
        const cell = new Cell(this, pos);
        container.add(cell);
        this.elements[row][col] = cell;
        if (this.findActiveCell(col, row)) {
          cell.visible = true;
        }
      }
      console.log(container);
    }
  };
};