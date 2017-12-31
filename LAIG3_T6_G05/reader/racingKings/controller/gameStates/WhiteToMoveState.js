class WhiteToMoveState extends GameState {
    constructor(game, scene) {
        super(game, scene);
    }

    manageClick(pos) { // TODO: Só permitir selecionar brancas
        this.game.board.at(pos.x, pos.y).select();

        if (!this.pieceSelected) {
            this.pieceSelected = pos
        }
        else {
            if (this.pieceSelected.equals(pos)){
                this.pieceSelected = null;
            }
            else {
                this._makeMove(pos);
            }
        }
    }

    _resetSelectedPieces(pos) {
        this.game.board.at(pos.x, pos.y).select();
        this.game.board.at(this.pieceSelected.x, this.pieceSelected.y).select();
        this.pieceSelected = null;
    }

    _makeMove(oldPos) {
        this.game.client.makeMove(this.pieceSelected, oldPos);
        this._resetSelectedPieces(oldPos);
    }
}