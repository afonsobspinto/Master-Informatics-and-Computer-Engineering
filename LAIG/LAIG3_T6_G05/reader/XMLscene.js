var DEGREE_TO_RAD = Math.PI / 180;

/**
 * XMLscene class, representing the scene that is to be rendered.
 * @constructor
 */
function XMLscene(interface) {
    CGFscene.call(this);

    this.interface = interface;

    this.lightValues = {};

    this.selectedCamera = 0;
    this.selectedScenario = 0;

    this.selectedGameMode = 0;
    this.selectedGameDifficulty = 0;
    this.selectedTimeout = 30;

    this.startGame = function () {
        this.game = new Game(this, new GameConfig(this.selectedGameMode, this.selectedGameDifficulty, this.selectedTimeout));
        this.game.client.init();
    }

    this.resume = function () {
        this.game.resumeGame();
    }

    this.undo = function () {
        this.game.undo();
    }

    this.resign = function () {
        console.log('Resign');
    }
}

XMLscene.prototype = Object.create(CGFscene.prototype);
XMLscene.prototype.constructor = XMLscene;

/**
 * Initializes the scene, setting some WebGL defaults, initializing the camera and the axis.
 */
XMLscene.prototype.init = function (application) {
    CGFscene.prototype.init.call(this, application);

    this.shader = new CGFshader(this.gl, "shaders/uScale.vert", "shaders/uScale.frag");
    this.shader.setUniformsValues({ red: 0.0, green: 0.0, blue: 1.0 });

    this.initCameras();

    this.enableTextures(true);

    this.gl.clearDepth(100.0);
    this.gl.enable(this.gl.DEPTH_TEST);
    this.gl.enable(this.gl.CULL_FACE);
    this.gl.depthFunc(this.gl.LEQUAL);

    this.initMaterials();

    this.setUpdatePeriod(10); //milliseconds

    this.axis = new CGFaxis(this);

    this.setPickEnabled(true);

    this.previousCamera = 0;
    this.movingCamera = false;
    this.CameraAnimation = null;
};

/**
 * Initializes the scene materials.
 */
XMLscene.prototype.initMaterials = function () {
    this.whiteMaterial = new CGFappearance(this);
    this.whiteMaterial.setAmbient(0, 0, 0, 1);
    this.whiteMaterial.setDiffuse(0.82, 0.82, 0.82, 1);
    this.whiteMaterial.setSpecular(0, 0, 0, 1);
    this.whiteMaterial.setShininess(20);

    this.blackMaterial = new CGFappearance(this);
    this.blackMaterial.setAmbient(0, 0, 0, 1);
    this.blackMaterial.setDiffuse(0.1, 0.1, 0.1, 1);
    this.blackMaterial.setSpecular(0, 0, 0, 1);
    this.blackMaterial.setShininess(20);
};

/**
 * Initializes the scene lights with the values read from the LSX file.
 */
XMLscene.prototype.initLights = function () {
    var i = 0;
    // Lights index.

    // Reads the lights from the scene graph.
    for (var key in this.graph.lights) {
        if (i >= 8)
            break;              // Only eight lights allowed by WebGL.

        if (this.graph.lights.hasOwnProperty(key)) {
            var light = this.graph.lights[key];

            this.lights[i].setPosition(light[1][0], light[1][1], light[1][2], light[1][3]);
            this.lights[i].setAmbient(light[2][0], light[2][1], light[2][2], light[2][3]);
            this.lights[i].setDiffuse(light[3][0], light[3][1], light[3][2], light[3][3]);
            this.lights[i].setSpecular(light[4][0], light[4][1], light[4][2], light[4][3]);

            this.lights[i].setVisible(true);
            if (light[0])
                this.lights[i].enable();
            else
                this.lights[i].disable();

            this.lights[i].update();

            i++;
        }
    }

};

/**
 * Initializes the scene cameras.
 */
