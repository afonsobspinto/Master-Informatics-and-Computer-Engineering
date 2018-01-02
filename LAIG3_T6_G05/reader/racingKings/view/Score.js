/**
 * Score class
 * @param scene
 */
function Score(scene){
    this.scene = scene;

    this.unitsCounter = 0;
    this.dozensCounter = 0;
    this.hundredsCounter = 0;
    this.thousandsCounter = 0;

    this.realScore = 0;
    this.dash = new Obj(this.scene, 'scenes/pieces/dash.obj');

    this.units = new Obj(this.scene, 'scenes/pieces/0.obj');
    this.dozens = new Obj(this.scene, 'scenes/pieces/0.obj');
    this.hundreds = new Obj(this.scene, 'scenes/pieces/0.obj');
    this.thousands = new Obj(this.scene, 'scenes/pieces/0.obj');
}

Score.prototype = Object.create(CGFobject.prototype);
Score.prototype.constructor = Score;

/**
 * Updates the score
 * @param score
 */
Score.prototype.update = function(score) {

    this.realScore = score;
    if(score < 0){
        score = 0 - score;
    }
    this.unitsCounter = Math.abs(score % 10);
    this.dozensCounter = Math.abs(Math.floor((score / 10) % 10));
    this.hundredsCounter = Math.abs(Math.floor((score / 100) % 10));
    this.thousandsCounter = Math.abs(Math.floor((score / 1000) % 10));

    this.units = new Obj(this.scene, 'scenes/pieces/' + this.unitsCounter + '.obj');
    this.dozens = new Obj(this.scene, 'scenes/pieces/' + this.dozensCounter  + '.obj');
    this.hundreds = new Obj(this.scene, 'scenes/pieces/' + this.hundredsCounter + '.obj');
    this.thousands = new Obj(this.scene, 'scenes/pieces/' + this.thousandsCounter + '.obj');
};

/**
 * Displays the counter
 */
Score.prototype.display = function() {

    this.scene.pushMatrix();
        this.scene.whiteMaterial.apply();
        this.scene.scale(0.1, 0.1, 0.1);
        if(this.realScore < 0){
            this.scene.pushMatrix();
                this.scene.translate(50, 50, -150);
                this.dash.display();
            this.scene.popMatrix();
        }
        this.scene.pushMatrix();
            this.scene.translate(150, 50, -150);
            this.units.display();
        this.scene.popMatrix();
        this.scene.pushMatrix();
            this.scene.translate(125, 50, -150);
            this.dozens.display();
        this.scene.popMatrix();
        this.scene.pushMatrix();
            this.scene.translate(100, 50, -150);
            this.hundreds.display();
        this.scene.popMatrix();
        this.scene.pushMatrix();
            this.scene.translate(75, 50, -150);
            this.thousands.display();
        this.scene.popMatrix();
    this.scene.popMatrix();

};