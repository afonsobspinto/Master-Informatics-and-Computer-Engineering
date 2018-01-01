class BotVsBotMode extends Mode{
    constructor(game){
        super(game);
        this.game.humanTurn = false;
    }

    update(board, gameState, gameMode){
        this.game.board.updateBoard(board);
        this.game.gameHistory.push(board);
        this.game.prologData.update(board, gameState, gameMode);
        this.game.updateTimers(gameState);
        this.game.client.botMove();
    }
}