function Animation(id) {
  this.id = id;
  this.rendering = false;
}


Animation.prototype.update = function(currTime) { };
Animation.prototype.getAnimationMatrix = function() { };
Animation.prototype.clone = function() { };


