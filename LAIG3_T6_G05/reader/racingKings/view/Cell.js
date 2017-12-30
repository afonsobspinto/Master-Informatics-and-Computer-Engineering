/**
 * Cell class
 * @param scene
 * @param x
 * @param y
 * @param type
 * @param pieceColor
 */

var staticID = 0;

function Cell(scene, x, y, type, pieceColor, cellMaterial) {
    this.scene = scene;
    this.x = x;
    this.y = y;
    this.type = type;
    this.piece = makeView(this.scene, type);
    this.cell = new MyRectangle(this.scene, new Vector2(0, 25), new Vector2(25, 0));
    this.id = ++staticID;
    this.cellMaterial = cellMaterial;
    this.pieceMaterial = (pieceColor === Color.BLACK) ? this.scene.blackMaterial : this.scene.whiteMaterial;
}

/**
 * Displays the cells
 */
Cell.prototype.display = function () {

    this.scene.pushMatrix();
    this.scene.translate(80, -87.5, 0);
    this.scene.translate(this.x, this.y, 0);
    this.cellMaterial.apply();
    this.scene.registerForPick(this.id, this.cell);
    this.cell.display();
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
Cell.prototype.update = function (time) {



};