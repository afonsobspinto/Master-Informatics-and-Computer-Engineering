/**
 * Board class
 * @param scene
 */

class Board {
    constructor(scene, length) {
        this.scene = scene;
        this.length = length;
        this.board = new Array(this.length);
        for (let row = 0; row < this.length; row++) {
            this.board[row] = new Array(this.length);
        }
        this._fillBoard();

    }

    _fillBoard() {
        for (let row = 0; row < this.length; row++) {
            for (let col = 0; col < this.length; col++) {
                let cellMaterial = (row % 2 == col % 2) ? this.scene.blackMaterial : this.scene.whiteMaterial;
                this.board[row][col] = new Cell(this.scene, row * -25, col * 25, null, null, cellMaterial);
            }
        }
    }

    updateBoard(newBoard) {
        
        for (let row = 0; row < this.length; row++) {
            for (let col = 0; col < this.length; col++) {
                this.board[row][col].update(newBoard[row][col]);
            }
        }
    }

    compareBoards(newBoard){
        var newPos;
        var oldPos;
        for (let row = 0; row < this.length; row++) {
            for (let col = 0; col < this.length; col++) {
                let cell = this.board[row][col];
                if (!cell.equals(newBoard[row][col])) {
                    (newBoard[row][col][0] == "none") ? oldPos = cell : newPos = cell;
                }
            }
        }
        return [oldPos, newPos];
    }


    /**
    * Displays the board
    */

    display(translate) {
        this.scene.pushMatrix();
        if(translate){
            this.scene.translate(translate[0], translate[1], translate[2]);
        }
        this.scene.scale(0.1, 0.1, 0.1);
        this.scene.rotate(-Math.PI / 2, 1, 0, 0);
        for (let row = 0; row < this.length; row++) {
            for (let col = 0; col < this.length; col++) {
                this.board[row][col].display();
            }
        }
        this.scene.popMatrix();
    }

    _getPiecePosWithId(id) {
        for (let row = 0; row < this.length; row++) {
            for (let col = 0; col < this.length; col++) {
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


