
/** Represents a plane with nrDivs divisions along both axis, with center at (0,0) */
function Plane(scene, nrDivs) {
	CGFobject.call(this,scene);

	// nrDivs = 1 if not provided
	nrDivs = typeof nrDivs !== 'undefined' ? nrDivs : 1;

	this.nrDivs = nrDivs;
	this.patchLength = 1.0 / nrDivs;

	this.initBuffers();
};

Plane.prototype = Object.create(CGFobject.prototype);
Plane.prototype.constructor = Plane;

Plane.prototype.initBuffers = function() {
	/* example for nrDivs = 3 :
	(numbers represent index of point in array)
	('x's represent vertices which are drawn but not stored

	y
	^
	|
	0    2    4    6    
	|
	1    3    5    7
	|
	x	 x	  x    x
	|
	x----x----x----x---> x
	*/

	// Generate vertices
	this.vertices = [];
	var xCoord = -0.5;
	for (var i = 0; i <= this.nrDivs; i++) {
		this.vertices.push(xCoord, 0.5, 0);
		this.vertices.push(xCoord, 0.5 - this.patchLength, 0);
		xCoord += this.patchLength;
	}
	
	// Generating indices
	/* for nrDivs = 3 output will be [0, 1, 2, 3, 4, 5, 6, 7].
	Interpreting this index list as a TRIANGLE_STRIP will draw a row of the plane. */
	this.indices = [];
	for (var i = 0; i <= 2 * this.nrDivs + 1; i++) {
		this.indices.push(i);
	}

	// Generating normals
	/*
	As this plane is being drawn on the xy plane, the normal to the plane will be along the positive z axis.
	So all the vertices will have the same normal, (0, 0, 1).
	*/
	this.normals = [];
	for (var i = 0; i <= 2 * this.nrDivs + 1; i++) {
		this.normals.push(0,0,1);
	}

	this.primitiveType = this.scene.gl.TRIANGLE_STRIP;
	this.initGLBuffers();
};

// Drawing the plane
/*
To draw the plane we need to draw the row we defined, nrDivs times.
Each row must be drawn patchLength lower than the one before it.
To draw each row, the drawElements() function is used. This function draws the geometry defined in initBuffers();
*/
Plane.prototype.display = function() {
	this.scene.pushMatrix();

	for (var i = 0; i < this.nrDivs; i++) {
		this.drawElements(this.primitiveType);
		this.scene.translate(0, -this.patchLength, 0);
	}

	this.scene.popMatrix();
}
