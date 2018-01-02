
function PieceAnimation(timeSpan, x1, z1, x2, z2) {

  this.x1 = x1;
  this.x2 = x2;
  this.z1 = z1;
  this.z2 = z2;

  this.deltaX = x1 - x2;
  this.deltaZ = z1 - z2;

  this.timeSpan = timeSpan;
  this.accTime = 0
  this.lastCurrentTime = -1;
  this.matrix = mat4.create();

  this.finished = false;
}

PieceAnimation.prototype = new PieceAnimation();
PieceAnimation.prototype.constructor = PieceAnimation;


PieceAnimation.prototype.getAnimationMatrix = function (currentTime) {
  
  delta = (this.lastCurrentTime === -1) ? 0 : (currentTime - this.lastCurrentTime)/1000;
  this.lastCurrentTime = currentTime;

  this.accTime += delta;
  this.matrix = mat4.create();

  if (this.accTime >= this.timeSpan) {
    console.log("finished");
    this.finished = true;
    return;
  }

  var delta = this.accTime / this.timeSpan;

  mat4.translate(this.matrix, this.matrix, [this.deltaX * delta, 0, this.deltaZ * delta]);
  return this.matrix;
}

