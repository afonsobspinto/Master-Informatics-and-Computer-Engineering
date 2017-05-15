
function MySubmarine(scene) {

    CGFobject.call(this, scene);
    this.angle = Math.PI;
    this.x = 8;
    this.z = 8;
    this.vx = 0;
    this.vz = 0;
    this.a = 0;

    this.mainCylinder = new MyCylinder(scene,20,20);
    this.frontSemisphere = new MyLamp(scene,20,20);
    this.backSemisphere = new MyLamp(scene,20,20);
    this.topCylinder = new MyCylinder(scene,20,20);
    this.periscope = new MyCylinder(scene,20,20);
    this.topPeriscope = new MyCylinder(scene,20,20);
    this.topCylinderBase = new MyCircle(scene,20);
    this.topPeriscopeBase = new MyCircle(scene,20);
    this.firstPropeller = new MyCylinder(scene,20,20);
    this.secondPropeller = new MyCylinder(scene,20,20);
    this.firstPropellerSemisphere = new MyLamp(scene,20,20);
    this.secondPropellerSemisphere = new MyLamp(scene,20,20);
    this.firstPropellerParallelepiped = new MyParallelepiped(scene,1,1,3);
    //this.secondPropellerParallelepiped = new MyParallelepiped();
    //this.frontTrapezoid = new MyTrapezoid();
    //this.horizontalTrapezoid = new MyTrapezoid();
    //this.verticalTrapezoid = new MyTrapezoid();
};

