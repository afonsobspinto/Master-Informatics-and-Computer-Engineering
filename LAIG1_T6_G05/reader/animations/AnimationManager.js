/**
 * Animation Manager
 * @param animations - All the animations
 * @constructor
 */
function AnimationManager(animations) {
    this.animations = animations;
    this.animationIndex = 0;
    this.animations[0].rendering = true;
}

/**
 * Returns the matrix of the animation.
 * @returns the matrix of the animation
 */
AnimationManager.prototype.getAnimationMatrix = function() {

    if(this.animations.length === 0)
        return mat4.create();

    if (!this.animations[this.animationIndex].rendering && this.animationIndex !== this.animations.length-1) {
        this.animationIndex++;
        this.animations[this.animationIndex].rendering = true;
    }

    return this.animations[this.animationIndex].getAnimationMatrix();
};

/**
 * Returns the current Animation
 * @returns the current animation
 */

AnimationManager.prototype.getCurrentAnimation = function() {
    return this.animations[this.animationIndex];
};
