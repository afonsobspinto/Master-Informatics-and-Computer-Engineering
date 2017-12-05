/**
 * Represents an Animation.
 * @param id - The ID of the animation
 */
function Animation(id) {
  this.id = id;
  this.rendering = false;
}

/**
 * Updates the animation.
 * @param currTime - The current time of the animation
 */
Animation.prototype.update = function(currTime) { };

/**
 * Returns the matrix of the animation.
 * @returns the matrix of the animation
 */
Animation.prototype.getAnimationMatrix = function() { };

/**
 * Clones the animation.
 */
Animation.prototype.clone = function() { };


