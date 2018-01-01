
class Game {
    constructor(scene, gameConfig) {
        this.scene = scene;
        this.gameConfig = gameConfig;
        this._initGameMode();
        this.gameHistory = [];
        this.client = new Client(this);
        this.prologData = new PrologData();
        this.board = new Board(this.scene);
        this.pieceSelected = null;
        this.timerWhite = new Timer(this.scene, 0, this.gameConfig.getGameTimeout);
        this.timerBlack = new Timer(this.scene, 1, this.gameConfig.getGameTimeout);
        this.score = new Score(this.scene);
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
            if (this.humanTurn) {
                this.manageClick();
            }
            this.board.display();
            this.timerWhite.display();
            this.timerBlack.display();
            this.score.display();
            return this._displayWinner();
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
}
