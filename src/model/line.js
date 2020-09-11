import MOVE from './EMove';

export default class lineClass {
  constructor(line, cells = []) {
    this.cells = cells;
    this.line = line;
    this.move = -1;
    this.layout = null;
  }

  getLine() {
    return this.line;
  }

  getCells() {
    return this.cells;
  }

  getIndexMove(n) {
    let i;
    this.getCells().forEach((element, index) => {
      if (element.cell === -1 || element.cell === (n * n)) {
        i = index;
      }
    });
    return i;
  }

  setEmptySpace(n) {
    const indexMove = this.getIndexMove(n);
    if (indexMove > -1) {
      this.move = indexMove;
      const cells = this.getCells();
      cells[indexMove].setCell(-1);
    } else {
      this.move = -1;
    }

    return {cellIndex: this.move, cells: this.getCells()};
  }

  setMove(emptySpace) {
      if (this.getLine() === emptySpace.line) {
        this.setCellMove(emptySpace.cell, MOVE.MOVE_HORIZONTAL);
      } else if (this.getLine() === emptySpace.line -1) {
        this.setCellMove(emptySpace.cell, MOVE.DOWN);
      } else if (this.getLine() === emptySpace.line +1) {
        this.setCellMove(emptySpace.cell, MOVE.UP);
      } else {
        this.setCellMove();
      }
  }

  setCellMove(indexEmptyCellSpace, move) {
    this.getCells().forEach((cell, cellIndex) => {
      cell.setMove(indexEmptyCellSpace, cellIndex, move);
    });
  }

  setLayoutCell(cell, layout) {
    this.getCells().forEach(c => {
      if (cell === c.cell) {
        c.setLayout(layout)
      }
    });
  }

  setLayout(layout) {
    this.layout = layout;
  }

  getLayout() {
    return this.layout;
  }

  getCell(cell) {
    let indexCell = null;
    const cell_ = this.getCells().filter((c, index) => {
        if (c.cell === cell.cell) {
            indexCell = index;
            return true;
        }
    });
    const cellFilter = cell_.length > 0 ? cell_[0] : null;
    return { cellFilter, indexCell }
  }
}
