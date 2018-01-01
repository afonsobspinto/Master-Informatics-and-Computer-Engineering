
class Game {
    constructor(scene, gameConfig) {
        this.scene = scene;
        this.gameConfig = gameConfig;
        this.gameHistory = [];
        this.client = new Client(this);
        this.prologData = new PrologData();
        this.board = new Board(this.scene);
        this.pieceSelected = null;
        this.timerWhite = new Timer(this.scene,0,this.gameConfig.getGameTimeout);
        this.timerBlack = new Timer(this.scene,1,this.gameConfig.getGameTimeout);
        this.score = new Score(this.scene);
    }

    init() {
        this.client.startGame();
    }

    display() {
        if(this.client.getCommunicationOK){
            this.manageClick();
            this.board.display();
            this.timerWhite.display();
            this.timerBlack.display();
            this.score.display();
        }
    }

    manageClick() {
        if (this.scene.pickMode === false) {
            var selection = 0;
            if (this.scene.pickResults !== null && this.scene.pickResults.length > 0) {
                for (var i = 0; i < this.scene.pickResults.length; i++) {
                    var obj = this.scene.pickResults[i][0];
                    if (obj) {
                        var customId = this.scene.pickResults[i][1];
                        var pos = this.board._getPiecePosWithId(customId);
                        console.log("Picked object: " + obj + ", with pick id " + customId + " at pos " + pos.x + " " + pos.y);
                        this._manageClickAux(pos);
                    }
                }
                this.scene.pickResults.splice(0, this.scene.pickResults.length);
            }
        }

        return 0;

    }

    _manageClickAux(pos){
        this.board.at(pos.x, pos.y).select();

        if (!this.pieceSelected) {
            this.pieceSelected = pos
        }
        else {
            if (this.pieceSelected.equals(pos)){
                this.pieceSelected = null;
            }
            else {
                this.client.makeMove(this.pieceSelected, pos);
                this._resetSelectedPieces(pos);
            }
        }
    }

    update(board, gameState, gameMode){
        this.gameHistory.push(board);
        this.prologData.update(board, gameState, gameMode);
        this.board.updateBoard(board);
        this._updateTimers(gameState);
    }

    _updateTimers(gameState){
        if(gameState == "whiteToMove"){
            this.timerBlack.stop();
            this.timerWhite.update();
        } 
        else{
            this.timerWhite.stop();
            this.timerBlack.update();
        }
    }
    _resetSelectedPieces(pos) {
        this.board.at(pos.x, pos.y).select();
        this.board.at(this.pieceSelected.x, this.pieceSelected.y).select();
        this.pieceSelected = null;
}

    get getGameConfig(){
        return this.gameConfig;
    }

    get getPrologData(){
        return this.prologData;
    }
}
