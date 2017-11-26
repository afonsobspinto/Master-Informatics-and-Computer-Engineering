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
 * @param currentTime
 */
ComboAnimation.prototype.update = function(currentTime) {


    if (!this.animationManager.getCurrentAnimation().rendering && this.animationManager.getCurrentAnimationIndex() === this.animations.length-1)
        this.rendering = false;
	this.animationManager.getCurrentAnimation().update(currentTime);
};

/**
 * Returns the matrix of the animation.
 * @returns the matrix of the animation
 */
ComboAnimation.prototype.getAnimationMatrix = function() {
    return this.animationManager.getAnimationMatrix();
};
