/**
 * MyScene class, contains the scene objects
 * @param {CGFscene} scene
 */
function MyScene(scene) {

    this.scene = scene;

    this.init();

}

/**
 * Loads the objects
 */
MyScene.prototype.init = function() {

    this.BlackKing = new Obj(this.scene, 'scenes/pieces/chessBlackKing.obj');
    this.BlackQueen = new Obj(this.scene, 'scenes/pieces/chessBlackQueen.obj');
    this.BlackBishop = new Obj(this.scene, 'scenes/pieces/chessBlackBishop.obj');
    this.BlackHorse = new Obj(this.scene, 'scenes/pieces/chessBlackHorse.obj');
    this.BlackRook = new Obj(this.scene, 'scenes/pieces/chessBlackRook.obj');
    this.WhiteKing = new Obj(this.scene, 'scenes/pieces/chessWhiteKing.obj');
    this.WhiteQueen = new Obj(this.scene, 'scenes/pieces/chessWhiteQueen.obj');
    this.WhiteBishop = new Obj(this.scene, 'scenes/pieces/chessWhiteBishop.obj');
    this.WhiteHorse = new Obj(this.scene, 'scenes/pieces/chessWhiteHorse.obj');
    this.WhiteRook = new Obj(this.scene, 'scenes/pieces/chessWhiteRook.obj');
};

/**
 * Display the current scene.
 *
 * @method display
 *
 */

MyScene.prototype.display = function() {

    this.scene.pushMatrix();
        this.scene.scale(0.1, 0.1, 0.1);
        this.scene.rotate(-Math.PI / 2, 1, 0, 0);

        this.scene.pushMatrix();
            this.scene.translate(55, -87.5, 0);
            this.BlackKing.display();
        this.scene.popMatrix();
        this.scene.pushMatrix();
            this.scene.translate(82.5, -87.5, 0);
            this.BlackQueen.display();
        this.scene.popMatrix();
        this.scene.pushMatrix();
            this.scene.translate(55, -65, 0);
            this.BlackRook.display();
        this.scene.popMatrix();
        this.scene.pushMatrix();
            this.scene.translate(80, -65, 0);
            this.BlackRook.display();
        this.scene.popMatrix();
        this.scene.pushMatrix();
            this.scene.translate(50, -41, 0);
            this.BlackBishop.display();
        this.scene.popMatrix();
        this.scene.pushMatrix();
            this.scene.translate(77.5, -41, 0);
            this.BlackBishop.display();
        this.scene.popMatrix();
        this.scene.pushMatrix();
            this.scene.rotate(Math.PI, 0, 0, 1);
            this.scene.translate(-67.5, 10, 0);
            this.BlackHorse.display();
        this.scene.popMatrix();
        this.scene.pushMatrix();
            this.scene.rotate(Math.PI, 0, 0, 1);
            this.scene.translate(-95, 10, 0);
            this.BlackHorse.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
            this.scene.translate(57.5, 80, 0);
            this.WhiteKing.display();
        this.scene.popMatrix();
        this.scene.pushMatrix();
            this.scene.translate(82.5, 80, 0);
            this.WhiteQueen.display();
        this.scene.popMatrix();
        this.scene.pushMatrix();
            this.scene.translate(55, 61, 0);
            this.WhiteRook.display();
        this.scene.popMatrix();
        this.scene.pushMatrix();
            this.scene.translate(82.5, 61, 0);
            this.WhiteRook.display();
        this.scene.popMatrix();
        this.scene.pushMatrix();
            this.scene.translate(57.5, 33.5, 0);
            this.WhiteBishop.display();
        this.scene.popMatrix();
        this.scene.pushMatrix();
            this.scene.translate(85, 33.5, 0);
            this.WhiteBishop.display();
        this.scene.popMatrix();
        this.scene.pushMatrix();
            this.scene.rotate(Math.PI, 0, 0, 1);
            this.scene.translate(-57.5, -15, 0);
            this.WhiteHorse.display();
        this.scene.popMatrix();
        this.scene.pushMatrix();
            this.scene.rotate(Math.PI, 0, 0, 1);
            this.scene.translate(-85, -15, 0);
            this.WhiteHorse.display();
        this.scene.popMatrix();
    this.scene.popMatrix();

};