MySubmarine.prototype = Object.create(CGFobject.prototype);
MySubmarine.prototype.constructor = MyTriangle;
MySubmarine.prototype.display = function() {
    
    // Main Cylinder
    this.scene.pushMatrix();
        this.scene.translate(this.x,5,this.z);
        this.scene.rotate(this.angle,0,1,0);
        this.scene.rotate(-this.a/10,1,0,0);
        this.scene.scale(0.73,1,4.08);
		this.mainCylinder.display();
	this.scene.popMatrix();

	// Front Semisphere
    this.scene.pushMatrix();
        this.scene.translate(this.x,5,this.z);
        this.scene.rotate(this.angle,0,0,0);
        this.scene.rotate(-this.a/10,1,0,0);
        this.scene.scale(0.73,1,1);
        this.frontSemisphere.display();
	this.scene.popMatrix();

	// Back Semisphere
	this.scene.pushMatrix();
        this.scene.translate(this.x,5,this.z-4.08);
        this.scene.rotate(this.angle,0,1,0);
        this.scene.rotate(-this.a/10,1,0,0);
        this.scene.scale(0.73,1,1);
        this.backSemisphere.display();
	this.scene.popMatrix();

	// Top Cylinder
	this.scene.pushMatrix();
        this.scene.translate(this.x,5.8,this.z-1);
        this.scene.rotate(this.angle,0,1,1);
        this.scene.rotate(-this.a/10,1,0,0);
        this.scene.scale(0.73,0.57,1);
		this.topCylinder.display();
	this.scene.popMatrix();

	// Periscope
	this.scene.pushMatrix();
        this.scene.translate(this.x,6.7,this.z-0.7);
        this.scene.rotate(this.angle,0,1,1);
        this.scene.rotate(-this.a/10,1,0,0);
        this.scene.scale(0.1,0.1,1);
		this.periscope.display();
	this.scene.popMatrix();

	// Top Periscope
	this.scene.pushMatrix();
        this.scene.translate(this.x,7.6,this.z-0.75);
        this.scene.rotate(this.angle,0,0,1);
        this.scene.rotate(-this.a/10,1,0,0);
        this.scene.scale(0.1,0.1,0.3);
		this.topPeriscope.display();
	this.scene.popMatrix();

	// Top Cylinder Base
	this.scene.pushMatrix();
		this.scene.translate(this.x,6.8,this.z-1);
        this.scene.rotate(this.angle,0,1,-1);
        this.scene.rotate(-this.a/10,1,0,0);
        this.scene.scale(0.73,0.57,1);
		this.topCylinderBase.display();
	this.scene.popMatrix();

	// Top Periscope Base
	this.scene.pushMatrix();
		this.scene.translate(this.x,7.6,this.z-0.5);
        this.scene.rotate(this.angle,0,1,0);
        this.scene.rotate(-this.a/10,1,0,0);
        this.scene.scale(0.1,0.1,0.3);
		this.topPeriscopeBase.display();
	this.scene.popMatrix();

	// First Propeller
	this.scene.pushMatrix();
		this.scene.translate(this.x+1,4.3,this.z-4.08);
        this.scene.rotate(this.angle,0,0,1);
        this.scene.rotate(-this.a/10,1,0,0);
        this.scene.scale(0.4,0.4,0.5);
		this.firstPropeller.display();
	this.scene.popMatrix();

	// Second Propeller
	this.scene.pushMatrix();
		this.scene.translate(this.x-1,4.3,this.z-4.08);
        this.scene.rotate(this.angle,0,0,1);
        this.scene.rotate(-this.a/10,1,0,0);
        this.scene.scale(0.4,0.4,0.5);
		this.firstPropeller.display();
	this.scene.popMatrix();

	// First Propeller Semisphere
	this.scene.pushMatrix();
        this.scene.translate(this.x+1,4.3,this.z-4);
        this.scene.rotate(this.angle,0,1,0);
        this.scene.rotate(-this.a/10,1,0,0);
        this.scene.scale(0.1,0.1,0.1);
		this.firstPropellerSemisphere.display();
	this.scene.popMatrix();

	// Second Propeller Semisphere
	this.scene.pushMatrix();
        this.scene.translate(this.x-1,4.3,this.z-4);
        this.scene.rotate(this.angle,0,1,0);
        this.scene.rotate(-this.a/10,1,0,0);
        this.scene.scale(0.1,0.1,0.1);
		this.secondPropellerSemisphere.display();
	this.scene.popMatrix();

	// First Propeller Parallelepiped
	this.scene.pushMatrix();
        this.scene.translate(this.x,8,this.z);
        //this.scene.rotate(this.angle,0,1,0);
        //this.scene.rotate(-this.a/10,1,0,0);
        //this.scene.scale(0.1,0.1,0.1);
		this.firstPropellerParallelepiped.display();
	this.scene.popMatrix();

};

MySubmarine.prototype.rotate = function(angle){
    this.angle += angle * Math.PI / 180.0;
}

MySubmarine.prototype.translate = function(a){
    this.a = a;
}

MySubmarine.prototype.updatePosition = function(t){
    this.time = t / 500;

    // Water Resistence
    this.rx = - this.vx * this.vx; 
    this.rz = - this.vz * this.vz; 

    if (this.vx < 0)
        this.rx = 0 - this.rx;
    if (this.vz < 0)
        this.rz = 0 - this.rz;
    
    // Acceleration
    this.ax = this.a * Math.cos(this.angle - Math.PI/2) + this.rx;
    this.az = this.a * Math.sin(this.angle + Math.PI/2) + this.rz;

    // Velocity
    this.vx = this.vx + this.ax * this.time;
    this.vz = this.vz + this.az * this.time;
    
    if (this.vx > -0.1 && this.vx < 0.1)
        this.vx = 0;
  
    if (this.vz > -0.1 && this.vz < 0.1)
        this.vz = 0;

    if (this.vx > 4)
        vx = 4;
    else if (this.vx < -4)
        vx = -4;
    if(this.vz > 4)
        vz = 4;
    else if (this.vz < -4)
        vz = -4;


    // Position
    this.x = this.x + this.time*(this.vx + this.ax/2);
    this.z = this.z + this.time*(this.vz + this.az/2);
    
    this.a /= 1.5;
}