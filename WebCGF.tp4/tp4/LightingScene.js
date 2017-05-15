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

	this.gl.clearColor(0.0, 0.0, 0.0, 1.0);
	this.gl.clearDepth(100.0);
	this.gl.enable(this.gl.DEPTH_TEST);
	this.gl.enable(this.gl.CULL_FACE);
	this.gl.depthFunc(this.gl.LEQUAL);

	this.axis = new CGFaxis(this);

	// Scene elements
	this.prism = new MyPrism(this, 8, 20);
	this.cylinder = new MyCylinder(this, 8, 20);
	this.cylinder2 = new MyCylinder(this, 6, 15);
	this.lamp = new MyLamp(this, 100, 20);
	this.table = new MyTable(this);
	this.wall = new Plane(this);
	this.wallLeft = new MyQuad(this, -1.0, 2.0, -1.0, 2.0);
	this.floor = new MyQuad(this, 0, 10, 0, 12);
	
	this.boardA = new Plane(this, BOARD_A_DIVISIONS);
	this.boardB = new Plane(this, BOARD_B_DIVISIONS);	// Materials
	this.materialDefault = new CGFappearance(this);

	//this.clock = new MyClock(this,12,1);

	this.materialA = new CGFappearance(this);
	this.materialA.setAmbient(0.3,0.3,0.3,1);
	this.materialA.setDiffuse(0.6,0.6,0.6,1);
	this.materialA.setSpecular(0.2,0.2,0.2,1.0);
	this.materialA.setShininess(120);

	this.materialB = new CGFappearance(this);
	this.materialB.setAmbient(0.3,0.3,0.3,1);
	this.materialB.setDiffuse(0.6,0.6,0.6,1);
	this.materialB.setSpecular(0.8,0.8,0.8,1.0);	
	this.materialB.setShininess(120);

	this.color1 = new CGFappearance(this);
	this.color1.setAmbient(0.4,0.2,0,1);
	this.color1.setDiffuse(1.0,0.0,0.0,1);
	this.color1.setSpecular(0.8,0.8,0.8,1.0);
	this.color1.setShininess(120);

 	this.color2 = new CGFappearance(this);
 	this.color2.setAmbient(0.4,0.2,0,1);
	this.color2.setDiffuse(0.0,1.0,0.0,1);
 	this.color2.setSpecular(0.8,0.8,0.8,1.0);
 	this.color2.setShininess(120);

 	this.color3 = new CGFappearance(this);
 	this.color3.setAmbient(0.4,0.2,0,1);
	this.color3.setDiffuse(0.0,0.0,1.0,1);
 	this.color3.setSpecular(0.8,0.8,0.8,1.0);
 	this.color3.setShininess(120);

 	this.floorAppearance = new CGFappearance(this);
	this.floorAppearance.setAmbient(0.4,0.2,0.0,1);
	this.floorAppearance.setDiffuse(1.0,1.0,1.0,1);
	this.floorAppearance.setSpecular(0.2,0.1,0.0,1);
	this.floorAppearance.setShininess(120);
	this.floorAppearance.loadTexture("../resources/images/floor.png");

	this.windowAppearance = new CGFappearance(this);
	this.windowAppearance.setAmbient(0.4,0.2,0.0,1);
	this.windowAppearance.setDiffuse(1.0,1.0,1.0,1);
	this.windowAppearance.setSpecular(0.2,0.1,0.0,1);
	this.windowAppearance.setShininess(120);
	this.windowAppearance.loadTexture("../resources/images/window.png");
	this.windowAppearance.setTextureWrap("CLAMP_TO_EDGE","CLAMP_TO_EDGE");

	this.slidesAppearance = new CGFappearance(this);
	this.slidesAppearance.setAmbient(0.3,0.3,0.3,1);
	this.slidesAppearance.setDiffuse(1.0,1.0,1.0,1);
	this.slidesAppearance.setSpecular(0.1,0.1,0.0,1);
	this.slidesAppearance.setShininess(20);
	this.slidesAppearance.loadTexture("../resources/images/slides.png");

	this.boardAppearance = new CGFappearance(this);
	this.boardAppearance.setAmbient(0.3,0.3,0.3,1);
	this.boardAppearance.setDiffuse(0.7,0.7,0.7,1);
	this.boardAppearance.setSpecular(0.5,0.5,0.5,1);	
	this.boardAppearance.setShininess(120);
	this.boardAppearance.loadTexture("../resources/images/board.png");
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

	this.lights[3].setPosition(4.0, 6.0, 5.0, 1.0);
	this.lights[3].setVisible(true);

    this.lights[4].setPosition(0.0, 4.0, 7.0, 1.0);
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
	this.lights[2].enable();
	this.lights[2].setConstantAttenuation(0.0);
	this.lights[2].setLinearAttenuation(1.0);
	this.lights[2].setQuadraticAttenuation(0.0);

	this.lights[3].setAmbient(0, 0, 0, 1);
	this.lights[3].setDiffuse(1.0, 1.0, 1.0, 1.0);
	this.lights[3].enable();
	this.lights[3].setConstantAttenuation(0.0);
	this.lights[3].setLinearAttenuation(0.0);
	this.lights[3].setQuadraticAttenuation(1.0);

	this.lights[4].setAmbient(0, 0, 0, 1);
	this.lights[4].setDiffuse(1.0, 1.0, 1.0, 1.0);
	this.lights[4].setSpecular(1.0, 1.0, 1.0, 1.0);
	this.lights[4].setLinearAttenuation(1.0);
	this.lights[4].enable();
};

