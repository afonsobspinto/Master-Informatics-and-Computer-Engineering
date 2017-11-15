function ComboAnimation(scene, id, animations) {
  Animation.call(this, scene, id);

  this.animations = animations;

}

ComboAnimation.prototype = Object.create(Animation.prototype);
ComboAnimation.prototype.constructor = ComboAnimation;


ComboAnimation.prototype.display = function() {

}