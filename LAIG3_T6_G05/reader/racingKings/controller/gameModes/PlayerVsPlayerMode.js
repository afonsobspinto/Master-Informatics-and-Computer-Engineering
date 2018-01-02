class PlayerVsPlayerMode extends Mode{
    constructor(game){
        super(game);
        this.game.humanTurn = true;
    }

    update(board, gameState, gameMode){
        if(this.game.getPausedFlag() === true) {
            this.game.move(board);
            this.game.viewReplay.addBoard(board);
            this.game.prologData.update(board, gameState, gameMode);
            this.game.updateTimers(gameState);
            this.game.updateStrength();
        }
    }
}