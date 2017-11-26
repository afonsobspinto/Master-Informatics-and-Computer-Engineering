/**
 * Represents the Circular Animation.
 * @param id - The ID of the animation
 * @param center - The center of the circle in which the object will rotate
 * @param radius - The radius of the circle in which the object will rotate
 * @param startang - The initial angle (in degrees)
 * @param rotang - The rotation angle (in degrees)
 * @param vel - The speed of the animation
 */
function CircularAnimation(id, center, radius, startang, rotang, vel) {
    Animation.call(this, id);

    this.degToRad = Math.PI / 180;

    this.center = center;
    this.radius = radius;
    this.startang = startang;
    this.rotang = rotang;
    this.vel = vel;

    this.w = this.vel / this.radius;
    this.currentAngle = this.startang;

    this.lastCurrentTime = -1;
    this.accumulatedTime = 0;

    this.totalTime = 2*Math.PI*this.radius / this.vel;
}

/**
 * Updates the animation.
 * @param currTime - The current time of the animation
 */
CircularAnimation.prototype.update = function (currentTime) {


    if(!this.rendering)
        return;

    this.accumulatedTime += (this.lastCurrentTime === -1) ? 0 : (currentTime - this.lastCurrentTime)/1000;
    this.lastCurrentTime = currentTime;

    this.currentAngle = this.w * this.accumulatedTime + this.startang;

    if(this.accumulatedTime >= this.totalTime){
        this.rendering = false;
    }


};

/**
 * Returns the matrix of the animation.
 * @returns the matrix of the animation
 */
CircularAnimation.prototype.getAnimationMatrix = function () {
    let matrix = mat4.create();

    mat4.rotate(matrix,matrix, 90 * this.degToRad, [0,1,0]);
    mat4.translate(matrix, matrix, [this.radius * Math.sin(this.currentAngle), 0 , this.radius * Math.cos(this.currentAngle)]);
    mat4.rotate(matrix, matrix, this.currentAngle, [0,1,0]);
    mat4.translate(matrix, matrix, this.center.toArray());


    return matrix;

};

/**
 * Clones the animation.
 */
CircularAnimation.prototype.clone = function () {

    return new CircularAnimation(this.id+'clone', this.center, this.radius, this.startang, this.rotang, this.vel);

};