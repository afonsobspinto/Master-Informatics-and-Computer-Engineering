var degToRad = Math.PI / 180.0;

var BOARD_WIDTH = 6.0;
var BOARD_HEIGHT = 4.0;

var BOARD_A_DIVISIONS = 30;
var BOARD_B_DIVISIONS = 100;

function LightingScene() {
	CGFscene.call(this);
}

LightingScene.prototype = Object.create(CGFscene.prototype);
LightingScene.prototype.constructor = LightingScene;

LightingScene.prototype.init = function(application) {
	CGFscene.prototype.init.call(this, application);

	this.initCameras();

	this.enableTextures(true);

	this.initLights();

	this.gl.clearColor(0, 119/255, 190/255, 1.0);
	this.gl.clearDepth(100.0);
	this.gl.enable(this.gl.DEPTH_TEST);
	this.gl.enable(this.gl.CULL_FACE);
	this.gl.depthFunc(this.gl.LEQUAL);

	this.axis = new CGFaxis(this);

	// Scene elements

	this.cylinder = new MyCylinder(this, 8, 20);
	this.floor = new MyQuad(this, 0, 1, 0, 1);
	this.clock = new MyClock(this,12,1);
	this.submarine = new MySubmarine(this);
	this.explosion = null;

	this.materialDefault = new CGFappearance(this);

	this.windowAppearance = new CGFappearance(this);
	this.windowAppearance.setAmbient(0.4,0.2,0.0,1);
	this.windowAppearance.setDiffuse(1.0,1.0,1.0,1);
	this.windowAppearance.setSpecular(0.2,0.1,0.0,1);
	this.windowAppearance.setShininess(120);
	this.windowAppearance.loadTexture("../resources/images/window.png");
	this.windowAppearance.setTextureWrap("CLAMP_TO_EDGE","CLAMP_TO_EDGE");
	this.windowAppearance.setTextureWrap('REPEAT', 'REPEAT');

	this.clockAppearance = new CGFappearance(this);
	this.clockAppearance.loadTexture("../resources/images/clock.png");
	this.clockAppearance.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');
	this.clockAppearance.setSpecular(0.2, 0.2, 0.2, 1);
	this.clockAppearance.setShininess(10);
	this.clockAppearance.setDiffuse(0.8, 0.8, 0.8, 1);

	this.woodAppearance = new CGFappearance(this);
	this.woodAppearance.loadTexture("../resources/images/wood.png");
	this.woodAppearance.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');
	this.woodAppearance.setSpecular(0.2, 0.2, 0.2, 1);
	this.woodAppearance.setShininess(10);
	this.woodAppearance.setDiffuse(0.8, 0.8, 0.8, 1);

	this.oceanAppearance=new CGFappearance(this);
	this.oceanAppearance.setAmbient(1, 1, 1, 0.2);
	this.oceanAppearance.setDiffuse(1, 1, 1, 0.2);
	this.oceanAppearance.setSpecular(1, 1, 1, 0.3);
	this.oceanAppearance.setShininess(100);
    this.oceanAppearance.loadTexture("../resources/images/deepOcean.png");

    this.yellowAppearance=new CGFappearance(this);
	this.yellowAppearance.setAmbient(1, 1, 1, 0.2);
	this.yellowAppearance.setDiffuse(1, 1, 1, 0.2);
	this.yellowAppearance.setSpecular(1, 1, 1, 0.3);
	this.yellowAppearance.setShininess(100);
    this.yellowAppearance.loadTexture("../resources/images/yellow.png");

    this.redWoodAppearance=new CGFappearance(this);
	this.redWoodAppearance.setAmbient(1, 1, 1, 0.2);
	this.redWoodAppearance.setDiffuse(1, 1, 1, 0.2);
	this.redWoodAppearance.setSpecular(1, 1, 1, 0.3);
	this.redWoodAppearance.setShininess(100);
    this.redWoodAppearance.loadTexture("../resources/images/redWood.png");

	this.waterDropsAppearance=new CGFappearance(this);
	this.waterDropsAppearance.setAmbient(1, 1, 1, 0.2);
	this.waterDropsAppearance.setDiffuse(1, 1, 1, 0.2);
	this.waterDropsAppearance.setSpecular(1, 1, 1, 0.3);
	this.waterDropsAppearance.setShininess(100);
    this.waterDropsAppearance.loadTexture("../resources/images/waterDrops.png");

	this.portugalAppearance=new CGFappearance(this);
	this.portugalAppearance.setAmbient(1, 1, 1, 0.2);
	this.portugalAppearance.setDiffuse(1, 1, 1, 0.2);
	this.portugalAppearance.setSpecular(1, 1, 1, 0.3);
	this.portugalAppearance.setShininess(100);
    this.portugalAppearance.loadTexture("../resources/images/portugal.png");

	this.submarineAppearances = [this.materialDefault,this.yellowAppearance,this.redWoodAppearance,this.waterDropsAppearance];
    this.submarineAppearanceList = {};
    this.submarineAppearanceList["Default"] = 0;
    this.submarineAppearanceList["Yellow"] = 1;
    this.submarineAppearanceList["Red Wood"] = 2;
    this.submarineAppearanceList["Water Drops"] = 3;
    this.submarineAppearanceList["Portugal"] = 4;

    this.currSubmarineAppearance = "Yellow";

	this.dangerAppearance=new CGFappearance(this);
	this.dangerAppearance.setAmbient(1, 1, 1, 0.2);
	this.dangerAppearance.setDiffuse(1, 1, 1, 0.2);
	this.dangerAppearance.setSpecular(1, 1, 1, 0.3);
	this.dangerAppearance.setShininess(100);
    this.dangerAppearance.loadTexture("../resources/images/danger.png");

	this.trumpAppearance=new CGFappearance(this);
	this.trumpAppearance.setAmbient(1, 1, 1, 0.2);
	this.trumpAppearance.setDiffuse(1, 1, 1, 0.2);
	this.trumpAppearance.setSpecular(1, 1, 1, 0.3);
	this.trumpAppearance.setShininess(100);
    this.trumpAppearance.loadTexture("../resources/images/trump.png");

    this.explosionAppearance=new CGFappearance(this);
	this.explosionAppearance.setAmbient(1, 1, 1, 0.2);
	this.explosionAppearance.setDiffuse(1, 1, 1, 0.2);
	this.explosionAppearance.setSpecular(1, 1, 1, 0.3);
	this.explosionAppearance.setShininess(100);
    this.explosionAppearance.loadTexture("../resources/images/explosion.png");

	this.targetsAppearances = [this.materialDefault, this.dangerAppearance, this.trumpAppearance];
    this.targetsAppearanceList = {};
    this.targetsAppearanceList["Default"] = 0;
    this.targetsAppearanceList["Danger"] = 1;
    this.targetsAppearanceList["Trump"] = 2;

    this.currTargetAppearance = "Danger";

	
    // Targets
	this.targets = [];
    this.targetsList = {};
    this.targetsList["1"] = 0;
    this.targetsList["2"] = 1;
    this.targetsList["3"] = 2;

    this.currTargets = "2";
    this.currTargetsOld = parseInt(this.currTargets);
    this.resetTargets();


	this.setUpdatePeriod(1000 / 60);
	this.ligth0=true;
	this.ligth1=true; 
    this.ligth2=true;
    this.ligth3=false;
	this.ligth4=false; 
   
	this.lightsVec = new Array(5);
    this.enableClock = true;
    //this.speed=3;
};

