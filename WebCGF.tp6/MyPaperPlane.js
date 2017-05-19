 function MyPaperPlane(scene) {
 	CGFobject.call(this,scene);
 	this.initBuffers();
 };

 MyPaperPlane.prototype = Object.create(CGFobject.prototype);
 MyPaperPlane.prototype.constructor = MyPaperPlane;

 MyPaperPlane.prototype.initBuffers = function() {

	this.indices = [
 	];
 	this.vertices = [
 	];
 	this.normals = [
 	];

	// LEFT TRIANGLE
 	
 	this.vertices.push(0, 0, 0);
 	this.vertices.push(0, 0, 1);
 	this.vertices.push(-1, 0, 0);
 	
	this.normals.push(0, 1, 0);
	this.normals.push(0, 1, 0);
	this.normals.push(0, 1, 0);

 	this.indices.push(2, 1, 0);

 	// RIGHT TRIANGLE

	this.vertices.push(0, 0, 0);
 	this.vertices.push(0, 0, -1);
 	this.vertices.push(-1, 0, 0);
 	
	this.normals.push(0, 1, 0);
	this.normals.push(0, 1, 0);
	this.normals.push(0, 1, 0);

 	this.indices.push(3, 4, 5);

	// FIRST DOWN TRIANGLE

	this.vertices.push(0, 0, 0);
 	this.vertices.push(0, -0.3, 0);
 	this.vertices.push(-1, 0, 0);
 	
	this.normals.push(0, 0, -1);
	this.normals.push(0, 0, -1);
	this.normals.push(0, 0, -1);

 	this.indices.push(6, 7, 8);

 	// SECOND DOWN TRIANGLE

	this.vertices.push(0, 0, 0);
 	this.vertices.push(0, -0.3, 0);
 	this.vertices.push(-1, 0, 0);
 	
	this.normals.push(0, 0, -1);
	this.normals.push(0, 0, -1);
	this.normals.push(0, 0, -1);

 	this.indices.push(11, 10, 9);

 	// SECOND LEFT TRIANGLE
 	
 	this.vertices.push(0, 0, 0);
 	this.vertices.push(0, 0, 1);
 	this.vertices.push(-1, 0, 0);
 	
	this.normals.push(0, -1, 0);
	this.normals.push(0, -1, 0);
	this.normals.push(0, -1, 0);

 	this.indices.push(12, 13, 14);

 	// SECOND RIGHT TRIANGLE

	this.vertices.push(0, 0, 0);
 	this.vertices.push(0, 0, -1);
 	this.vertices.push(-1, 0, 0);
 	
	this.normals.push(0, -1, 0);
	this.normals.push(0, -1, 0);
	this.normals.push(0, -1, 0);

 	this.indices.push(17, 16, 15);

 	this.primitiveType = this.scene.gl.TRIANGLES;
 	this.initGLBuffers();

 };

 MyPaperPlane.prototype.setTravelTime = function(travelTime) {
 	this.travelTime = travelTime;
 };