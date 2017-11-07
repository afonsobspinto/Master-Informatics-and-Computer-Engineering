function LinearAnimation(scene, id, controlPoints, vel) {
  
  Animation.call(this, scene, id);
  
  this.id = id;
  this.controlPoints = controlPoints;
  this.vel = vel;
  

}

LinearAnimation.prototype = Object.create(Animation.prototype);
LinearAnimation.prototype.constructor = LinearAnimation;


LinearAnimation.prototype.display = function() {

}