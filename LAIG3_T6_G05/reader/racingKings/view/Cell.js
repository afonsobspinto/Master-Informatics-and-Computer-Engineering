/**
 * Cell class
 * @param scene
 * @param x
 * @param y
 * @param type
 * @param colour
 */
function Cell(scene, x, y, type, colour){
    this.scene = scene;
    this.x = x;
    this.y = y;
    this.type = type;
    this.colour = colour;

    this.material = this.scene.blackMaterial;
  /*  if (this.colour === 1)
        this.material = this.scene.blackMaterial;*/

    if (type === 'king')
        this.piece = new Obj(this.scene, 'scenes/pieces/King.obj');
    else if (type === 'queen')
        this.piece = new Obj(this.scene, 'scenes/pieces/Queen.obj');
    else if (type === 'bishop')
        this.piece = new Obj(this.scene, 'scenes/pieces/Bishop.obj');
    else if (type === 'horse')
        this.piece = new Obj(this.scene, 'scenes/pieces/Horse.obj');
    else if (type === 'rook')
        this.piece = new Obj(this.scene, 'scenes/pieces/Rook.obj');
    else
        this.piece = null;
}


Cell.prototype.display = function() {
    if(this.type !== null) {
        this.scene.pushMatrix();
        if (this.type === 'horse')
            this.scene.rotate(Math.PI, 0, 0, 1);
        this.scene.translate(this.x, this.y, 0);
        //this.material.apply();
        this.piece.display();
        this.scene.popMatrix();
    }
};