XMLscene.prototype.initCameras = function () {
    this.cameras = [
        new CGFcamera(0.41, 0.1, 500, vec3.fromValues(-20, 15, 5), vec3.fromValues(0, 0, 0)),
        new CGFcamera(24 * DEGREE_TO_RAD, 0.1, 500, vec3.fromValues(15, 15, 15), vec3.fromValues(0, 0, 0)),
    ];
    this.camera = new CGFcamera(0.41, 0.1, 500, vec3.fromValues(-20, 15, 5), vec3.fromValues(0, 0, 0));
};

/* Handler called when the graph is finally loaded.
 * As loading is asynchronous, this may be called already after the application has started the run loop
 */
XMLscene.prototype.onGraphLoaded = function () {
    this.camera.near = this.graph.near;
    this.camera.far = this.graph.far;
    this.axis = new CGFaxis(this, this.graph.referenceLength);

    this.setGlobalAmbientLight(this.graph.ambientIllumination[0], this.graph.ambientIllumination[1],
        this.graph.ambientIllumination[2], this.graph.ambientIllumination[3]);

    this.gl.clearColor(this.graph.background[0], this.graph.background[1], this.graph.background[2], this.graph.background[3]);

    this.initLights();

    // Adds lights group.
    this.interface.addAmbientGroup(this.graph.lights);

    // Adds GameConfigs group.
    this.interface.addGameConfigGroup();

    // Adds GameController group.
    this.interface.addGameControllerGroup();

};

/**
 * Displays the scene.
 */
XMLscene.prototype.display = function () {

    this.clearPickRegistration();
    // ---- BEGIN Background, camera and axis setup

    this._updateCamera();
    // Clear image and depth buffer everytime we update the scene
    this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);

    // Initialize Model-View matrix as identity (no transformation
    this.updateProjectionMatrix();
    this.loadIdentity();

    // Apply transformations corresponding to the camera position relative to the origin
    this.applyViewMatrix();

    this.pushMatrix();

    if (this.graph.loadedOk) {
        // Applies initial transformations.
        this.multMatrix(this.graph.initialTransforms);

        // Draw axis
        this.axis.display();

        var i = 0;
        for (var key in this.lightValues) {
            if (this.lightValues.hasOwnProperty(key)) {
                if (this.lightValues[key]) {
                    this.lights[i].setVisible(true);
                    this.lights[i].enable();
                }
                else {
                    this.lights[i].setVisible(false);
                    this.lights[i].disable();
                }
                this.lights[i].update();
                i++;
            }
        }

        // Displays the scene.
        this.graph.displayScene();

        if (this.game) {
            if (this.game.display()) {
                this.game = null;
            }
        }

    }
    else {
        // Draw axis

        this.axis.display();
    }

    this.popMatrix();

    // ---- END Background, camera and axis setup

}

XMLscene.prototype._updateCamera = function () {

    if (this.selectedCamera !== this.previousCamera) {
        if (this.previousCamera == 0) {
            this.CameraAnimation = new CameraAnimation(this, this.cameras[0].position[0], this.cameras[0].position[1], this.cameras[0].position[2],
                this.cameras[1].position[0], this.cameras[1].position[1], this.cameras[1].position[2]);
            this.movingCamera = true;
            this.previousCamera = this.selectedCamera;
        }
        else {
            this.CameraAnimation = new CameraAnimation(this, this.cameras[1].position[0], this.cameras[1].position[1], this.cameras[1].position[2],
                this.cameras[0].position[0], this.cameras[0].position[1], this.cameras[0].position[2]);
            this.movingCamera = true;
            this.previousCamera = this.selectedCamera;
        }

    }
}


/**
 * Updates the scene.
 */
XMLscene.prototype.update = function (currTime) {

    if (this.movingCamera) {
        this.CameraAnimation.update(currTime);
    }

    if (this.graph.loadedOk) {
        for (let animationID in this.graph.animations) {
            this.graph.animations[animationID].update(currTime);
        }
    }

    this.currTime = currTime;

}

XMLscene.prototype.getCurrTime = function (currTime) {
    return this.currTime;
}