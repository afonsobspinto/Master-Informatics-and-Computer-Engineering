
function MyTrapezoid(scene) {
    CGFobject.call(this, scene);

    this.parallelepiped = new MyUnitCubeQuad(scene);
    this.prism = new MyPrism(scene);
    
};

MyTrapezoid.prototype = Object.create(CGFobject.prototype);
MyTrapezoid.prototype.constructor = MyTrapezoid;

MyTrapezoid.prototype.display  = function() {

    // Parallelepiped
    this.scene.pushMatrix();
        this.scene.scale(0.15, 0.1, 0.7);
        this.parallelepiped.display();
    this.scene.popMatrix();
    
    // Prism
    this.scene.pushMatrix();  
        this.scene.translate(-0.07,0.05,-0.35);
        this.scene.rotate(Math.PI,1,0,0);
        this.scene.scale(0.23,1,0.15);
        this.prism.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();  
        this.scene.translate(-0.07,-0.05,0.35);
        this.scene.scale(0.23,1,0.15);
        this.prism.display();
    this.scene.popMatrix();

 };