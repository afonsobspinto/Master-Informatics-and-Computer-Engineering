
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

function MyCylinder(scene, height, bottom_radius, top_radius, stacks, slices, hasTopCap, hasBottomCap) {
    CGFobject.call(this,scene);

    this.height = height;
    this.hasTopCap = hasTopCap;
    this.hasBottomCap = hasBottomCap;

    this.surface = new MyCylinderSurface(scene, height, bottom_radius, top_radius, stacks, slices);
    if(hasTopCap)
        this.top = new MyCylinderBase(scene, top_radius, slices);
    if(hasBottomCap)
        this.base = new MyCylinderBase(scene, bottom_radius, slices);

    this.initBuffers();
};

MyCylinder.prototype = Object.create(CGFobject.prototype);
MyCylinder.prototype.constructor = MyCylinder;

/**
 * Displays the cylinder's parts as one
 */

MyCylinder.prototype.display = function() {

    this.surface.display();

    if (this.hasBottomCap) {
        this.scene.pushMatrix();
        this.scene.rotate(Math.PI, 0, 1, 0);
        this.scene.rotate(Math.PI, 0, 0, 1);
        this.base.display();
        this.scene.popMatrix();
    }

    if (this.hasTopCap) {
        this.scene.pushMatrix();
        this.scene.translate(0, 0, this.height);
        this.top.display();
        this.scene.popMatrix();
    }
};

