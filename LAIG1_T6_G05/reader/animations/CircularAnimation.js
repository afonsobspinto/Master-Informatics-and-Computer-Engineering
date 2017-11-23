function CircularAnimation(id, center, radius, startang, rotang, speed) {
    Animation.call(this, id);

    this.degToRad = Math.PI / 180;

    this.speed = speed;
    this.center = center;
    this.radius = radius;
    this.startang = startang * this.degToRad;
    this.rotang = rotang * this.degToRad;

	this.totalDistance = Math.PI * 2 * this.radius;
    this.span = 2*Math.PI*this.radius / this.speed; // time

    this.angVelocity = this.rotang / this.span;
    this.transform = mat4.create();

	this.accumulatedDistance = 0;
    this.lastCurrentTime = -1;
    // v= 2*pi*r /t

}

CircularAnimation.prototype.update = function (currentTime) {
    if (!this.rendering)
        return;

    let delta = (this.lastCurrentTime === -1) ? 0 : (currentTime - this.lastCurrentTime)/1000;
	this.lastCurrentTime = currentTime;
	

	this.accumulatedDistance += this.speed * delta; // Distance = velocity * time;
	if(this.accumulatedDistance > this.totalDistance){
            this.finished = true;
            this.rendering = false;
            mat4.rotate(this.transform, this.transform, 90 * this.degToRad, [0, 1, 0]);
            mat4.translate(this.transform, this.transform, [0, 0, this.radius]);
            mat4.rotate(this.transform, this.transform, this.startang + this.rotang, [0, 1, 0]);
            mat4.translate(this.transform, this.transform, this.center.toArray());
            
        }
	
    else{     //TODO: Ending a little bit too soon.
        let newTotalAngleDone = this.angVelocity * delta;
        mat4.rotate(this.transform, this.transform, 90 * this.degToRad, [0, 1, 0]);
        mat4.translate(this.transform, this.transform, [0, 0, this.radius]);
        mat4.rotate(this.transform, this.transform, this.startang + newTotalAngleDone, [0, 1, 0]);
        mat4.translate(this.transform, this.transform, this.center.toArray());
    }

    if(this.rotang < 0)
        mat4.rotate(this.transform, this.transform, 180*this.degToRad, [0, 1, 0]);
};

CircularAnimation.prototype.getAnimationMatrix = function () {

    return this.transform;
};