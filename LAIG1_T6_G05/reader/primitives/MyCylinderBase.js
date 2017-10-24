/**
 * MyCylinderBase
 *
 * @param scene
 * @param radius
 * @param slices
 * @constructor
 */
function MyCylinderBase(scene, radius, slices) {
    CGFobject.call(this,scene);

    this.radius = radius;
    this.slices = slices;

    this.initBuffers();
};

MyCylinderBase.prototype = Object.create(CGFobject.prototype);
MyCylinderBase.prototype.constructor = MyCylinderBase;

/**
 * Initializes the buffers
 */

MyCylinderBase.prototype.initBuffers = function() {


    this.vertices = []; 
    this.indices = [];
    this.normals = [];
    this.texCoords = [];


    var ang = (2*Math.PI) / this.slices; //angle for each slice
    var index = 1; // Index 0 = center

    // Circle center
    this.vertices.push(0, 0, 0);
    this.normals.push(0, 0, 1);
    this.texCoords.push(0.5, 0.5);


    for (var slice = 0; slice <= this.slices; slice++) {
        var x = Math.cos(slice * ang);
        var y = Math.sin(slice * ang);

        this.vertices.push(this.radius * x, this.radius * y, 0);
        this.normals.push(0, 0, 1);
        this.texCoords.push(0.5 + 0.5 * x, 0.5 - 0.5 * y); //trigonometric circle shifted

        if (slice > 1)
            this.indices.push(index++, index, 0);
    }

    this.indices.push(0, index, 1);


    this.primitiveType = this.scene.gl.TRIANGLES;
    this.initGLBuffers();
};