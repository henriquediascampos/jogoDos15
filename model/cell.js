import MOVE from './EMove';

export default class cellClass {
  constructor(cell, move, layout, x, y) {
    this.cell = cell;
    this.move = move;
    this.layout = layout;
    this.x = x;
    this.y = y;
  }

  getMove() {
    return this.move;
  }

  getCell() {
    return this.cell;
  }

  getLayout() {
    return this.layout;
  }

  getX() {
    return this.x
  }

  getY() {
    return this.y
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

  setLayout(layout) {
    this.layout = layout;
  }

  setX(x) {
    this.x = x;
  }

  setY(y) {
    this.y = y;
  }

  checkThisIsMatchPosition(x, y) {
    console.log(x, y);
  }
}
