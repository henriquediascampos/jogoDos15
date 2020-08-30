import MOVE from './EMove';

export default class lineClass {
  constructor(line, cells = []) {
    this.cells = cells;
    this.line = line;
    this.move = -1;
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
      if (element.cell === n * n || element.cell === -1) {
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
    }

    return this.move;
  }

  setMove(emptySpace) {
    const indexEmptySpace = emptySpace.line + 1;
    const difereceIndex = (this.getLine() - indexEmptySpace) * -1;
    if (difereceIndex === 0 || difereceIndex === 1 || difereceIndex === -1) {
      if (this.getLine() === indexEmptySpace) {
        this.setCellMove(emptySpace.cell, MOVE.MOVE_HORIZONTAL);
      } else if (this.getLine() > indexEmptySpace) {
        this.setCellMove(emptySpace.cell, MOVE.DOWN);
      } else if (this.getLine() < indexEmptySpace) {
        this.setCellMove(emptySpace.cell, MOVE.UP);
      }
    }
  }

  setCellMove(indexEmptySpace, move) {
    this.getCells().forEach((cell, cellIndex) => {
      cell.setMove(indexEmptySpace, cellIndex, move);
    });
  }

  setLayout(cell, layout) {
    this.getCells().forEach(c => {
      if (cell.cell === c.cell) {
        cell.setLayout(layout)
      }
    });
  }

  getCell(cell) {
    const cellFilter = this.getCells().filter(c => c.cell === cell.cell)
    return cellFilter ? cellFilter[0] : cellFilter;
  }
}
