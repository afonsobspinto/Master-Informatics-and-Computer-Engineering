/**
 * CircularAnimation
 * @constructor
 */
function CircularAnimation(id, center, radius, startang, rotang,speed) {
    Animation.call(this, id);

    this.degToRad = Math.PI / 180;

    this.speed = speed;
    this.center = center;
    this.radius = radius;
    this.startang = startang * this.degToRad;
    this.rotang = rotang * this.degToRad;

    this.span = 2*Math.PI*this.radius / this.speed; // time

    this.angVelocity = this.rotang / this.span;
    this.transform = mat4.create();

    // v= 2*pi*r /t

}

CircularAnimation.prototype.update = function (currTime) {
    if (!this.rendering)
        return;



    this.firstTime = this.firstTime || currTime;
    let deltaTime = (currTime - this.firstTime) / 1000;   /* in seconds */
    this.transform = mat4.create();

    if (deltaTime <= this.span) {     //TODO: Ending a little bit too soon.
        let newTotalAngleDone = this.angVelocity * deltaTime;
        mat4.translate(this.transform, this.transform, this.center.toArray());
        mat4.rotate(this.transform, this.transform, this.startang + newTotalAngleDone, [0, 1, 0]);
        mat4.translate(this.transform, this.transform, [0, 0, this.radius]);
    } else {
        mat4.translate(this.transform, this.transform, this.center.toArray());
        mat4.rotate(this.transform, this.transform, this.startang + this.rotang, [0, 1, 0]);
        mat4.translate(this.transform, this.transform, [0, 0, this.radius]);
        this.finished = true;
    }
    if(this.rotang < 0)
        mat4.rotate(this.transform, this.transform, 180*this.degToRad, [0, 1, 0]);
};

CircularAnimation.prototype.getAnimationMatrix = function () {

    return this.transform;
};