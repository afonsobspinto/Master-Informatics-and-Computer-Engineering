class ViewReplay {
    constructor(scene, game) {
        this.game = game;
        this.scene = scene;
        this.boards = [];
        this.deadPieces = [];
        this.active = false;
        this.displayBoard = new Board(this.scene, 8, false, [0,0]);
        this.sideBoard = new Board(this.scene, 4, false, [-53, -140]);
    }

    addBoard(board) {
        this.boards.push(board);
    }

    addPiece(piece){
        this.deadPieces.push(piece);
    }

    display() {
        this.displayBoard.display(null);
        this.sideBoard.display(null);
    }

    activate() {
        this.active = true;
        var replay = this;
        console.log(this.deadPieces);
        setInterval(function(){
            if (replay.replayIndex > replay.boards.length - 1) {
                replay.active = false;
            }
            else {
                replay.displayBoard.move(replay.boards[replay.replayIndex], 0.5);
                replay.sideBoard.kill(replay.deadPieces[replay.replayIndex], 0.4);
                replay.replayIndex++;
            }}, 1000);
        this.replayIndex = 0;
    }

    getBoards(){
        return this.boards;
    }

    removeLastBoard(){
        let index = this.boards.length - 1;
        this.boards.splice(index, 1);
    }
}