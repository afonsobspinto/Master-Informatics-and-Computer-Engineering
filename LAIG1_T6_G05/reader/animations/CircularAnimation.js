function CircularAnimation(scene, id, center, radius, inicialAngle, rotationAngle, vel) {
  
  Animation.call(this, scene, id);
  
  this.center = center;
  this.radius = radius;
  this.inicialAngle = inicialAngle * Math.PI / 180;
  this.rotationAngle = rotationAngle * Math.PI / 180;
  this.vel = vel;
  
  this.lastCurrentTime = -1;
  this.currentAngle = 0;
}

CircularAnimation.prototype = Object.create(Animation.prototype);
CircularAnimation.prototype.constructor = CircularAnimation;


CircularAnimation.prototype.update = function(currentTime) {
	var delta, t;
	var x, y, z;
	
	delta = (this.lastCurrentTime == -1) ? 0 : (currentTime - this.lastCurrentTime)/1000;
	this.lastCurrentTime = currentTime;
	
	this.currentAngle = this.rotationAngle * currentTime;
	
	x = this.radius * Math.sin(this.initialAngle + this.currentAngle);
    z = this.radius * Math.cos(this.initialAngle + this.currentAngle);
	
	this.scene.translate(x + this.center.x, this.center.y, z + this.center.z);
    this.scene.rotate(this.initialAngle + this.currentAngle, 0, 1, 0);
    this.scene.rotate(Math.PI / 2, 0, 1, 0);
}

