
class Game {
    constructor(scene, gameConfig) {
        this.scene = scene;
        this.gameConfig = gameConfig;
        this.gameHistory = [];
        this.client = new Client(this);
        this.board = new Board(this.scene);
        this.gameState = new WhiteToMoveState(this, scene);
        this.timer1 = new Timer(this.scene,0,this.gameConfig.getGameTimeout);
        this.timer2 = new Timer(this.scene,1,this.gameConfig.getGameTimeout);
        this.score = new Score(this.scene);
    }

    init() {
        this.client.startGame();
        
    }

    display() {
        if(this.client.getCommunicationOK){
            this.manageClick();
            this.board.display();
            this.timer1.display();
            this.timer2.display();
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
                        this.gameState.manageClick(pos);
                    }
                }
                this.scene.pickResults.splice(0, this.scene.pickResults.length);
            }
        }

        return 0;

    }

    get getGameConfig(){
        return this.gameConfig;
    }
}
