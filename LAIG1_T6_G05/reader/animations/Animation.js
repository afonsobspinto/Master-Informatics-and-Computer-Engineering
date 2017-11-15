function Animation(id) {
  this.id = id;
  this.rendering = false;
  this.finished = false;
}


Animation.prototype.update = function(currTime) { };
Animation.prototype.getCurrentPosition = function() { };
Animation.prototype.getCurrentAngle = function() { };
