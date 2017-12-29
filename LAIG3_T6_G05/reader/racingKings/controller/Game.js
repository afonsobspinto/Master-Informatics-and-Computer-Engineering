class Game {
    constructor(scene, gameConfig) {
        this.scene = scene;
        this.client = new Client();
        this.board = new Board(scene);
        this.counter = new Counter(scene);
        this.gameConfig = gameConfig;
        this.gameHistory = [];
    }

    display(){
        this.board.display();
        this.counter.display();
    }
  }
