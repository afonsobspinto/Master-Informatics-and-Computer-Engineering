class Game {
    constructor(scene, gameConfig) {
        this.scene = scene;
        this.gameConfig = gameConfig;
        this.gameHistory = [];
        this.client = new Client(this);
        this.board = new Board(this.scene);
    }

    init() {
        this.client.startGame();
    }

    display() {
        if(this.client.getCommunicationOK){
            this.board.logPicking();
            this.board.display();
        }
    }

    get getGameConfig(){
        return this.gameConfig;
    }
}
