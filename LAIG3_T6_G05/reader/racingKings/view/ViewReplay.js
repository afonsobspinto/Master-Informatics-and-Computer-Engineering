class ViewReplay {
    constructor(scene, game) {
        this.game = game;
        this.scene = scene;
        this.boards = [];
        this.active = false;
        this.displayBoard = new Board(this.scene, 8, false, [0,0]);
    }

    addBoard(board) {
        this.boards.push(board);
    }

    display() {
        this.displayBoard.display(null);
    }

    activate() {
        this.active = true;
        var replay = this;
        setInterval(function(){
            if (replay.replayIndex > replay.boards.length - 1) {
                replay.active = false;
            }
            else {
                replay.displayBoard.move(replay.boards[replay.replayIndex]);
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