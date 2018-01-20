 function MyPaperPlaneHandler(scene) {
 	CGFobject.call(this,scene);
	
	this.delta = 0;
	this.lastCurrTime = 0;

	this.first = 0;

	this.distanceX = 14;
	this.rotacao = Math.PI/100;
	this.distanceY = 4.5;
 	this.plane = new MyPaperPlane(this.scene);
 	this.plane.setTravelTime(1);
 	this.initBuffers();
 };

 MyPaperPlaneHandler.prototype = Object.create(CGFobject.prototype);
 MyPaperPlaneHandler.prototype.constructor = MyPaperPlaneHandler;

MyPaperPlaneHandler.prototype.display = function() {
	
	this.scene.pushMatrix();
	if (this.distanceX - 1 <= this.plane.travelTime) {
		if (this.distanceY + this.distanceX - 0.5 <= this.plane.travelTime)
		{
			this.scene.translate(-this.distanceX + 1, -this.distanceY + 0.5, 0);
		}
		else
		{	
			this.scene.translate(-this.distanceX + 1, 2.1, 0);
			this.scene.rotate(Math.PI / 2, 0, 0, 1);
			this.scene.rotate(this.rotacao, 1, 0, 0);
			this.scene.translate(-this.plane.travelTime + this.distanceX - 1, 0, 0);
			this.rotacao+= Math.PI/100;
		}
	}
	else
	{
		this.scene.translate(-this.plane.travelTime, 0+this.plane.travelTime/5, 0);
	}
	this.plane.display();
	this.scene.popMatrix();
	
};

 MyPaperPlaneHandler.prototype.update = function(currTime) {
 		
	this.delta = currTime - this.lastCurrTime;
    this.lastCurrTime = currTime;

	if (this.first == 0)
	{
		this.delta = 0;
		this.first = 1;
	}
 	this.plane.setTravelTime(this.plane.travelTime + 2 * (this.delta / 1000));
};