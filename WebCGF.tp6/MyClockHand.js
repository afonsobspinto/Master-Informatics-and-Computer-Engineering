function MyClockHand(scene) {
	CGFobject.call(this,scene);

	this.initBuffers();
};

MyClockHand.prototype = Object.create(CGFobject.prototype);
MyClockHand.prototype.constructor=MyClockHand;

MyClockHand.prototype.initBuffers = function () {
	
	this.indices = [];
 	this.vertices = [];
 	this.normals = [];

	this.vertices.push(-0.01, 0, 0);
 	this.vertices.push(0.01, 0, 0);
 	this.vertices.push(0, 1, 0);

 	this.normals.push(0, 0, -1);
	this.normals.push(0, 0, -1);
	this.normals.push(0, 0, -1);

 	this.indices.push(0, 1, 2);

 	this.primitiveType = this.scene.gl.TRIANGLES;
 	this.initGLBuffers();
};

MyClockHand.prototype.setAngle = function(angle) {
	this.angle = angle;
 };