class WhiteToMoveState extends GameState{
    constructor(game, scene){
        super(game, scene);
        }

    manageClick(pos){
        this.game.board.at(pos.x, pos.y).select();
    }
}