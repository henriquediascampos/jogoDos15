export default class boardClass {
  move = {};

  constructor(lines = []) {
    this.lines = lines;
  }

  getLines() {
    return this.lines;
  }

  getLineMove() {
    let lineMove = -1;
    this.lines.forEach((line) => {
      lineMove =
        lineMove === -1 && line.cells.indexOf(-1) !== -1
          ? line.cells.indexOf(-1)
          : -1;
    });

    return lineMove;
  }

  setEmptySpace(n) {
    this.getLines().forEach((line, index) => {
      const cellIndex = line.setEmptySpace(n);
      if (cellIndex > -1) {
        this.move = {line: index, cell: cellIndex};
      }
    });

    this.getLines().forEach((line) => {
      line.setMove(this.move);
    });
  }
}
