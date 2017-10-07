
/**
 * MyCylinderSurface
 * @param scene
 * @param height
 * @param bottom_radius radius of the bottom base
 * @param top_radius radius of the top base
 * @param stacks parts along height
 * @param slices parts per section
 * @constructor
 */

function MyCylinderSurface(scene, height, bottom_radius, top_radius, stacks, slices) {
    CGFobject.call(this,scene);

    this.height = height;
    this.bottom_radius = bottom_radius;
    this.top_radius = top_radius;
    this.stacks = stacks;
    this.slices = slices;

    this.initBuffers();
};

MyCylinderSurface.prototype = Object.create(CGFobject.prototype);
MyCylinderSurface.prototype.constructor = MyCylinderSurface;

/**
 * Initializes the buffers
 */

MyCylinderSurface.prototype.initBuffers = function() {

    this.vertices = [];
    this.indices = [];
    this.normals = [];
    this.texCoords = [];

    this.slicesAngle = (2* Math.PI)/ this.slices;
    this.stacksHigth = this.height / this.stacks;
    this.radiusRatio = (this.top_radius - this.bottom_radius) / this.stacks;

    for(var stack = 0; stack <= this.stacks; stack++){
        var z = stack * this.stacksHigth;
        var radius = this.bottom_radius + (stack * this.radiusRatio);


        for (var slice = 0; slice <= this.slices; slice++){
            var x = radius * Math.cos(slice*this.slicesAngle);
            var y = radius * Math.sin(slice*this.slicesAngle);

            this.vertices.push(x,y,z);
            this.normals.push(x,y, 0);
            this.texCoords.push(slice/this.slices, stack/this.stacks);

        }
    }

    // Adapted from http://richardssoftware.net/Home/Post/7

    for (var stack = 0; stack < this.stacks; stack++) {
        for (var slice = 0; slice < this.slices; slice++) {

            this.indices.push(stack*(this.slices + 1) + slice, (stack+1)*(this.slices + 1) + slice + 1, (stack+1)*(this.slices + 1) + slice);

            this.indices.push(stack*(this.slices + 1) + slice, stack*(this.slices + 1) + slice + 1, (stack+1)*(this.slices + 1) + slice + 1);
        }
    }


    this.primitiveType = this.scene.gl.TRIANGLES;
    this.initGLBuffers();
};
