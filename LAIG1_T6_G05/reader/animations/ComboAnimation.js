function ComboAnimation(scene, id) {
  
  Animation.call(this, scene, id);  

}

ComboAnimation.prototype = Object.create(Animation.prototype);
ComboAnimation.prototype.constructor = ComboAnimation;


ComboAnimation.prototype.display = function() {

}