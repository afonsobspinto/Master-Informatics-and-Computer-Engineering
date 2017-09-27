function MyRectangle(scene, vertex1, vertex2, minS, maxS, minT, maxT){ //vertex1 -> left-top, vertex2 -> right-bottom
    CGFobject.call(this, scene);

    this.vertex1 = vertex1;
    this.vertex2 = vertex2;

    this.minS = minS || 0.0;
    this.maxS = maxS || 1.0;
    this.minT = minT || 0.0;
    this.maxT = maxT || 1.0;

    this.initBuffers();
};

MyRectangle.prototype = Object.create(CGFobject.prototype);
MyRectangle.prototype.constructor = MyRectangle;

MyRectangle.prototype.initBuffers = function() {

    this.vertices = [
        this.vertex1.x, this.vertex1.y, 0,
        this.vertex2.x, this.vertex1.y, 0,
        this.vertex2.x, this.vertex2.y, 0,
        this.vertex1.x, this.vertex2.y, 0
    ];

    this.indices = [
        2, 1, 0,
        0, 3, 2
    ];

    this.normals = [
        0, 0, 1,
        0, 0, 1,
        0, 0, 1,
        0, 0,1
    ];

    this.texCoords = [
        this.minS,this.maxT,
        this.maxS,this.maxT,
        this.minS,this.minT,
        this.maxS,this.minT
    ];

    this.primitiveType = this.scene.gl.TRIANGLES;
    this.initGLBuffers();
}