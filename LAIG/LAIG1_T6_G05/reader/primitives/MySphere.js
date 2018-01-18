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
}

MySphere.prototype = Object.create(CGFobject.prototype);
MySphere.prototype.constructor = MySphere;

/**
 * Initializes the buffers
 */

MySphere.prototype.initBuffers = function() {

    let slice;
    let stack;
    this.vertices = [];
    this.indices = [];
    this.normals = [];
    this.texCoords = [];

    // Adapted from http://richardssoftware.net/Home/Post/7

    this.slicesAngle = (2* Math.PI)/ this.slices;
    this.stacksAngle = Math.PI / this.stacks;

    for(stack = 0; stack <= this.stacks; stack++){
        var phi = stack * this.stacksAngle;
        var cosPhi = Math.cos(phi);
        var sinPhi = Math.sin(phi);

        for (slice = 0; slice <= this.slices; slice++){
            var theta = slice * this.slicesAngle;
            var cosTheta = Math.cos(theta);
            var sinTheta = Math.sin(theta);

            var x = this.radius * cosTheta * sinPhi;
            var y = this.radius * cosPhi;
            var z = this.radius * sinPhi * sinTheta;

            this.vertices.push(x,y,z);
            this.normals.push(x,y,z);
            this.texCoords.push(slice/this.slices, stack/this.stacks);

        }
    }

    for (stack = 0; stack < this.stacks; stack++) {
        for (slice = 0; slice < this.slices; slice++) {

            this.indices.push(stack*(this.slices + 1) + slice, (stack+1)*(this.slices + 1) + slice + 1, (stack+1)*(this.slices + 1) + slice);

            this.indices.push(stack*(this.slices + 1) + slice, stack*(this.slices + 1) + slice + 1, (stack+1)*(this.slices + 1) + slice + 1);
        }
    }


    this.primitiveType = this.scene.gl.TRIANGLES;
    this.initGLBuffers();
};

