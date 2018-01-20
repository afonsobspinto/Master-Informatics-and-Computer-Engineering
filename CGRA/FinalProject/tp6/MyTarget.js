function MyTarget(scene,x,z) {
	CGFobject.call(this,scene);
	
	this.target = new MyUnitCubeQuad(this.scene);
	this.x = x;
	this.y = 0.5;
	this.z = z;
	this.pos = [this.x,this.z];
	this.assigned = false;
};

MyTarget.prototype = Object.create(CGFobject.prototype);
MyTarget.prototype.constructor=MyTarget;

MyTarget.prototype.display = function(){
	this.scene.pushMatrix();
	   this.scene.translate(this.x,this.y,this.z);
	   this.target.display();
	this.scene.popMatrix();
}

MyTarget.prototype.getPos = function(){
	return this.pos;
}