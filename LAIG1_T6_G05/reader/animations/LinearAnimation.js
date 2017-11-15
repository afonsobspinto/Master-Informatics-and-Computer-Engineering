function LinearAnimation(scene, id, controlPoints, vel) {
  
  Animation.call(this, scene, id);

  this.vel = vel;
  
  this.controlPoints = controlPoints;
  this.currentControlPoint = 0;
  this.currentControlPointPos = new Vector3(this.controlPoints[0].x,
											this.controlPoints[0].y, 
											this.controlPoints[0].z);

  var totalDistance = 0;
  this.distances = [];
  this.accumulatedDistance = 0;
  
  for (var i=0; i< this.controlPoints.length-1; i++){
	  var distance = distanceBetweenVertex(controlPoints[i],controlPoints[i+1]);
	  totalDistance += distance;
	  this.distances.push(distance);
  }
  
  this.lastCurrentTime = -1;
  this.currentAngle = this.calculateAngle(controlPoints[0],controlPoints[1]);
}

LinearAnimation.prototype = Object.create(Animation.prototype);
LinearAnimation.prototype.constructor = LinearAnimation;


LinearAnimation.prototype.update = function(currentTime) { //TODO: ADD CASO BASE
	var delta, t;
	var x, y, z;
	
	delta = (this.lastCurrentTime == -1) ? 0 : (currentTime - this.lastCurrentTime)/1000;
	this.lastCurrentTime = currentTime;
	
	this.accumulatedDistance += this.vel * delta;
	if(this.accumulatedDistance > this.distances[this.currentControlPoint]){
		this.accumulatedDistance = 0;
		this.currentControlPoint++;
		this.currentAngle = this.calculateAngle(this.controlPoints[this.currentControlPoint],this.controlPoints[this.currentControlPoint+1]);
	}
	
	t = this.accumulatedDistance/ this.distances[this.currentControlPoint];
	x = (this.controlPoints[this.currentControlPoint+1].x * t) + ((1-t)*this.controlPoints[this.currentControlPoint].x);
	y = (this.controlPoints[this.currentControlPoint+1].y * t) + ((1-t)*this.controlPoints[this.currentControlPoint].y);
	z = (this.controlPoints[this.currentControlPoint+1].z * t) + ((1-t)*this.controlPoints[this.currentControlPoint].z);

	this.currentControlPointPos = new Vector3(x,y,z);
}

LinearAnimation.prototype.calculateAngle = function(point1, point2) {
	return Math.atan2((point2.x - point1.x), (point2.z - point1.z));
}
