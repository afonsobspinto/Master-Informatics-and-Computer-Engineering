/**
 * Board class
 * @param scene
 */

class Board {
    constructor(scene) {
        this.scene = scene;
        this.board = new Array(8);
        for (let row = 0; row < 8; row++) {
            this.board[row] = new Array(8);
        }
        this._fillBoard();

    }

    _fillBoard() {
        for (let row = 0; row < 8; row++) {
            for (let col = 0; col < 8; col++) {
                let cellMaterial = (row % 2 == col % 2) ? this.scene.blackMaterial : this.scene.whiteMaterial;
                this.board[row][col] = new Cell(this.scene, row * -25, col * 25, null, null, cellMaterial);
            }
        }
    }

    updateBoard(newBoard) {
        
        for (let row = 0; row < 8; row++) {
            for (let col = 0; col < 8; col++) {
                this.board[row][col].update(newBoard[row][col]);
            }
        }
    }

    compareBoards(newBoard){
        var newPos;
        var oldPos;
        for (let row = 0; row < 8; row++) {
            for (let col = 0; col < 8; col++) {
                let cell = this.board[row][col];
                if (!cell.equals(newBoard[row][col])) {
                    (newBoard[row][col][0] == "none") ? oldPos = cell : newPos = [cell.x, cell.y];
                }
            }
        }
        return [oldPos, newPos];
    }


    /**
    * Displays the board
    */

    display() {
        this.scene.pushMatrix();
        this.scene.scale(0.1, 0.1, 0.1);
        this.scene.rotate(-Math.PI / 2, 1, 0, 0);
        for (let row = 0; row < 8; row++) {
            for (let col = 0; col < 8; col++) {
                this.board[row][col].display();
            }
        }
        this.scene.popMatrix();
    }

    _getPiecePosWithId(id) {
        for (let row = 0; row < 8; row++) {
            for (let col = 0; col < 8; col++) {
                if (this.board[row][col].id == id)
                    return new Vector2(row, col);
            }
        }
        return null;
    }

    at(Row, Col) {
        return this.board[Row][Col];
    }
}


