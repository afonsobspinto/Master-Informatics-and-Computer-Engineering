class PlayerVsBotMode extends Mode{
    constructor(game){
        super(game);
        this.game.humanTurn = true;
    }

    update(board, gameState, gameMode) {
        if (this.game.getPausedFlag() === 0) {
            this.game.board.updateBoard(board);
            this.game.gameHistory.push(board);
            this.game.prologData.update(board, gameState, gameMode);
            this.game.updateTimers(gameState);
            this.game.updateStrength();
            if (this.humanTurn) {
                this.humanTurn = false;
                this.game.client.botMove();
            }
            else {
                this.humanTurn = true;
            }
        }
    }
}