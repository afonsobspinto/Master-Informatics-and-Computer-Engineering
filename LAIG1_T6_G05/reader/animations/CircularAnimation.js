function CircularAnimation(id, center, radius, startang, rotang, speed) {
    Animation.call(this, id);

    this.degToRad = Math.PI / 180;

    this.center = center;
    this.radius = radius;
    this.startang = startang;
    this.rotang = rotang;
    this.speed = speed;

    this.w = this.speed / this.radius;
    this.currentAngle = this.startang;

    this.lastCurrentTime = -1;
    this.timeElapsed = 0;

    this.totalTime = 2*Math.PI*this.radius / this.speed;
}

CircularAnimation.prototype.update = function (currentTime) {

    if(!this.rendering)
        return;

    this.timeElapsed += (this.lastCurrentTime === -1) ? 0 : (currentTime - this.lastCurrentTime)/1000;
    this.lastCurrentTime = currentTime;

    this.currentAngle = this.w * this.timeElapsed + this.startang;

    if(this.timeElapsed >= this.totalTime){
        this.finished = true;
        this.rendering = false;
    }


};

CircularAnimation.prototype.getAnimationMatrix = function () {
    let matrix = mat4.create();

    mat4.rotate(matrix,matrix, 90 * this.degToRad, [0,1,0]);
    mat4.translate(matrix, matrix, [this.radius * Math.sin(this.currentAngle), 0 , this.radius * Math.cos(this.currentAngle)]);
    mat4.rotate(matrix, matrix, this.currentAngle, [0,1,0]);
    mat4.translate(matrix, matrix, this.center.toArray());


    return matrix;

};