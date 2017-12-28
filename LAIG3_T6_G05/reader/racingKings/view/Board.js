/**
 * Board class
 * @param scene
 */
function Board(scene){
        this.scene = scene;

        this.board = [
            new Array(8),
            new Array(8),
            new Array(8),
            new Array(8),
            new Array(8),
            new Array(8),
            new Array(8),
            new Array(8),
        ];

        this.setBoard();
}

/**
 * Sets the board
 */
Board.prototype.setBoard = function(){
    for(let i = 0; i<6; i++){
        for(let j = 0; j<8; j++){
            this.board[i][j] = new Cell(this.scene, i*20, j*20, null, 0);
        }
    }
    this.board[6][0] = new Cell(this.scene, 55, -87.5, 'king', 1);
    this.board[6][1] = new Cell(this.scene, 82.5, -87.5, 'queen', 1);
    this.board[6][2] = new Cell(this.scene, 55, -65, 'rook', 1);
    this.board[6][3] = new Cell(this.scene, 80, -65, 'rook', 1);
    this.board[6][4] = new Cell(this.scene, 50, -41, 'bishop', 1);
    this.board[6][5] = new Cell(this.scene, 77.5, -41, 'bishop', 1);
    this.board[6][6] = new Cell(this.scene, -67.5, 10, 'horse', 1);
    this.board[6][7] = new Cell(this.scene, -95, 10, 'horse', 1);
    this.board[7][0] = new Cell(this.scene, 55, 87.5, 'king', 0);
    this.board[7][1] = new Cell(this.scene, 82.5, 87.5, 'queen', 0);
    this.board[7][2] = new Cell(this.scene, 55, 60, 'rook', 0);
    this.board[7][3] = new Cell(this.scene, 80, 60, 'rook', 0);
    this.board[7][4] = new Cell(this.scene, 50, 33.5, 'bishop', 0);
    this.board[7][5] = new Cell(this.scene, 77.5, 33.5, 'bishop', 0);
    this.board[7][6] = new Cell(this.scene, -67.5, -15, 'horse', 0);
    this.board[7][7] = new Cell(this.scene, -95, -15, 'horse', 0);
};

/**
 * Displays the board
 */
Board.prototype.display = function() {
        this.scene.pushMatrix();
        this.scene.scale(0.1, 0.1, 0.1);
        this.scene.rotate(-Math.PI / 2, 1, 0, 0);
        for(let i = 0; i<8; i++){
            for(let j = 0; j<8; j++){
                this.board[i][j].display();
            }
        }
        this.scene.popMatrix();

};
