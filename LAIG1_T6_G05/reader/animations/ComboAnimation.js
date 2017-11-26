/**
 * Represents the Combo Animation.
 * @param id - The ID of the animation
 * @param animations - The set of animations
 */
function ComboAnimation(id, animations) {
  Animation.call(this, id);

    this.animations = animations;
    this.animationManager = new AnimationManager(this.animations);
}

ComboAnimation.prototype = Object.create(Animation.prototype);
ComboAnimation.prototype.constructor = ComboAnimation;

/**
 * Updates the animation.
 * @param currTime - The current time of the animation
 */
ComboAnimation.prototype.update = function(currentTime) {
	this.animationManager.getCurrentAnimation().update(currentTime);
};

/**
 * Returns the matrix of the animation.
 * @returns the matrix of the animation
 */
ComboAnimation.prototype.getAnimationMatrix = function() {
    return this.animationManager.getAnimationMatrix();
};
