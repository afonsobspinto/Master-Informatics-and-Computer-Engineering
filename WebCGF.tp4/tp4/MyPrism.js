/**
 * MyPrism
 * @constructor
 */
 function MyPrism(scene, slices, stacks) {
 	CGFobject.call(this,scene);
	
	this.slices = slices;
	this.stacks = stacks;

 	this.initBuffers();
 };

 MyPrism.prototype = Object.create(CGFobject.prototype);
 MyPrism.prototype.constructor = MyPrism;

 MyPrism.prototype.initBuffers = function() {
 	/*
 	* TODO:
 	* Replace the following lines in order to build a prism with a **single mesh**.
 	*
 	* How can the vertices, indices and normals arrays be defined to
 	* build a prism with varying number of slices and stacks?
 	*/

 	this.vertices = [];
 	this.indices = [];
 	this.normals = [];
	var ang = 2*Math.PI/this.slices;
	var indice = 0;
 	
    for(var x = 0; x < this.stacks; x++){
		
		var z=x/this.stacks;
		var nextZ = z+1/this.stacks;
		
		for(var i = 0; i < this.slices; i++){

			this.vertices.push(Math.cos(i * ang), Math.sin(i* ang), z);
			this.vertices.push(Math.cos(i * ang), Math.sin(i* ang), nextZ);
			this.vertices.push(Math.cos((i+1) * ang), Math.sin((i+1)* ang), z);
			this.vertices.push(Math.cos((i+1) * ang), Math.sin((i+1)* ang), nextZ);

			this.indices.push(indice, indice+2, indice+3);
			this.indices.push(indice+1, indice, indice+3);

			this.normals.push(Math.cos((i+0.5) * ang), Math.sin((i+0.5) * ang), 0);
			this.normals.push(Math.cos((i+0.5) * ang), Math.sin((i+0.5) * ang), 0);
			this.normals.push(Math.cos((i+0.5) * ang), Math.sin((i+0.5) * ang), 0);
			this.normals.push(Math.cos((i+0.5) * ang), Math.sin((i+0.5) * ang), 0);	

		indice = indice + 4;
		}

	}


/*
 	this.vertices = [
 	-0.5, -0.5, 0,
 	0.5, -0.5, 0,
 	-0.5, 0.5, 0,
 	0.5, 0.5, 0
 	];

 	this.indices = [
 	0, 1, 2, 
 	3, 2, 1
 	];

 	this.normals = [
 	0, 0, 1,
 	0, 0, 1,
 	0, 0, 1,
 	0, 0, 1
 	];
*/
 	this.primitiveType = this.scene.gl.TRIANGLES;
 	this.initGLBuffers();
 };
