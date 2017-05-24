function MyTorpedo(scene){
    CGFobject.call(this, scene);

    this.x = 0;
    this.y = 0;
    this.z = 0;
    this.angle = 0;
    this.inclination = 0;
    this.P1 = [0,0,0];
    this.P2 = [0,0,0];
    this.P3 = [0,0,0];
    this.P4 = [0,0,0];

    this.distance = 0;
    this.t = 0;

    this.cylinder = new MyCylinder(scene,20,20);
    this.frontSemisphere = new MyLamp(scene,20,20);
    this.backSemisphere = new MyLamp(scene,20,20);
    this.horizontalTrapezoid = new MyTrapezoid(scene);
    this.verticalTrapezoid = new MyTrapezoid(scene);
}

MyTorpedo.prototype = Object.create(CGFobject.prototype);
MyTorpedo.prototype.constructor=MyTorpedo;

MyTorpedo.prototype.display = function(){
    
    this.scene.pushMatrix();

    this.scene.translate(this.x, this.y, this.z);
    this.scene.rotate(this.inclination, 0, 1, 0);
    this.scene.rotate(-this.angle, 1, 0, 0);

     
    // Cylinder
    this.scene.pushMatrix();
        this.scene.scale(0.2, 0.2, 1);
        this.cylinder.display();
    this.scene.popMatrix();

    // Front Semisphere
    this.scene.pushMatrix();
        this.scene.translate(0,0,1);
        this.scene.scale(0.2,0.2,0.2);
        this.frontSemisphere.display();
    this.scene.popMatrix();

    // Back Semisphere
    this.scene.pushMatrix();
        this.scene.rotate(Math.PI,0,1,0);
        this.scene.scale(0.2,0.2,0.2);
        this.backSemisphere.display();
    this.scene.popMatrix();

    // Horizontal Trapezoid
    this.scene.pushMatrix();
        this.scene.rotate(Math.PI/2,0,1,0);
        this.scene.rotate(Math.PI,0,1,0);
        this.scene.scale(1,1,1);
        this.horizontalTrapezoid.display();
    this.scene.popMatrix();

    // Vertical Trapezoid
    this.scene.pushMatrix();
        this.scene.rotate(Math.PI/2,1,0,0);
        this.scene.rotate(Math.PI/2,0,0,1);
        this.scene.scale(1,1,1);
        this.verticalTrapezoid.display();
    this.scene.popMatrix();

    this.scene.popMatrix();
}

MyTorpedo.prototype.lockTarget = function(targetPos){
    this.P3 = [targetPos[0],3,targetPos[1]];
    this.P4 = [targetPos[0],0,targetPos[1]];
}

MyTorpedo.prototype.setPos = function(angle,inclination,x,y,z){
    this.x = x;
    this.y = y;
    this.z = z;
    this.angle = angle;
    this.P1 = [x,y,z];
    this.P2 = [6*Math.sin(angle)+x,y,6*Math.cos(angle)+z];
    this.distance = Math.sqrt(Math.pow(this.P4[0] - this.P1[0], 2) 
                            + Math.pow(this.P4[1] - this.P1[1], 2) 
                            + Math.pow(this.P4[2] - this.P1[2], 2));
}

MyTorpedo.prototype.updatePosition = function (time){
    if(this.t <= 1){
        var t = this.t;
        
        oldx = this.x;
        oldy = this.y;
        oldz = this.z;

        this.x = Math.pow((1-t), 3) * this.P1[0] + 
            3*t* Math.pow((1-t), 2) * this.P2[0] + 
            3*t*t* (1-t) * this.P3[0] + 
            t*t*t* this.P4[0];

        this.y = Math.pow((1-t), 3) * this.P1[1] + 
            3*t* Math.pow((1-t), 2) * this.P2[1] + 
            3*t*t* (1-t) * this.P3[1] + 
            t*t*t* this.P4[1];

        this.z = Math.pow((1-t), 3) * this.P1[2] + 
            3*t* Math.pow((1-t), 2) * this.P2[2] + 
            3*t*t* (1-t) * this.P3[2] + 
            t*t*t* this.P4[2];

        this.inclination =  Math.atan((this.x-oldx) / (this.z-oldz)) + ((this.z-oldz) < 0 ? Math.PI : 0);
        this.angle = Math.atan((this.y-oldy) / Math.sqrt(Math.pow((this.x-oldx),2) + Math.pow((this.y-oldy),2) + Math.pow((this.z-oldz),2)));

        this.t += (time/1000)/this.distance;
    }
    else {
        this.scene.submarine.activateTorpedo(false);
        this.scene.destroy();
        this.t = 0;
    }
    
}