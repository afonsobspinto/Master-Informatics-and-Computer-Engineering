
class Game {
    constructor(scene, gameConfig) {
        this.scene = scene;
        this.gameConfig = gameConfig;
        this._initGameMode();
        this.client = new Client(this);
        this.prologData = new PrologData();
        this.board = new Board(this.scene, 8, true, [0,0]);
        this.sideBoard = new Board(this.scene, 4, false, [-53, -140]);
        this.pieceSelected = null;
        this.timerWhite = new Timer(this.scene, 0, this.gameConfig.getGameTimeout);
        this.timerBlack = new Timer(this.scene, 1, this.gameConfig.getGameTimeout);
        this.score = new Score(this.scene);
        this.flagPaused = true;
        this.viewReplay = new ViewReplay(this.scene);
        this.finished = false;
    }

    _initGameMode() {
        switch (this.gameConfig.getGameMode) {
            case 0:
                this.gameMode = new PlayerVsPlayerMode(this);
                break;
            case 1:
                this.gameMode = new PlayerVsBotMode(this);
                break;
            case 2:
                this.gameMode = new BotVsBotMode(this);
                break;
            default:
                this.gameMode = null;
                break;
        }
    }
    init() {
        this.client.startGame();
    }


    display() {
        if (this.client.getCommunicationOK) {
            if (this.viewReplay.active) {
                this.viewReplay.display();
                this.finished = true;
            }
            else {
                if (this.finished) {
                    return this.finished;
                }
                if (this.humanTurn) {
                    this.manageClick();
                }
                this.board.display();
                this.sideBoard.display();
                this.timerWhite.display();
                this.timerBlack.display();
                this.score.display();
                this.checkTime();
                if (this._displayWinner()) {
                    this.viewReplay.activate();
                }
            }
        }
        return false;
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

    _manageClickAux(pos) {
        this.board.at(pos.x, pos.y).select();

        if (!this.pieceSelected) {
            this.pieceSelected = pos
        }
        else {
            if (this.pieceSelected.equals(pos)) {
                this.pieceSelected = null;
            }
            else {
                this.client.makeMove(this.pieceSelected, pos);
                this._resetSelectedPieces(pos);
            }
        }
    }

    checkTime() {
        if (this.timerWhite.getCount() === 0)
            this.prologData.gameState = 'blackVictorious';
        else if (this.timerBlack.getCount() === 0)
            this.prologData.gameState = 'whiteVictorious';
    }

    updateStrength() {
        this.client.getStrength();
    }

    move(board) {
        let piece = this.board.move(board);

        if (piece) {
            if (piece.type) {
                this.viewReplay.addPiece(piece.clone());
                this.sideBoard.kill(piece);
            }
            else{
                this.viewReplay.addPiece(null);
            }
        }
        else{
            this.viewReplay.addPiece(null);
        }
    }

    undo() {
        let history = this.viewReplay.getBoards();
        if (history.length > 2) {
            if (this.prologData.getGameState === "blackToMove") {
                this.board.move(history[history.length - 2]);
                this.sideBoard.deleteLastPiece();
                this.prologData.setGameState("whiteToMove");
                this.prologData.setBoard(history[history.length - 2]);
                this.viewReplay.removeLastBoard();
            }
            else {
                this.board.move(history[history.length - 2]);
                this.sideBoard.deleteLastPiece();
                this.prologData.setGameState("blackToMove");
                this.prologData.setBoard(history[history.length - 2]);
                this.viewReplay.removeLastBoard();
            }
        }
        else
            alert("Nothing to undo");

    }

    resumeGame() {
        let gameState = this.prologData.getGameState;
        if (gameState === "whiteToMove") {
            if (this.flagPaused === true) {
                this.timerWhite.stop();
                this.flagPaused = false;
            }
            else {
                this.timerWhite.update();
                this.flagPaused = true;
            }
        }
        else if (gameState === "blackToMove") {
            if (this.flagPaused === true) {
                this.timerBlack.stop();
                this.flagPaused = false;
            }
            else {
                this.timerBlack.update();
                this.flagPaused = true;
            }
        }
    }

    updateTimers(gameState) {
        if (gameState == "whiteToMove") {
            this.timerBlack.stop();
            this.timerWhite.update();
        }
        else if (gameState == "blackToMove") {
            this.timerWhite.stop();
            this.timerBlack.update();
        }
        else {
            this.timerWhite.reset();
            this.timerBlack.reset();
        }
    }

    _displayWinner() {
        let gameState = this.prologData.getGameState;
        switch (gameState) {
            case 'tie':
                window.alert("# Game over. We got a tie, good game!");
                break;
            case 'blackVictorious':
                window.alert("# Game over. Black player won, congratulations!'");
                break;
            case 'whiteVictorious':
                window.alert("# Game over. White player won, congratulations!");
                break;
            default:
                return false;
        }
        return true;
    }

    _resetSelectedPieces(pos) {
        this.board.at(pos.x, pos.y).select();
        this.board.at(this.pieceSelected.x, this.pieceSelected.y).select();
        this.pieceSelected = null;
    }

    get getGameConfig() {
        return this.gameConfig;
    }

    get getPrologData() {
        return this.prologData;
    }

    get getGameMode() {
        return this.gameMode;
    }

    getPausedFlag() {
        return this.flagPaused;
    }

    get getScore() {
        return this.score;
    }

    get getGameHistory() {
        return this.gameHistory;
    }
}
