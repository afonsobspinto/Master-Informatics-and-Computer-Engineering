/**
 * Cell class
 * @param scene
 * @param x
 * @param y
 * @param type
 * @param pieceColor
 */

var staticID = 0;

function Cell(scene, x, y, type, pieceMaterial, cellMaterial) {
    this.scene = scene;
    this.x = x;
    this.y = y;
    this.type = type;
    this.piece = makeView(this.scene, type);
    this.cell = new MyRectangle(this.scene, new Vector2(0, 25), new Vector2(25, 0));
    this.id = ++staticID;
    this.cellMaterial = cellMaterial;
    this.pieceMaterial = pieceMaterial;
}

/**
 * Displays the cells
 */
Cell.prototype.display = function () {

    this.scene.pushMatrix();
    this.scene.translate(80, -87.5, 0);
    this.scene.translate(this.x, this.y, 0);
    this.scene.pushMatrix();
    this.scene.translate(-5, -12.5, 1);
    this.cellMaterial.apply();
    this.scene.registerForPick(this.id, this.cell);
    this.cell.display();
    this.scene.popMatrix();
    if (this.type) {
        this.pieceMaterial.apply();
        this.piece.display();
    }
    this.scene.popMatrix();
}


/**
 * Updates the cell
 * @param  time
 */
Cell.prototype.update = function (pieceArray) {
    this.type = this._getType(pieceArray);
    this.pieceMaterial = this._getPieceMaterial(pieceArray);
    this.piece = makeView(this.scene, this.type);
};

Cell.prototype._getPieceMaterial = function (pieceArray) {
    var pieceColor = pieceArray[1];

    switch (pieceColor) {
        case 'White':
            return this.scene.whiteMaterial;
        case 'Black':
            return this.scene.blackMaterial
        default:
            return null;
    }
}


Cell.prototype._getType = function (pieceArray) {
    var pieceType = pieceArray[0];
    switch (pieceType) {
        case 'King':
            return Piece.KING;
        case 'Queen':
            return Piece.QUEEN;
        case 'Bishop':
            return Piece.BISHOP;
        case 'Knight':
            return Piece.KNIGHT;
        case 'Rook':
            return Piece.ROOK;
        default:
            return null;
    }
}

