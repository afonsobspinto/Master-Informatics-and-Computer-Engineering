function CircularAnimation(scene, id, center, radius, inicialAngle, rotationAngle, vel) {
  
  Animation.call(this, scene, id);
  
  this.center = center;
  this.radius = radius;
  this.inicialAngle = inicialAngle;
  this.rotationAngle = rotationAngle;
  this.vel = vel;
  

}

CircularAnimation.prototype = Object.create(Animation.prototype);
CircularAnimation.prototype.constructor = CircularAnimation;


CircularAnimation.prototype.display = function() {

}