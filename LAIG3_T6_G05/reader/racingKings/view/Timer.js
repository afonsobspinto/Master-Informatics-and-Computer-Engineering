/**
 * Timer class
 * @param scene
 */
function Timer(scene){
    this.scene = scene;

    this.unitsSecondsCounter = 0;
    this.dozensSecondsCounter = 0;
    this.unitsMinutesCounter = 0;
    this.dozensMinutesCounter = 0;

    this.unitsSeconds = new Obj(this.scene, 'scenes/pieces/0.obj');
    this.dozensSeconds = new Obj(this.scene, 'scenes/pieces/0.obj');
    this.unitsMinutes = new Obj(this.scene, 'scenes/pieces/0.obj');
    this.dozensMinutes = new Obj(this.scene, 'scenes/pieces/0.obj');
}

Timer.prototype = Object.create(CGFobject.prototype);
Timer.prototype.constructor = Timer;

/**
 * Updates the timer
 * @param time
 */
Timer.prototype.update = function() {

    if(this.unitsSecondsCounter + 1 < 10){
        this.unitsSecondsCounter++;
    }else if(this.dozensSecondsCounter + 1 < 6){
        this.dozensSecondsCounter++;
        this.unitsSecondsCounter=0;
    }else if(this.unitsMinutesCounter + 1 < 10){
        this.unitsSecondsCounter=0;
        this.dozensSecondsCounter=0;
        this.unitsMinutesCounter++;
    }else{
        this.unitsSecondsCounter=0;
        this.dozensSecondsCounter=0;
        this.unitsMinutesCounter=0;
        this.dozensMinutesCounter++;
    }

    this.unitsSeconds = new Obj(this.scene, 'scenes/pieces/' + this.unitsSecondsCounter + '.obj');
    this.dozensSeconds = new Obj(this.scene, 'scenes/pieces/' + this.dozensSecondsCounter + '.obj');
    this.unitsMinutes = new Obj(this.scene, 'scenes/pieces/' + this.unitsMinutesCounter + '.obj');
    this.dozensMinutes = new Obj(this.scene, 'scenes/pieces/' + this.dozensMinutesCounter + '.obj');
};

/**
 * Displays the timer
 */
Timer.prototype.display = function() {

    this.scene.pushMatrix();
        this.scene.scale(0.1, 0.1, 0.1);
        this.scene.translate(0, 150, -150);
        this.scene.pushMatrix();
            this.scene.translate(75, 0, 0);
            this.unitsSeconds.display();
        this.scene.popMatrix();
        this.scene.pushMatrix();
            this.scene.translate(50, 0, 0);
            this.dozensSeconds.display();
        this.scene.popMatrix();
        this.scene.pushMatrix();
            this.scene.translate(-50, 0, 0);
            this.unitsMinutes.display();
        this.scene.popMatrix();
        this.scene.pushMatrix();
            this.scene.translate(-75, 0, 0);
            this.dozensMinutes.display();
        this.scene.popMatrix();
    this.scene.popMatrix();

};