LightingScene.prototype.initCameras = function() {
	this.camera = new CGFcamera(0.4, 0.1, 500, vec3.fromValues(30, 30, 30), vec3.fromValues(0, 0, 0));
};

LightingScene.prototype.initLights = function() {
	this.setGlobalAmbientLight(0, 0 ,0, 1);
	
	// Positions for lights
	this.lights[0].setPosition(5, 5, 5, 1);
	this.lights[0].setVisible(true);
	
	this.lights[1].setPosition(-5, 5, 5, 1);
	this.lights[1].setVisible(true);

	this.lights[2].setPosition(10.5, 6.0, 5.0, 1.0);
	this.lights[2].setVisible(true);
	
	this.lights[3].setPosition(3, 2, 12, 1);
	this.lights[3].setVisible(true);

	this.lights[4].setPosition(12, 2, 10, 1);
	this.lights[4].setVisible(true);

	this.lights[0].setAmbient(0, 0, 0, 1);
	this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
	this.lights[0].setSpecular(1.0, 1.0, 1.0, 1.0);
	this.lights[0].enable();

	this.lights[1].setAmbient(0, 0, 0, 1);
	this.lights[1].setDiffuse(1.0, 1.0, 1.0, 1.0);
	this.lights[1].setSpecular(1.0, 1.0, 1.0, 1.0);
	this.lights[1].enable();

	this.lights[2].setAmbient(0, 0, 0, 1);
	this.lights[2].setDiffuse(1.0, 1.0, 1.0, 1.0);
	this.lights[2].setSpecular(1.0, 1.0, 1.0, 1.0);
	this.lights[2].enable();

	this.lights[3].setAmbient(0, 0, 1, 1);
	this.lights[3].setDiffuse(0, 0, 1.0, 1.0);
	this.lights[3].setSpecular(0, 0, 1.0, 1.0);
	this.lights[3].setLinearAttenuation(1);
    this.lights[3].setConstantAttenuation(0);
	this.lights[3].enable();

	this.lights[4].setAmbient(0, 1, 0, 1);
	this.lights[4].setDiffuse(0, 1.0, 0, 1.0);
	this.lights[4].setSpecular(0, 1.0, 0, 1.0);
	this.lights[4].setConstantAttenuation(0);
    this.lights[4].setQuadraticAttenuation(0.2);
	this.lights[4].enable();

};

