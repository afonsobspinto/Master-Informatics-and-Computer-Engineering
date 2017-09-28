/**
 * MySphere
 * @param scene
 * @param radius Sphere radius
 * @param slices parts along radius
 * @param stacks parts per section
 * @constructor
 */
function MySphere(scene, radius, slices, stacks) {
    CGFobject.call(this,scene);

    this.radius = radius;
    this.slices = slices;
    this.stacks = stacks;

    this.initBuffers();
};

MySphere.prototype = Object.create(CGFobject.prototype);
MySphere.prototype.constructor = MySphere;

/**
 * Initializes the buffers
 */

MySphere.prototype.initBuffers = function() {

    this.vertices = [];
    this.normals = [];
    this.indices = [];
    this.texCoords = [];

    var ang_z = Math.PI*2/this.stacks;
    var ang_xy = 2*Math.PI / this.slices;

    // This code is adapted from http://learningwebgl.com/blog/?p=1253

    for(var j = 0; j < this.stacks+1; j++){

        for(var i = 0; i < this.slices; i++)
        {
            this.vertices.push(Math.cos(i * ang_xy)*Math.cos(j *ang_z) * this.radius,Math.sin(i * ang_xy)*Math.cos(j * ang_z)*this.radius, Math.sin(j*ang_z)*this.radius);
            this.normals.push(Math.cos(i * ang_xy)*Math.cos(j *ang_z),Math.sin(i * ang_xy)*Math.cos(j * ang_z), 0);
            this.texCoords.push(i/this.slices,j/this.stacks);
        }

    }

    for(var j = 0; j < this.stacks; j++){
        for(var i = 0; i < this.slices; i++)
        {
            this.indices.push(this.slices*j+i,this.slices*j+i+1,this.slices*(j+1)+i);
            if (i != (this.slices - 1)) {
                this.indices.push(this.slices*(j+1)+i+1,this.slices*(j+1)+i,this.slices*j+i+1);
            }
            else {
                this.indices.push(this.slices*j,this.slices*j+i+1,this.slices*j+i);
            }

        }

    }

    this.primitiveType = this.scene.gl.TRIANGLES;
    this.initGLBuffers();
};
