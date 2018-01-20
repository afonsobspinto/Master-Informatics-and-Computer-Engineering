function MyPrism(scene) {
	CGFobject.call(this,scene);

	this.initBuffers();

};

MyPrism.prototype = Object.create(CGFobject.prototype);
MyPrism.prototype.constructor=MyPrism;

MyPrism.prototype.initBuffers = function () {

    this.vertices = [];
    this.normals = [];
    this.indices = [];
    this.texCoords = [];

    for(var i = 0; i < 3; i++){
        this.vertices.push(0, 0.1, 0);
        this.vertices.push(0.66, 0.1, 0);
        this.vertices.push(0, 0.1, 1);
        this.vertices.push(0, 0, 0);
        this.vertices.push(0.66, 0, 0);
        this.vertices.push(0, 0, 1);
    }

	this.indices.push(0,2,1);
	this.indices.push(3,4,5);
	this.indices.push(0,3,2);
	this.indices.push(3,5,2);
	this.indices.push(1,2,4);
	this.indices.push(4,2,5);


	this.normals.push(0,1,0);
	this.normals.push(0,1,0);
	this.normals.push(0,1,0);

	this.normals.push(0,-1,0);
	this.normals.push(0,-1,0);
	this.normals.push(0,-1,0);
	
	this.normals.push(-1,0,0);
	this.normals.push(1,0,0);
	this.normals.push(-1,0,0);
	this.normals.push(-1,0,0);
	this.normals.push(1,0,0);
	this.normals.push(-1,0,0);

	this.normals.push(0,0,-1);
	this.normals.push(0,0,-1);
	this.normals.push(1,0,0);
	this.normals.push(0,0,-1);
	this.normals.push(0,0,-1);
	this.normals.push(1,0,0);


	this.texCoords.push(0,1,0);
	this.texCoords.push(0,1,0);
	this.texCoords.push(0,1,0);

	this.texCoords.push(0,-1,0);
	this.texCoords.push(0,-1,0);
	this.texCoords.push(0,-1,0);
	
	this.texCoords.push(-1,0,0);
	this.texCoords.push(1,0,0);
	this.texCoords.push(-1,0,0);
	this.texCoords.push(-1,0,0);
	this.texCoords.push(1,0,0);
	this.texCoords.push(-1,0,0);

	this.texCoords.push(0,0,-1);
	this.texCoords.push(0,0,-1);
	this.texCoords.push(1,0,0);
	this.texCoords.push(0,0,-1);
	this.texCoords.push(0,0,-1);
	this.texCoords.push(1,0,0);

	this.primitiveType=this.scene.gl.TRIANGLES;
	this.initGLBuffers();
};