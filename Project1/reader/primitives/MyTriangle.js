/**
 * MyTriangle
 * @param scene
 * @param vertex1
 * @param vertex2
 * @param vertex3
 * @constructor
 */

function MyTriangle(scene, vertex1, vertex2, vertex3){
    CGFobject.call(this, scene);

    this.vertex1 = vertex1;
    this.vertex2 = vertex2;
    this.vertex3 = vertex3;

    this.initBuffers();
};

MyTriangle.prototype = Object.create(CGFobject.prototype);
MyTriangle.prototype.constructor = MyTriangle;


/**
 * Initializes the buffers
 */

MyTriangle.prototype.initBuffers = function() {

    this.vertices = [
        this.vertex1.x, this.vertex1.y, this.vertex1.z,
        this.vertex2.x, this.vertex2.y, this.vertex2.z,
        this.vertex3.x, this.vertex3.y, this.vertex3.z
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
}