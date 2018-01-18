class BotVsBotMode extends Mode{
    constructor(game){
        super(game);
        this.game.humanTurn = false;
    }

    update(board, gameState, gameMode) {
        if (this.game.getPausedFlag() === true) {
            this.game.move(board);
            this.game.viewReplay.addBoard(board);
            this.game.prologData.update(board, gameState, gameMode);
            this.game.updateTimers(gameState);
            this.game.updateStrength();
            this.game.client.botMove();
        }
    }
}