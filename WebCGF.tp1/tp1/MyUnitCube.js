/**
 * MyUnitCube
 * @param gl {WebGLRenderingContext}
 * @constructor
 */
function MyUnitCube(scene) {
	CGFobject.call(this,scene);

	this.initBuffers();
};

MyUnitCube.prototype = Object.create(CGFobject.prototype);
MyUnitCube.prototype.constructor=MyUnitCube;

MyUnitCube.prototype.initBuffers = function () {
	this.vertices = [
			//Vértices da Face Inferior
            -0.5, -0.5, -0.5,
            0.5, -0.5, -0.5,
            0.5, 0.5, -0.5,
           	-0.5, 0.5, -0.5,
           	//Vértices Face Superior
            -0.5, -0.5, 0.5,
            0.5, -0.5, 0.5,
            0.5, 0.5, 0.5,
           	-0.5, 0.5, 0.5,
			];

	this.indices = [
			// Face XY; Z = -0.5
            3, 2, 1,
            0, 3, 1,
            // Face XY; Z = 0.5
            4, 5, 6,
            4, 6, 7,
            // Face XZ; Y = -0.5
            4, 0, 5,
            0, 1, 5, 
			// Face XZ; Y = 0.5
			2, 3, 7,
			2, 7, 6,
            // Face YZ; X = -0.5
            7, 3, 0,
            4, 7, 0, 
			// Face YZ; X = 0.5
            1, 2, 6,
            1, 6, 5,



        ];
		
	this.primitiveType=this.scene.gl.TRIANGLES;
	this.initGLBuffers();
};
