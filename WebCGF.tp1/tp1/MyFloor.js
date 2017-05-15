/**
 * MyFloor
 * @param gl {WebGLRenderingContext}
 * @constructor
 */
function MyFloor(scene) {
	CGFobject.call(this,scene);

	this.cube = new MyUnitCubeQuad(this.scene);
	this.cube.initBuffers();
};

MyFloor.prototype = Object.create(CGFobject.prototype);
MyFloor.prototype.constructor=MyFloor;

MyFloor.prototype.display = function () {
	

	this.scene.pushMatrix();
	
		// ---- BEGIN Geometric transformation section
		this.scene.scale(8,0.1,6);
		// ---- END Geometric transformation section


		// ---- BEGIN Primitive drawing section
		this.cube.display();
		// ---- END Primitive drawing section

	this.scene.popMatrix();

}