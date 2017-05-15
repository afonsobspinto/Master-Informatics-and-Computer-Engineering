/**
 * MyTable
 * @param gl {WebGLRenderingContext}
 * @constructor
 */
function MyTable(scene) {
	CGFobject.call(this,scene);

	this.cube = new MyUnitCubeQuad(this.scene);
	this.cube.initBuffers();
};

MyTable.prototype = Object.create(CGFobject.prototype);
MyTable.prototype.constructor=MyTable;

MyTable.prototype.display = function () {
	

	this.scene.pushMatrix();
	
		// ---- BEGIN Geometric transformation section
		this.scene.translate(0,3.65,0);
		this.scene.scale(5,0.3,3);
		// ---- END Geometric transformation section


		// ---- BEGIN Primitive drawing section
		this.cube.display();
		// ---- END Primitive drawing section

	this.scene.popMatrix();

	this.scene.pushMatrix();
	
		// ---- BEGIN Geometric transformation section
		this.scene.translate(-2.35,1.75,-1.35);
		this.scene.scale(0.3, 3.5, 0.3);
		// ---- END Geometric transformation section


		// ---- BEGIN Primitive drawing section
		this.cube.display();
		// ---- END Primitive drawing section

	this.scene.popMatrix();
	
		this.scene.pushMatrix();
	
		// ---- BEGIN Geometric transformation section
		this.scene.translate(-2.35,1.75,1.35);
		this.scene.scale(0.3, 3.5, 0.3);
		// ---- END Geometric transformation section


		// ---- BEGIN Primitive drawing section
		this.cube.display();
		// ---- END Primitive drawing section

	this.scene.popMatrix();

	this.scene.pushMatrix();
	
		// ---- BEGIN Geometric transformation section
		this.scene.translate(2.35,1.75,1.35);
		this.scene.scale(0.3, 3.5, 0.3);
		// ---- END Geometric transformation section


		// ---- BEGIN Primitive drawing section
		this.cube.display();
		// ---- END Primitive drawing section

	this.scene.popMatrix();

	this.scene.pushMatrix();
	
		// ---- BEGIN Geometric transformation section
		this.scene.translate(2.35,1.75,-1.35);
		this.scene.scale(0.3, 3.5, 0.3);
		// ---- END Geometric transformation section


		// ---- BEGIN Primitive drawing section
		this.cube.display();
		// ---- END Primitive drawing section

	this.scene.popMatrix();

}