LightingScene.prototype.updateLights = function() {
	this.lightsVec[0] = this.ligth0;
	this.lightsVec[1] = this.ligth1;
	this.lightsVec[2] = this.ligth2;
	this.lightsVec[3] = this.ligth3;
	this.lightsVec[4] = this.ligth4;
	
	for(i=0; i < this.lights.length; i++){
		this.lights[i].update();
		if(this.lightsVec[i])
			this.lights[i].enable();
		else
			this.lights[i].disable();
		this.lights[i].setVisible[this.lightsVec[i]];
	}
}


LightingScene.prototype.display = function() {
	// ---- BEGIN Background, camera and axis setup

	// Clear image and depth buffer everytime we update the scene
	this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
	this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);

	// Initialize Model-View matrix as identity (no transformation)
	this.updateProjectionMatrix();
	this.loadIdentity();

	// Apply transformations corresponding to the camera position relative to the origin
	this.applyViewMatrix();

	// Update all lights used
	this.updateLights();

	// Draw axis
	this.axis.display();

    this.materialDefault.apply();

	// ---- END Background, camera and axis setup


	// ---- BEGIN Primitive drawing section
 
 	// Ocean
	this.pushMatrix();
		this.translate(7.5, 0, 7.5);
		this.rotate(-90 * degToRad, 1, 0, 0);
		this.scale(15, 15, 0.2);
		this.oceanAppearance.apply();
		this.floor.display();
	this.popMatrix();

    // Clock

    this.pushMatrix();
        this.translate(8, 5, 0);
		this.rotate(Math.PI, 1, 0, 0);
		this.scale(0.7, 0.7, 0.4);
		this.clockAppearance.apply();
		this.clock.display();
	this.popMatrix();

	// Post

    this.pushMatrix();
    this.translate(8,0,-0.05);
	this.rotate(90 * degToRad, -1, 0, 0);
	this.scale(0.1,0.1,4.35);
	this.woodAppearance.apply();
    this.cylinder.display();
    this.popMatrix();

	// Submarine

	this.pushMatrix();
		if(this.currSubmarineAppearance == "Portugal"){
			this.submarine.portugal(true);
			this.submarine.display();
		}
		else{
			this.submarine.portugal(false);
			this.submarineAppearances[this.submarineAppearanceList[this.currSubmarineAppearance]].apply();
			this.submarine.display();
		}
	this.popMatrix();

    // Targets

	for(var i = 0; i < this.targets.length; i++){
		if(this.targets[i] != null){
			this.pushMatrix();
			this.targetsAppearances[this.targetsAppearanceList[this.currTargetAppearance]].apply();
			this.targets[i].display();
			this.popMatrix();
		}
	}
					
	if(this.explosion != null){
		this.pushMatrix();
		this.explosionAppearance.apply();
			this.explosion.display();
			if(this.explosion.getEnd())
				this.explosion =  null;
		this.popMatrix();
	}


	// ---- END Primitive drawing section
};

LightingScene.prototype.update = function(currTime) {
	if(this.enableClock){
 		this.clock.update(currTime);
 	}
 	this.lastTime = this.lastTime || 0;
    this.time = currTime - this.lastTime;
    this.lastTime = currTime;
    this.submarine.updatePosition(this.time);
    if(this.explosion != null)
    	this.explosion.update(currTime);

    if(parseInt(this.currTargets)!=this.currTargetsOld){
    	console.log("update");
    	this.currTargetsOld = parseInt(this.currTargets);
    	this.resetTargets();

    }
};

LightingScene.prototype.resetTargets = function ()
{ 
	this.targets = [];
	for(var i = 0; i < parseInt(this.currTargets); i++)
		this.targets.push(new MyTarget(this, Math.floor((Math.random() * 10) + 1), Math.floor((Math.random() * 10) + 1)));
};

LightingScene.prototype.doClock = function ()
{ 
	this.enableClock = !this.enableClock;
};

LightingScene.prototype.subRotate = function(angle){
    this.submarine.rotate(angle);
};

LightingScene.prototype.increaseVelocity = function(){
    this.submarine.increaseVelocity();
};


LightingScene.prototype.decreaseVelocity = function(){
    this.submarine.decreaseVelocity();
};

LightingScene.prototype.setInclination = function (deltaInclination){
    this.submarine.setInclination(deltaInclination);
}

LightingScene.prototype.setPeriscopeHeight = function(deltaHeight) {
    this.submarine.setPeriscopeHeight(deltaHeight);
}

LightingScene.prototype.activateTorpedo = function(){
	if(this.targets.length> 0){
		this.submarine.lockTarget(this.targets[0].getPos());
    	this.submarine.activateTorpedo(true);
    }
}

LightingScene.prototype.destroy = function(){
	
	this.explosion = new MyExplosion(this, this.targets[0]);
	this.targets.shift();
	this.submarine.destroy();
}
