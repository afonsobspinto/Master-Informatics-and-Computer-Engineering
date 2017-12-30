const GameState = {
    WhiteToSelectPos: 0,
    WhiteToSelectNewPos: 1,
    BlackToSelectPos: 2,
    BlackToSelectNewPos: 3
}

class Game {
    constructor(scene, gameConfig) {
        this.scene = scene;
        this.gameConfig = gameConfig;
        this.gameHistory = [];
        this.client = new Client(this);
        this.board = new Board(this.scene);
        this.gameState = GameState.WhiteToSelectPos;
    }

    init() {
        this.client.startGame();
    }

    display() {
        if(this.client.getCommunicationOK){
            this.board.manageClick();
            this.board.display();
        }
    }

    get getGameConfig(){
        return this.gameConfig;
    }
}
