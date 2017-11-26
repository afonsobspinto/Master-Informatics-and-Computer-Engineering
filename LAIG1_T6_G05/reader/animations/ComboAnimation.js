function ComboAnimation(id, animations) {
  Animation.call(this, id);

    this.animations = animations;
    this.animationManager = new AnimationManager(this.animations);
}

ComboAnimation.prototype = Object.create(Animation.prototype);
ComboAnimation.prototype.constructor = ComboAnimation;


ComboAnimation.prototype.update = function(currentTime) {
	this.animationManager.getCurrentAnimation().update(currentTime);
};

ComboAnimation.prototype.getAnimationMatrix = function() {
    return this.animationManager.getAnimationMatrix();
};
