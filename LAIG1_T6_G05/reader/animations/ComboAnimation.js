function ComboAnimation(id, animations) {
  Animation.call(this, id);

  this.animations = animations;

}

ComboAnimation.prototype = Object.create(Animation.prototype);
ComboAnimation.prototype.constructor = ComboAnimation;


ComboAnimation.prototype.update = function(currentTime) {

}

ComboAnimation.prototype.getCurrentPosition = function() { };
ComboAnimation.prototype.getCurrentAngle = function() { };