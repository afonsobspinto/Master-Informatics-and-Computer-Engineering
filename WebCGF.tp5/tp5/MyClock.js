/**
 * MyClock
 * @constructor
 */
 function MyClock(scene, slices, stacks) {
 	CGFobject.call(this,scene);
	
	this.deltaTime = 0;
	this.lastCurrTime = 0;
	this.firstFlag = 0;

	this.slices = slices;
	this.stacks = stacks;

	this.body = new MyCylinder(this.scene, this.slices, this.stacks);
	this.body.initBuffers();

	this.top = new MyCircle(this.scene, this.slices);
	this.top.initBuffers();

	this.hours = new MyClockHand(this.scene);
	this.hours.initBuffers();
	this.seconds = new MyClockHand(this.scene);
	this.seconds.initBuffers();
	this.minutes = new MyClockHand(this.scene);
	this.minutes.initBuffers();

	this.minutes.setAngle(180);
	this.hours.setAngle(90);
	this.seconds.setAngle(270);

	this.material = new CGFappearance(this.scene);
	this.material.setAmbient(0.5, 0.5, 0.5, 1);
	this.material.setDiffuse(0.5, 0.5, 0.5, 1);
	this.material.setSpecular(0.5, 0.5, 0.5, 1);
	this.material.setShininess(40);

 };

 MyClock.prototype = Object.create(CGFobject.prototype);
 MyClock.prototype.constructor = MyClock;

 MyClock.prototype.display = function() {
   this.scene.pushMatrix();
	this.top.display();
	this.scene.popMatrix();

	this.scene.pushMatrix();
	this.material.apply();
	this.scene.scale(1, 1, 0.3);
	this.body.display();
	this.scene.popMatrix();

	this.scene.pushMatrix();
	this.material.apply();
	this.scene.rotate(Math.PI, 1, 0, 0);
	this.scene.rotate(-this.seconds.angle * Math.PI / 180, 0, 0, 1);
	this.seconds.display();
	this.scene.popMatrix();
	
	this.scene.pushMatrix();
	this.material.apply();
	this.scene.rotate(Math.PI, 1, 0, 0);
	this.scene.rotate(-this.minutes.angle * Math.PI / 180, 0, 0, 1);
	this.scene.scale(1, 0.7, 1);
	this.minutes.display();
	this.scene.popMatrix();

	this.scene.pushMatrix();
	this.material.apply();
	this.scene.rotate(Math.PI, 1, 0, 0);
	this.scene.rotate(-this.hours.angle * Math.PI / 180, 0, 0, 1);
	this.scene.scale(1, 0.4, 1);
	this.hours.display();
	this.scene.popMatrix();
 };

MyClock.prototype.update = function(currTime) {
	
	this.delta = currTime - this.lastCurrTime;
    this.lastCurrTime = currTime;

	if (this.firstFlag == 0)
	{
		this.delta = 0;
		this.firstFlag = 1;
	}
 	this.seconds.setAngle(this.seconds.angle + 360 / 60 * (this.delta / 1000));
 	this.minutes.setAngle(this.minutes.angle + 360 / (60 * 60) * (this.delta / 1000));
 	this.hours.setAngle(this.hours.angle + 360 / (60 * 60 * 60) * (this.delta / 1000));
};