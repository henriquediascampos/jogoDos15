import MOVE from './EMove';

export default class cellClass {
    constructor(cell, move, layout, x, y) {
        this.cell = cell;
        this.move = move;
        this.layout = layout;
        this.x = x;
        this.y = y;
        this.rederCell = 0;
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

    setRederCell(rederCell) {
        this.rederCell = rederCell;
    }

    render() {
        this.rederCell(this.cell);
    }

    setMove(indexEmptyCellSpace, indexCurrentCell, move) {
        this.move = null;
        if (move === MOVE.MOVE_HORIZONTAL) {
            if (indexEmptyCellSpace === indexCurrentCell + 1) {
                this.move = MOVE.RIGHT;
            } else if (indexEmptyCellSpace === indexCurrentCell - 1) {
                this.move = MOVE.LEFT;
            }
        } else if (move === MOVE.UP) {
            if (indexEmptyCellSpace === indexCurrentCell) {
                this.move = MOVE.UP;
            }
        } else if (move === MOVE.DOWN) {
            if (indexEmptyCellSpace === indexCurrentCell) {
                this.move = MOVE.DOWN;
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
}