LightingScene.prototype.updateLights = function() {
	for (i = 0; i < this.lights.length; i++)
		this.lights[i].update();
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

    // Floor
	this.pushMatrix();
		this.translate(7.5, 0, 7.5);
		this.rotate(-90 * degToRad, 1, 0, 0);
		this.scale(15, 15, 0.2);
		//this.color1.apply();
		this.floorAppearance.apply();
		this.floor.display();
	this.popMatrix();

	// Left Wall
	this.pushMatrix();
		this.translate(0, 4, 7.5);
		this.rotate(90 * degToRad, 0, 1, 0);
		this.scale(15, 8, 0.2);
		//this.color2.apply();
		this.windowAppearance.apply();
		this.wallLeft.display();
	this.popMatrix();

	// Plane Wall
	this.pushMatrix();
		this.translate(7.5, 4, 0);
		this.scale(15, 8, 0.2);
		this.color3.apply();
		this.wall.display();
	this.popMatrix();

	// First Table
	this.pushMatrix();
		this.translate(5, 0, 8);
		this.table.display();
	this.popMatrix();

	// Second Table
	this.pushMatrix();
		this.translate(12, 0, 8);
		this.table.display();
	this.popMatrix();

	// Board A
	this.pushMatrix();
		this.translate(4, 4.5, 0.2);
		this.scale(BOARD_WIDTH, BOARD_HEIGHT, 1);
		this.slidesAppearance.apply();
		this.boardA.display();
	this.popMatrix();

	// Board B
	this.pushMatrix();
		this.translate(10.5, 4.5, 0.2);
		this.scale(BOARD_WIDTH, BOARD_HEIGHT, 1);
		this.boardAppearance.apply();
		this.boardB.display();
	this.popMatrix();

	// Prism
	
	this.pushMatrix();
		this.scale(1,1,3);
		//this.prism.display();
	this.popMatrix();

	// Cylinder 1

    this.pushMatrix();
    this.translate(5,0,14);
	this.scale(1, 5, 1);
	this.rotate(90 * degToRad, -1, 0, 0);
    //this.lamp.display();
    this.cylinder.display();
    //this.prism.display();
    this.popMatrix();

    // Cylinder 2

    this.pushMatrix();
    this.translate(13,0,14);
	this.scale(1, 5, 1);
	this.rotate(90 * degToRad, -1, 0, 0);
    //this.lamp.display();
    this.cylinder2.display();
    this.popMatrix();
    
    // Clock 

 /*   this.pushMatrix();
        this.scale(1,1,0.2);
		this.translate(7.5,7,1);
		this.rotate(180 * degToRad, 0 , 0, -1);
		
		this.clockAppearance.apply();
		this.clock.display();
    this.popMatrix();*/
	// ---- END Primitive drawing section
};
