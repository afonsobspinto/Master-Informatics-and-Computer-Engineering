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
                this.board[row][col] = new Cell(this.scene, row * -25, col * 25, null, null);
            }
        }
    }

    updateBoard(serverBoard){
        let boardArray = JSON.parse(serverBoard);
        boardArray.reverse();
        console.log(boardArray);
        for (let row = 0; row < 8; row++) {
            for (let col = 0; col < 8; col++) {
                let arrayType = boardArray[row][col][0];
                let type = null;
                if(arrayType === 'King') type = Piece.KING;
                else if(arrayType === 'Queen') type = Piece.QUEEN;
                else if(arrayType === 'Bishop') type = Piece.BISHOP;
                else if(arrayType === 'Knight') type = Piece.KNIGHT;
                else if(arrayType === 'Rook') type = Piece.ROOK;
                let color = boardArray[row][col][1] === 'White' ? Color.WHITE : Color.BLACK;
                this.board[row][col] = new Cell(this.scene, row * -25, col * 25, type, color);
            }
        }
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

    logPicking() {
        if (this.scene.pickMode === false) {
            var selection = 0;
            if (this.scene.pickResults !== null && this.scene.pickResults.length > 0) {
                for (var i = 0; i < this.scene.pickResults.length; i++) {
                    var obj = this.scene.pickResults[i][0];
                    if (obj) {
                        var customId = this.scene.pickResults[i][1];
                        console.log("Picked object: " + obj + ", with pick id " + customId);

                    }
                }
                this.scene.pickResults.splice(0, this.scene.pickResults.length);
            }
        }

        return 0;

    }
}

