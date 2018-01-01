
function PieceAnimation(scene,timeSpan, piece, x1, z1, x2, z2) {

    this.scene=scene;
    this.x1 =x1;
    this.x2=x2;
    this.z1=z1;
    this.z2=z2;

    this.deltaX = x1-x2;
    this.deltaZ = z1-z2;
 
    this.piece = piece;

    this.accTime = 0
       this.matrix = mat4.create();
  }
 
 PieceAnimation.prototype = new PieceAnimation();
 PieceAnimation.prototype.constructor = PieceAnimation;
 
 
 PieceAnimation.prototype.update = function(currentTime){

   this.accTime += (currentTime/1000);
 
   this.matrix = mat4.create();
 
   if(this.accTime >= this.timeSpan){
       this.piece.moving = false;
     this.piece.animation = null;
     return;
   }

   var delta = accTime/this.timeSpan;
  
   mat4.translate(this.matrix, this.matrix, [this.deltaX*delta, 0, this.deltaZ*delta]);
 };
 