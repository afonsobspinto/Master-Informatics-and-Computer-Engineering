
function MyParallelepiped(scene, height, width, lenght) {
    CGFobject.call(this, scene);

    this.height = height/2;
    this.width = width/2;
    this.lenght = lenght/2;
    
    this.initBuffers();
};

MyParallelepiped.prototype = Object.create(CGFobject.prototype);
MyParallelepiped.prototype.constructor = MyParallelepiped;

MyParallelepiped.prototype.initBuffers = function() {
 	
    this.vertices = [];
	this.indices = [];
	this.normals = [];

    this.vertices.push(this.width,this.height,this.lenght);
	this.vertices.push(-this.width,this.height,this.lenght);
	this.vertices.push(-this.width,-this.height,this.lenght);
	this.vertices.push(this.width,-this.height,this.lenght);
	this.vertices.push(this.width,this.height,-this.lenght);
	this.vertices.push(-this.width,this.height,-this.lenght);
	this.vertices.push(-this.width,-this.height,-this.lenght);
	this.vertices.push(this.width,-this.height,-this.lenght);

    this.indices.push(0,1,2,0,2,3);
	this.indices.push(7,6,4,4,6,5);
	this.indices.push(3,7,0,7,4,0);
	this.indices.push(1,6,2,1,5,6);
	this.indices.push(0,4,1,1,4,5);
	this.indices.push(2,7,3,2,6,7);

	/*this.normals.push(0,0,1);
	this.normals.push(0,0,1);
	this.normals.push(0,0,1);
	this.normals.push(0,0,1);
	this.normals.push(0,0,-1);
	this.normals.push(0,0,-1);
	this.normals.push(0,0,-1);
	this.normals.push(0,0,-1);
	this.normals.push(1,0,0);
	this.normals.push(1,0,0);
	this.normals.push(1,0,0);
	this.normals.push(1,0,0);
	this.normals.push(-1,0,0);
	this.normals.push(-1,0,0);
	this.normals.push(-1,0,0);
	this.normals.push(-1,0,0);
	this.normals.push(0,1,0);
	this.normals.push(0,1,0);
	this.normals.push(0,1,0);
	this.normals.push(0,1,0);
	this.normals.push(0,-1,0);
	this.normals.push(0,-1,0);
	this.normals.push(0,-1,0);
	this.normals.push(0,-1,0);*/

    this.normals.push(0,0,1);
	this.normals.push(0,0,1);
	this.normals.push(0,0,-1);
	this.normals.push(0,0,-1);
	this.normals.push(1,0,0);
	this.normals.push(-1,0,0);
	this.normals.push(0,1,0);
	this.normals.push(0,-1,0);

/*
	//Add Normals for Front
	for (i = 0; i < 4; i++){
		this.normals.push(0,0,1);
	}

	//Add Normals for Back
	for (i = 0; i < 4; i++){
		this.normals.push(0,0,-1);
	}
	//Add Normals for Right Side
	for (i = 0; i < 4; i++){
		this.normals.push(1,0,0);
	}
	//Add Normals for Left Side
	for (i = 0; i < 4; i++){
		this.normals.push(-1,0,0);
	}
	//Add Normals for Top
	for (i = 0; i < 4; i++){
		this.normals.push(0,1,0);
	}
	//Add Normals for Bottom
	for (i = 0; i < 4; i++){
		this.normals.push(0,-1,0);
	}*/

 	this.primitiveType = this.scene.gl.TRIANGLES;
 	this.initGLBuffers();
 };