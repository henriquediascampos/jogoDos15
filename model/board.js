import cellClass from '../model/cell';
import lineClass from '../model/line';
import MOVE from './EMove';

class BoardClass {
    move = {};
    lines = [];
    n;
    match = false;
    constructor(n) {
        this.n = n;
        this.match = false;
        this.createBoard();
    }

    getLines() {
        return this.lines;
    }

    setLine(lines) {
        this.lines = lines;
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

    getMatch() {
        return this.match;
    }

    setMatch(match) {
        this.match = match;
    }

    setEmptySpace() {
        this.getLines().forEach((line, index) => {
            const cellIndex = line.setEmptySpace(this.n);
            if (cellIndex > -1) {
                this.move = { line: index, cell: cellIndex };
            }
        });

        this.getLines().forEach((line) => {
            line.setMove(this.move);
        });
    }

    createSimpleArray(n) {
        return [...Array(n).keys()].map((i) => i + 1);
    }

    createBoard() {
        this.lines = this.createNewLines()
        this.setEmptySpace();
    }

    createNewLines() {
        const cells = this.createCells()
        return this.createSimpleArray(this.n).map((line_) => {
            let groupCell = cells.splice(0, this.n);
            return new lineClass(line_, groupCell);
        });
    }

    createCells() {
        return this.createSimpleArray(this.n * this.n)
            // .sort(() => 0.5 - Math.random())
            .map((c) => new cellClass(c));
    }

    setLayoutCell(cell, layout) {
        this.getLines().forEach((line) => {
            line.setLayout(cell, layout);
        });
    }

    checkThisIsMatchPosition(cell, x, y) {
        const cellFilter = this.getLines().reduce((accu, curr) => {
            return [...accu, ...curr.getCells()];
        }, []).filter(c => c.cell === cell.cell)[0];

        const vazio = this.getLines()[this.move.line].getCells()[this.move.cell].getLayout();
        const layout = cellFilter.getLayout();
        const x_ = layout.layout.x + x;
        const y_ = layout.layout.y + y;

        if (cell.move === MOVE.DOWN && cell.move === MOVE.UP) {
            const isMatch = y_ >= vazio.layout.y -10 && y_ <= vazio.layout.y;
            this.setMatch(isMatch);
        } else {
            const isMatch = x_ >= vazio.layout.x -10 && x_ <= vazio.layout.x;
            this.setMatch(isMatch);
        }
    }

    handleMatch(cell) {
        console.log(cell);
    }
}


export default BoardClass;