class PlayerVsPlayerMode extends Mode{
    constructor(game){
        super(game);
    }

    update(board, gameState, gameMode){
        this.game.gameHistory.push(board);
        this.game.prologData.update(board, gameState, gameMode);
        this.game.board.updateBoard(board);
        this.game.updateGameState(gameState);
        this.game.updateTimers(gameState);
    }
}