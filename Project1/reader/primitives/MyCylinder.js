
/**
 * MyCylinder
 * @param scene
 * @param height
 * @param bottom_radius radius of the bottom base
 * @param top_radius radius of the top base
 * @param stacks parts along height
 * @param slices parts per section
 * @constructor
 */

function MyCylinder(scene, height, bottom_radius, top_radius, stacks, slices) {
    CGFobject.call(this,scene);

    this.height = height;
    this.bottom_radius = bottom_radius;
    this.top_radius = top_radius;
    this.stacks = stacks;
    this.slices = slices;

    this.initBuffers();
};

MyCylinder.prototype = Object.create(CGFobject.prototype);
MyCylinder.prototype.constructor = MyCylinder;

/**
 * Initializes the buffers
 */

MyCylinder.prototype.initBuffers = function() {

    this.vertices = [];
    this.indices = [];
    this.normals = [];
    this.texCoords = [];

    var ang = 2*Math.PI/this.slices;

    var radiusDiffOnStacks = (this.top_radius - this.bottom_radius)/this.stacks;

    for(var j = 0; j < this.stacks+1; j++){
        var radiusCorrection = this.bottom_radius + j * radiusDiffOnStacks;

        for(var i = 0; i < this.slices; i++)
        {

            var radiusDiffOnHeight = Math.atan(Math.abs(this.top_radius-this.bottom_radius)/this.height);

            this.vertices.push(Math.cos(i * ang) * radiusCorrection,Math.sin(i * ang)  * radiusCorrection, this.height * j/this.stacks);
            this.normals.push(Math.cos(i * ang) * Math.cos(radiusDiffOnHeight),Math.sin(i * ang) * Math.cos(radiusDiffOnHeight), Math.sin(radiusDiffOnHeight));
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

//TODO: Adicionar Tampas e TextCoords