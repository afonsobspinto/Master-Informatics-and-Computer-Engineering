 function MyCircle(scene, slices) {
 	CGFobject.call(this,scene);
	
	this.slices = slices || 1;

 	this.initBuffers();
 };

 MyCircle.prototype = Object.create(CGFobject.prototype);
 MyCircle.prototype.constructor = MyCircle;

 MyCircle.prototype.initBuffers = function() {

	this.indices = [];
 	this.vertices = [];
 	this.normals = [];
 	this.texCoords = [];

	var indice = 1;
	var angle = 2 * Math.PI / (this.slices);
	this.vertices.push(
		0, 
		0, 
		0
	);
	this.normals.push(
		0, 
		0, 
		-1
	);
	this.texCoords.push(
		0.5, 
		0.5
	);

	for (var i = 0; i < this.slices; i++)
	{
		this.vertices.push(
			Math.cos(i * angle), 
			Math.sin(i * angle), 
			0
		);
		this.normals.push(
			0,
			0, 
			-1
		);
		this.texCoords.push(
			Math.cos(indice * angle) * 0.5 + 0.5,
			Math.sin(indice * angle) * 0.5 + 0.5
		);

		indice++;

	}

		for (var j = 0; j < this.slices; j++)
		{
			if (j + 1 == this.slices)
			{
				this.indices.push(j + 1, 0, 1);
			}
			else this.indices.push(1 + j, 0, 2 + j);
		}

 	this.primitiveType = this.scene.gl.TRIANGLES;
 	this.initGLBuffers();
 };
