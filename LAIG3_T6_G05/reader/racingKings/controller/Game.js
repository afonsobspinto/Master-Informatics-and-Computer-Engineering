class Game {
    constructor(scene, gameConfig) {
        this.scene = scene;
        this.gameConfig = gameConfig;
        this.gameHistory = [];
        this.client = new Client(this);
    }

    init() {
        this.client.startGame();
        this.board = new Board(this.scene);
    }

    display() {
        if(this.client.getCommunicationOK)
            this.board.display();
    }

    get getGameConfig(){
        return this.gameConfig;
    }
}
