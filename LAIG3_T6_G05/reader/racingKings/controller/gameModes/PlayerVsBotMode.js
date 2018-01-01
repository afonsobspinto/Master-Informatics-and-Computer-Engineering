class PlayerVsBotMode extends Mode{
    constructor(game){
        super(game);
        this.game.humanTurn = true;
    }

    update(board, gameState, gameMode){
        this.game.gameHistory.push(board);
        this.game.prologData.update(board, gameState, gameMode);
        this.game.board.updateBoard(board);
        this.game.updateGameState(gameState);
        this.game.updateTimers(gameState);
        if(this.humanTurn){
            this.humanTurn = false;
            this.game.client.botMove();
        }
        else{
            this.humanTurn = true;
        }
    }
}