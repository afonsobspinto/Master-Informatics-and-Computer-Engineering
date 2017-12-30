/**
 * Cell class
 * @param scene
 * @param x
 * @param y
 * @param type
 * @param color
 */

function Cell(scene, x, y, type, color){
    this.scene = scene;
    this.x = x;
    this.y = y;
    this.type = type;
    this.piece = makeView(this.scene, type);
    this.material = (color === Color.BLACK) ? this.scene.blackMaterial : this.scene.whiteMaterial;
}

/**
 * Displays the cells
 */
Cell.prototype.display = function() {
    if(this.type !== null) {
        this.scene.pushMatrix();
        this.scene.translate(77.5, -87.5, 0);
        this.scene.translate(this.x, this.y, 0);
        this.material.apply();
        this.piece.display();
        this.scene.popMatrix();
    }

};

/**
 * Updates the cell
 * @param  time
 */
Cell.prototype.update = function(time){



};