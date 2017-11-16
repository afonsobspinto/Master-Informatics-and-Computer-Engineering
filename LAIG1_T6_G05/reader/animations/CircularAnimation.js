function CircularAnimation(id, center, radius, initialAngle, rotationAngle, vel) {
  
  Animation.call(this, id);
  
  this.center = center;
  this.radius = radius;
  this.initialAngle = initialAngle * (Math.PI / 180) + Math.PI/2;
  this.rotationAngle = rotationAngle * (Math.PI / 180);
  this.vel = vel;

  this.totalTime = 2*Math.PI*this.radius / this.vel;
  this.velAng = this.rotationAngle / this.totalTime;
  this.lastCurrentTime = -1;
  this.timePassed = 0;
  
  this.currentPosition = new Vector3(this.center.x + this.radius * Math.sin(this.initialAngle), this.center.y, this.center.z + this.radius * Math.cos(this.initialAngle));
  this.currentAngle = this.initialAngle;
  this.orientation = (this.rotationAngle < 0) ? (-Math.PI/2) : Math.PI/2;
}

CircularAnimation.prototype = Object.create(Animation.prototype);
CircularAnimation.prototype.constructor = CircularAnimation;


CircularAnimation.prototype.update = function(currentTime) {
	var x, y, z;
	
	if (!this.rendering)
		return;

	if (this.timePassed >= this.totalTime) {
		x = this.center.x + this.radius * Math.sin(this.initialAngle+this.rotationAngle);
		y = this.center.y;
		z = this.center.z + this.radius * Math.cos(this.initialAngle+this.rotationAngle);
		this.finished = true;
        this.rendering = false;
		return;
	}
	
	if (this.lastCurrentTime != -1)
		this.timePassed += (currentTime - this.lastCurrentTime) / 1000;
	this.lastCurrentTime = currentTime;
	
	this.currentAngle = this.velAng * this.timePassed + this.initialAngle;
	
	x = this.center.x + this.radius * Math.sin(this.currentAngle);
	y = this.center.y;
	z = this.center.z + this.radius * Math.cos(this.currentAngle);
	this.currentAngle += this.orientation;
	console.log("x = ", x, " / y =  ", y, " / z = ", z, " / angle = ", this.currentAngle);
	this.currentPosition = new Vector3(x,y,z);
}


CircularAnimation.prototype.getCurrentPosition = function() { return this.currentPosition; };
CircularAnimation.prototype.getCurrentAngle = function() { return this.currentAngle; };