function MyTarget(scene,x,z) {
	CGFobject.call(this,scene);
	
	this.target = new MyUnitCubeQuad(this.scene);
	this.x = x;
	this.z = z;
	this.pos = [this.x,this.z];
};

MyTarget.prototype = Object.create(CGFobject.prototype);
MyTarget.prototype.constructor=MyTarget;

MyTarget.prototype.display = function(){
	this.scene.pushMatrix();
	   this.scene.translate(this.x,0.5,this.z);
	   this.target.display();
	this.scene.popMatrix();
}

MyTarget.prototype.getPos = function(){
	return this.pos;
}