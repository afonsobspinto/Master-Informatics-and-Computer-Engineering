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
        console.log(Array.from(serverBoard)); //Todo: Change this
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

}

