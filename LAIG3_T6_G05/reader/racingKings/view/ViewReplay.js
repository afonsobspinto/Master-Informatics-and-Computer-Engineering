class ViewReplay{
    constructor(scene, game){
        this.game = game;
        this.scene = scene;
        this.boards = [];
        this.active = false;
        this.displayBoard = new Board(this.scene, 8);
    }

    addBoard(board){
        this.boards.push(board);
    }

    update(currTime){
        if(this.replayIndex > this.boards.length-1){
            this.active = false;
            this.scene.setUpdatePeriod(10);
        }
        else{
            this.displayBoard.move(this.boards[this.replayIndex]);
            this.replayIndex++;
        }
    }

    display(){
        this.displayBoard.display(null);
        
        if(!this.active)
            console.log(!this.active);
        return !this.active;
    }

    activate(){
        this.active = true;
        this.scene.setUpdatePeriod(1000);
        this.replayIndex = 0;
    }
}