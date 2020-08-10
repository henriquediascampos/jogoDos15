import MOVE from './EMove';

export default class cellClass {
  constructor(cell, move) {
    this.cell = cell;
    this.move = move;
  }

  getMove() {
    return this.move;
  }

  getCell() {
    return this.cell;
  }

  setCell(cell) {
    this.cell = cell;
  }

  setMove(indexEmptySpace, index, move) {
    const difereceIndex = indexEmptySpace - index;
    if (move === MOVE.MOVE_HORIZONTAL) {
      if (difereceIndex === 1) {
        this.move = MOVE.RIGHT;
      }
      if (difereceIndex === -1) {
        this.move = MOVE.LEFT;
      }
    } else if (move === MOVE.UP) {
      if (difereceIndex === 0) {
        this.move = MOVE.DOWN;
      }
    } else if (move === MOVE.DOWN) {
      if (difereceIndex === 0) {
        this.move = MOVE.UP;
      }
    }
  }
}
