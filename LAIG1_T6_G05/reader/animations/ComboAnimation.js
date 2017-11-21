function ComboAnimation(id, animations) {
  Animation.call(this, id);

  this.animations = animations;
  this.animationIndex = 0;
  this.animations[0].rendering = true;
}

ComboAnimation.prototype = Object.create(Animation.prototype);
ComboAnimation.prototype.constructor = ComboAnimation;


ComboAnimation.prototype.update = function(currentTime) {
	
	if(this.animations.length === 0)
        return mat4.create();

    if (this.animations[this.animationIndex].finished &&
        this.animationIndex !== this.animations.length-1) {
        this.animationIndex++;
        this.animations[this.animationIndex].render = true;
		console.log(this.animationIndex);
    }
	
};

ComboAnimation.prototype.getAnimationMatrix = function() {
	return this.animations[this.animationIndex].getAnimationMatrix();
};
