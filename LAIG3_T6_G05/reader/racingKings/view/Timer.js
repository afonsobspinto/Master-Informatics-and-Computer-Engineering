/**
 * Timer class
 * @param scene
 * @param player
 * @param timer
 */
function Timer(scene, player, timer){
    this.scene = scene;
    this.player = player;
    this.timer = timer;

    this.count = this.timer;

    this.unitsCounter = this.timer % 10;
    this.dozensCounter = Math.floor((this.timer/10) % 10);
    this.hundredsCounter = Math.floor((this.timer/100) % 10);

    this.units = new Obj(this.scene, 'scenes/pieces/' + Math.floor(this.unitsCounter) + '.obj');
    this.dozens = new Obj(this.scene, 'scenes/pieces/' + Math.floor(this.dozensCounter) + '.obj');
    this.hundreds = new Obj(this.scene, 'scenes/pieces/' + Math.floor(this.hundredsCounter) + '.obj');
}

Timer.prototype = Object.create(CGFobject.prototype);
Timer.prototype.constructor = Timer;

/**
 * Updates the timer
 */
Timer.prototype.update = function countdown(){

    if(this.count <= 0){
    }else {
        this.count--;
        this.unitsCounter = this.count % 10;
        this.dozensCounter = Math.floor((this.count / 10) % 10);
        this.hundredsCounter = Math.floor((this.count / 100) % 100);

        let that = this;
        this.t = setTimeout(function () { that.update() }, 1000);

        this.units = new Obj(this.scene, 'scenes/pieces/' + this.unitsCounter + '.obj');
        this.dozens = new Obj(this.scene, 'scenes/pieces/' + this.dozensCounter + '.obj');
        this.hundreds = new Obj(this.scene, 'scenes/pieces/' + this.hundredsCounter + '.obj');
    }
};

/**
 * Stops the timer
 */
Timer.prototype.stop = function() {
    clearTimeout(this.t);
};

/**
 * Resets the timer
 */
Timer.prototype.reset = function() {
    this.stop();
    this.count = this.timer;

    this.unitsCounter = this.timer % 10;
    this.dozensCounter = Math.floor((this.timer/10) % 10);
    this.hundredsCounter = Math.floor((this.timer/100) % 100);

    this.units = new Obj(this.scene, 'scenes/pieces/' + Math.floor(this.unitsCounter) + '.obj');
    this.dozens = new Obj(this.scene, 'scenes/pieces/' + Math.floor(this.dozensCounter) + '.obj');
    this.hundreds = new Obj(this.scene, 'scenes/pieces/' + Math.floor(this.hundredsCounter) + '.obj');
};

/**
 * Displays the timer
 */
Timer.prototype.display = function() {

    this.scene.pushMatrix();
        this.scene.whiteMaterial.apply();
        this.scene.scale(0.1, 0.1, 0.1);
        this.scene.translate(0, 50, -150);
        this.scene.pushMatrix();
            if(this.player === 0) this.scene.translate(100, 0, 0);
            else this.scene.translate(-50, 0, 0);
            this.units.display();
        this.scene.popMatrix();
        this.scene.pushMatrix();
            if(this.player === 0) this.scene.translate(75, 0, 0);
            else this.scene.translate(-75, 0, 0);
            this.dozens.display();
        this.scene.popMatrix();
        this.scene.pushMatrix();
            if(this.player === 0) this.scene.translate(50, 0, 0);
            else this.scene.translate(-100, 0, 0);
            this.hundreds.display();
        this.scene.popMatrix();
    this.scene.popMatrix();

};

Timer.prototype.getCount = function(){
    return this.count;
}