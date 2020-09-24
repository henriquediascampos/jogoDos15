import cellClass from '../model/cell';
import lineClass from '../model/line';
import MOVE from './EMove';


class BoardClass {
    move = {};
    lines = [];
    n;
    lockMatch = false;
    layout = null;
    cellToRender = [];

    constructor(n) {
        this.n = n;
        this.lockMatch = false;
        this.createBoard();
    }

    reboot(n) {
        this.n = n;
        this.lockMatch = false;
        this.createBoard(); 
    }

    reloadBoard() {
        this.setEmptySpace();
        this.setMove();
        this.reload();
        this.setLockMatch(false);
    }

    reload() {
        this.cellToRender.forEach(c => {
            const { cellFilter } = this.getCell(c);
            cellFilter.render();
        })

        this.cellToRender = [];
    }

    pushCellToRender(cell) {
        this.cellToRender = [...this.cellToRender, cell];
    }

    getLines() {
        return this.lines;
    }

    getLockMatch() {
        return this.lockMatch;
    }

    setLockMatch(match) {
        this.lockMatch = match;
    }

    setEmptySpace() {
        this.getLines().forEach((line, index) => {
            const { cellIndex } = line.setEmptySpace(this.n);
            if (cellIndex > -1) {
                this.move = { line: index, cell: cellIndex };
            }
        });
    }

    createSimpleArray(n) {
        return [...Array(n).keys()].map((i) => i + 1);
    }

    createBoard() {
        this.lines = this.createNewLines()
        this.setEmptySpace();
        this.setMove();
    }

    setMove() {
        this.getLines().forEach((line) => {
            line.setMove(this.move);
        });
    }

    createNewLines() {
        const cells = this.createCells()
        return this.createSimpleArray(this.n).map((line_) => {
            let groupCell = cells.splice(0, this.n);
            return new lineClass(line_ - 1, groupCell);
        });
    }

    createCells() {
        return this.createSimpleArray(this.n * this.n)
            .sort(() => 0.5 - Math.random())
            .map((c) => new cellClass(c));
    }

    setLayoutCell(cell, layout) {
        this.getLines().forEach((line) => {
            line.setLayoutCell(cell, layout);
        });
    }

    setLayoutLine(line, layout) {
        this.getLines().forEach((l) => {
            if (line.line === l.line) {
                line.setLayout(layout);
            }
        });
    }

    getCell(cellValue) {
        let index = null;
        const cellFilter = this.getLines().reduce((accu, curr) => {
            return [...accu, ...curr.getCells()];
        }, []).filter((c, i) => {
            if (c.cell === cellValue) {
                index = i;
                return true;
            }
        })[0];

        return { cellFilter, index }
    }

    getLine(cell) {
        let indexLine = null;
        let lineFilter = null;
        let cellFilter_ = null;
        let indexCell_ = null;
        this.getLines().forEach((line, index) => {
            const { cellFilter, indexCell } = line.getCell(cell);
            if (cellFilter) {
                lineFilter = line;
                indexLine = index;
                cellFilter_ = cellFilter;
                indexCell_ = indexCell;
            }
        })

        return { lineFilter, indexLine, cellFilter: cellFilter_, indexCell: indexCell_ }
    }

    getCellIsEmpty() {
        return this.getLines()[this.move.line].getCells()[this.move.cell];
    }

    checkBetweenRange(typeMove, move, match, approximation) {
        let isMatch = false;
        switch (typeMove) {
            case MOVE.DOWN:
                isMatch = move >= match - approximation;
                break;
            case MOVE.UP:
                isMatch = move <= match + approximation;
                break;
            case MOVE.LEFT:
                isMatch = move <= match + approximation;
                break;
            case MOVE.RIGHT:
                isMatch = move >= match - approximation;
                break;
            default:
                break;
        }
        return isMatch
    }
    
    checkThisIsMatchPosition(cellValue, x, y) {
        if (!this.getLockMatch()) {
            const cellIsEmpty = this.getCellIsEmpty();
            const layoutCellIsEmpty = cellIsEmpty.getLayout();
            const lineIsEmpty = this.getLine(cellIsEmpty).lineFilter.getLayout();
            
            const { cellFilter } = this.getCell(cellValue)
            const layout = cellFilter.getLayout();
            const line = this.getLine(cellFilter).lineFilter.getLayout();
            
            const xMove = layout.layout.x + x;
            const yMove = layout.layout.y + y + line.layout.y;
            const approximation = layout.layout.height * 0.45;
            let isMatch = false;
            if (cellFilter.move === MOVE.DOWN || cellFilter.move === MOVE.UP) {
                const yMatch = layoutCellIsEmpty.layout.y + lineIsEmpty.layout.y;
                isMatch = this.checkBetweenRange(cellFilter.move, yMove, yMatch, approximation);
            } else if (cellFilter.move === MOVE.LEFT || cellFilter.move === MOVE.RIGHT) {
                const xMatch = layoutCellIsEmpty.layout.x;
                isMatch = this.checkBetweenRange(cellFilter.move, xMove, xMatch, approximation);
            }
            this.setLockMatch(isMatch);

            if (isMatch) {
                this.handleMatch(cellValue);
            }
        }
    }

    async handleMatch(cell) {
        const valueCell = cell;
        this.getLines().forEach(line => {
            line.getCells().forEach(c => {
                switch (c.cell) {
                    case -1:
                        c.setCell(valueCell);
                        this.pushCellToRender(valueCell);
                        break;
                    case valueCell:
                        c.setCell(-1);
                        this.pushCellToRender(-1);
                        break;
                }
            });
        });

        this.reloadBoard();
    }

    setRenderCell(value, rederCell) {
        this.getLines().forEach(line => {
            line.getCells().forEach(c => {
                if (value === c.cell) {
                    c.setRederCell(rederCell);
                }
            });
        });
    }

    // getCellByValue(value) {
    //     const teste = this.getLines().reduce((accu, curr) => {
    //         return [...accu, ...curr.getCells()];
    //     }, [])
    //     .filter(c => c.cell === value)[0];
    //     return teste;
    // }

    getMove(cellValue) {
        if (cellValue) {
            const { cellFilter } = this.getCell(cellValue);
            return cellFilter.getMove();
        } else {

            return "";
        }
    }
}



export default BoardClass;