function Animation(id) {
  this.id = id;
  this.rendering = false;
  this.finished = false;
}


Animation.prototype.update = function(currTime) { };
Animation.prototype.getAnimationMatrix = function() { };


