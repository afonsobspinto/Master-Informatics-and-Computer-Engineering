function BezierAnimation(scene, id, p1, p2, p3, p4, vel) {
  
  Animation.call(this, scene, id);
  
  this.p1 = p1;
  this.p2 = p2;
  this.p3 = p3;
  this.p4 = p4;
  this.vel = vel;
  

}

BezierAnimation.prototype = Object.create(Animation.prototype);
BezierAnimation.prototype.constructor = BezierAnimation;


BezierAnimation.prototype.display = function() {

}