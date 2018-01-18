
function LightingScene() {
    CGFscene.call(this);
    this.texture = null;
   	this.appearance = null;
   	this.selectedExampleShader=0;
   	this.wireframe=false;
	
	this.scaleFactor=50.0;

}

LightingScene.prototype = Object.create(CGFscene.prototype);
LightingScene.prototype.constructor = LightingScene;

LightingScene.prototype.init = function (application) {
    CGFscene.prototype.init.call(this, application);

	this.initCameras();

    this.initLights();

    this.gl.clearColor(0,0,0, 1.0);
    this.gl.clearDepth(10000.0);
    this.gl.enable(this.gl.DEPTH_TEST);
	this.gl.enable(this.gl.CULL_FACE);
    this.gl.depthFunc(this.gl.LEQUAL);
    
	this.axis=new CGFaxis(this);
	this.enableTextures(true);
   
    this.setUpdatePeriod(500);
	
	this.appearance = new CGFappearance(this);
	this.appearance.setAmbient(0.3, 0.3, 0.3, 1);
	this.appearance.setDiffuse(0.7, 0.7, 0.7, 1);
	this.appearance.setSpecular(0.0, 0.0, 0.0, 1);	
	this.appearance.setShininess(120);
	
	this.texture = new CGFtexture(this, "textures/texture.jpg");
	this.appearance.setTexture(this.texture);
	this.appearance.setTextureWrap ('REPEAT', 'REPEAT');

	this.testShaders=[
		new CGFshader(this.gl, "shaders/flat.vert", "shaders/flat.frag"),
		new CGFshader(this.gl, "shaders/uScale.vert", "shaders/uScale.frag"),
		new CGFshader(this.gl, "shaders/varying.vert", "shaders/varying.frag"),
		new CGFshader(this.gl, "shaders/texture1.vert", "shaders/texture1.frag"),
		new CGFshader(this.gl, "shaders/texture2.vert", "shaders/texture2.frag"),
		new CGFshader(this.gl, "shaders/texture3.vert", "shaders/texture3.frag"),
		new CGFshader(this.gl, "shaders/texture3.vert", "shaders/sepia.frag"),
		new CGFshader(this.gl, "shaders/texture3.vert", "shaders/convolution.frag")
	];

	// texture will have to be bound to unit 1 later, when using the shader, with "this.texture2.bind(1);"
	this.testShaders[4].setUniformsValues({uSampler2: 1});
	this.testShaders[5].setUniformsValues({uSampler2: 1});

	this.texture2 = new CGFtexture(this, "textures/FEUP.jpg");
	
	this.updateScaleFactor();

	this.teapot=new Teapot(this);
		
};

LightingScene.prototype.updateWireframe=function(v)
{
	if (v)
		this.teapot.setLineMode();
	else
		this.teapot.setFillMode();
		
}

LightingScene.prototype.updateScaleFactor=function(v)
{
	this.testShaders[1].setUniformsValues({normScale: this.scaleFactor});
	this.testShaders[2].setUniformsValues({normScale: this.scaleFactor});
	this.testShaders[5].setUniformsValues({normScale: this.scaleFactor});
}

LightingScene.prototype.initLights = function () {

	if (this.lights.length > 0) {
		this.lights[0].setPosition(0,0,10,1);
		this.lights[0].setAmbient(0.2,0.2,0.2,1);
		this.lights[0].setDiffuse(0.9,0.9,1.0,1);
		this.lights[0].setSpecular(0,0,0,1);
		this.lights[0].enable();		
		this.lights[0].update();
	}
};


LightingScene.prototype.initCameras = function () {
    this.camera = new CGFcamera(0.4, 0.1, 500, vec3.fromValues(20, 20, 100), vec3.fromValues(0, 0, 0));
};

LightingScene.prototype.display = function () 
{
	// Clear image and depth buffer every time we update the scene
    this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
    this.gl.clearColor(0.1, 0.1, 0.1, 1.0);
    this.gl.enable(this.gl.DEPTH_TEST);

	// Initialize Model-View matrix as identity (no transformation
	this.updateProjectionMatrix();
    this.loadIdentity();

	// Apply transformations corresponding to the camera position relative to the origin
	this.applyViewMatrix();
	
	// Update all lights used
	this.lights[0].update();

	// Draw axis
	this.axis.display();	
	
	this.appearance.apply();

	this.setActiveShader(this.testShaders[this.selectedExampleShader]);
	this.pushMatrix();

    this.texture2.bind(1);

	this.translate(0,-6,0);
	this.scale(0.5,0.5,0.5);
	this.rotate(-Math.PI/2, 1, 0, 0);	
	this.teapot.display();
	this.popMatrix();

	this.setActiveShader(this.defaultShader);

}
