
function MyTrapezoid(scene, height, smallBase, longBase) {
    CGFobject.call(this, scene);

    this.height = height;
    this.smallBase = smallBase;
    this.longBase = longBase;
    
    this.initBuffers();
};

MyTrapezoid.prototype = Object.create(CGFobject.prototype);
MyTrapezoid.prototype.constructor = MyTrapezoid;

MyTrapezoid.prototype.initBuffers = function() {
 	
	this.vertices = [
        0.5, 0.3, 0.0,
        -0.5, 0.3, 0.0, 
        0.0, 0.3, 2.0
    ];

    this.indices = [
        0, 1, 2,
    ];

    this.normals = [
        0, 0, 1,
        0, 0, 1,
        0, 0, 1  
    ];


 	this.primitiveType = this.scene.gl.TRIANGLES;
 	this.initGLBuffers();
 };