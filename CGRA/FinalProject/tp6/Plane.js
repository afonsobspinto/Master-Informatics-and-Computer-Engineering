
/** Represents a plane with nrDivs divisions along both axis, with center at (0,0) */
function Plane(scene, nrDivs, minS, maxS, minT, maxT) {
	CGFobject.call(this,scene);

	// nrDivs = 1 if not provided
	nrDivs = typeof nrDivs !== 'undefined' ? nrDivs : 1;

	this.nrDivs = nrDivs;
	this.patchLength = 1.0 / nrDivs;
	
	this.minS = minS || 0.0;
	this.maxS = maxS || 1.0;
	this.minT = minT || 0.0;
	this.maxT = maxT || 1.0;

	this.initBuffers();
};

Plane.prototype = Object.create(CGFobject.prototype);
Plane.prototype.constructor = Plane;

Plane.prototype.initBuffers = function() {
	/* example for nrDivs = 3 :
	(numbers represent index of point in vertices array)

	        y
        	^
	        |
	0    1  |  2    3
	        |
	4	 5	|  6    7
	--------|--------------> x
	8    9  |  10  11
	        |
	12  13  |  14  15    

	*/

	// Generate vertices, normals and texture coordinates 
	this.vertices = [];
	this.normals = [];
	this.texCoords = [];
	var deltaS = (this.maxS-this.minS)/this.nrDivs;
	var deltaT = (this.maxT-this.minT)/this.nrDivs;
	var yCoord = 0.5;

	for (var j = 0; j <= this.nrDivs; j++) 
	{
		var xCoord = -0.5;
		for (var i = 0; i <= this.nrDivs; i++) 
		{
			this.vertices.push(xCoord, yCoord, 0);
			
			// As this plane is being drawn on the xy plane, the normal to the plane will be along the positive z axis.
			// So all the vertices will have the same normal, (0, 0, 1).
			
			this.normals.push(0,0,1);

			this.texCoords.push(this.minS+i*deltaS,this.minT+j*deltaT);

			xCoord += this.patchLength;
		}
		yCoord -= this.patchLength;
	}
	
	// Generating indices
	/* for nrDivs = 3 output will be [0, 1, 2, 3, 4, 5, 6, 7].
	Interpreting this index list as a TRIANGLE_STRIP will draw a row of the plane. */

	this.indices = [];
	var ind=0;

	for (var j = 0; j < this.nrDivs; j++) 
	{
		for (var i = 0; i <= this.nrDivs; i++) 
		{
			this.indices.push(ind);
			this.indices.push(ind+this.nrDivs+1);

			ind++;
		}
		if (j+1 < this.nrDivs)
		{
			this.indices.push(ind+this.nrDivs);
			this.indices.push(ind);
		}
	}
	
	this.primitiveType = this.scene.gl.TRIANGLE_STRIP;

	this.initGLBuffers();
};

