/**
 * Board class
 * @param scene
 */

class Board {
    constructor(scene, length, selectable, translation) {
        this.scene = scene;
        this.length = length;
        this.selectable = selectable;
        this.translation = translation;
        this.board = new Array(this.length);
        for (let row = 0; row < this.length; row++) {
            this.board[row] = new Array(this.length);
        }
        this._fillBoard();
        this.index = 0;

    }

    _fillBoard() {
        for (let row = 0; row < this.length; row++) {
            for (let col = 0; col < this.length; col++) {
                let cellMaterial = (row % 2 == col % 2) ? this.scene.blackMaterial : this.scene.whiteMaterial;
                this.board[row][col] = new Cell(this.scene, row * -25 + this.translation[0], col * 25 + this.translation[1], null, null, cellMaterial, this.selectable);
            }
        }
    }

    move(board){
        let newBoard = JSON.parse(board).reverse();
        var posArray = this.compareBoards(newBoard);
        if (posArray[0]) {
            posArray[0].move(posArray[1]);
            var board = this;
            setTimeout(function () {
                board.updateBoard(newBoard);
            }, 510);
            return posArray[1];
        }

        else { this.updateBoard(newBoard); }

        return null;
    }

    kill(piece){
        var destination = this._getDestination();
        destination.set(piece);
        this.index++;

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

    display() {
        this.scene.pushMatrix();
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

    _getDestination(){
        return this.board[this.index % this.length][this.index / this.length];
    }
}


