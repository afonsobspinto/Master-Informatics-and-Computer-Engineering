/**
 * Animation Manager
 * @constructor
 */
function AnimationManager(animations) {
    this.animations = animations;
    this.animationIndex = 0;
    this.animations[0].rendering = true;
};


AnimationManager.prototype.getAnimationMatrix = function() {

    if(this.animations.length === 0)
        return mat4.create();

    if (this.animations[this.animationIndex].finished &&
        this.animationIndex !== this.animations.length-1) {
        this.animationIndex++;
        this.animations[this.animationIndex].render = true;
    }

    return this.animations[this.animationIndex].getAnimationMatrix();

}
