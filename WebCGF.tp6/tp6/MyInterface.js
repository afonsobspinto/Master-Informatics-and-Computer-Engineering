/**
 * MyInterface
 * @constructor
 */
 
 
function MyInterface() {
	//call CGFinterface constructor 
	CGFinterface.call(this);
};

MyInterface.prototype = Object.create(CGFinterface.prototype);
MyInterface.prototype.constructor = MyInterface;

/**
 * init
 * @param {CGFapplication} application
 */
MyInterface.prototype.init = function(application) {
	// call CGFinterface init
	CGFinterface.prototype.init.call(this, application);
	
	// init GUI. For more information on the methods, check:
	//  http://workshop.chromeexperiments.com/examples/gui
	
	this.gui = new dat.GUI();

	// add a button:
	// the first parameter is the object that is being controlled (in this case the scene)
	// the identifier 'doSomething' must be a function declared as part of that object (i.e. a member of the scene class)
	// e.g. LightingScene.prototype.doSomething = function () { console.log("Doing something..."); }; 

	this.gui.add(this.scene, 'doSomething');
	this.gui.add(this.scene, 'doClock');	

	// add a group of controls (and open/expand by defult)
	
	var group=this.gui.addFolder("Ligths");
	var submarineTextures = this.gui.addFolder("Choose Textures");
	group.open();

	// add two check boxes to the group. The identifiers must be members variables of the scene initialized in scene.init as boolean
	// e.g. this.option1=true; this.option2=false;
	
	group.add(this.scene, 'ligth1');
	group.add(this.scene, 'ligth2');

	// add a slider
	// must be a numeric variable of the scene, initialized in scene.init e.g.
	// this.speed=3;
	// min and max values can be specified as parameters
	
	//this.gui.add(this.scene, 'speed', -5, 5);

    submarineTextures.add(this.scene, 'currSubmarineAppearance',Object.keys(this.scene.submarineAppearanceList) );

	return true;
};

/**
 * processKeyboard
 * @param event {Event}
 */
MyInterface.prototype.processKeyboard = function(event) {
	// call CGFinterface default code (omit if you want to override)
	CGFinterface.prototype.processKeyboard.call(this,event);
	
	// Check key codes e.g. here: http://www.asciitable.com/
	// or use String.fromCharCode(event.keyCode) to compare chars
	
	// for better cross-browser support, you may also check suggestions on using event.which in http://www.w3schools.com/jsref/event_key_keycode.asp
	switch (event.keyCode)
	{
		case (65):{	// only works for capital 'A', as it is
			console.log("Key 'A' pressed");
			this.scene.subRotate(5);
			break;
		}
		case (97):{
			console.log("Key 'a' pressed");
			this.scene.subRotate(5);
			break;
		}
		case(68):{
			console.log("Key 'D' pressed");
			this.scene.subRotate(-5);
			break;
		}
		case (100):{
			console.log("Key 'd' pressed");
			this.scene.subRotate(-5);
			break;
		}
		case(83):{
			console.log("Key 'S' pressed");
			this.scene.decreaseVelocity();
			break;
		}
		case (115):{
			console.log("Key 's' pressed");
			this.scene.decreaseVelocity();
			break;
		}
		case(87):{
			console.log("Key 'W' pressed");
			this.scene.increaseVelocity();
			break;
		}
		case (119):{
			console.log("Key 'w' pressed");
			this.scene.increaseVelocity();
			break;
		}
	};
};

/**
 * processLights
 * @param event {Event}
 */
MyInterface.prototype.processLights = function(ID, value) {
	this.scene.setLigth(ID,value);
}
