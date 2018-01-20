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

	
	this.gui.add(this.scene, 'doClock');	

	// add a group of controls (and open/expand by defult)
	
	var group=this.gui.addFolder("Lights");
	var textures = this.gui.addFolder("Choose Textures");
	var targetsNumber = this.gui.addFolder("How many targets?");
	group.open();

	// add two check boxes to the group. The identifiers must be members variables of the scene initialized in scene.init as boolean
	// e.g. this.option1=true; this.option2=false;
	
	group.add(this.scene, 'light0');
	group.add(this.scene, 'light1');
	group.add(this.scene, 'light2');
	group.add(this.scene, 'light3');
	group.add(this.scene, 'light4');
	group.add(this.scene, 'light5');


	// add a slider
	// must be a numeric variable of the scene, initialized in scene.init e.g.
	// this.speed=3;
	// min and max values can be specified as parameters
	
	this.gui.add(this.scene.submarine, 'speed', -5, 5);

	textures.add(this.scene, 'currSeaBottomAppearance',Object.keys(this.scene.seaBottomAppearanceList) );
    textures.add(this.scene, 'currSubmarineAppearance',Object.keys(this.scene.submarineAppearanceList) );
	textures.add(this.scene, 'currTargetAppearance',Object.keys(this.scene.targetsAppearanceList) );
	
	targetsNumber.add(this.scene, 'currTargets',Object.keys(this.scene.targetsList));
	this.gui.add(this.scene, 'resetTargets');
	
	return true;
};



/**
 * processKeyboard
 * @param event {Event}
 */
MyInterface.prototype.processKeyboard = function(event) {
	// call CGFinterface default code (omit if you want to override)
	//CGFinterface.prototype.processKeyboard.call();
	
	// Check key codes e.g. here: http://www.asciitable.com/
	// or use String.fromCharCode(event.keyCode) to compare chars
	
	// for better cross-browser support, you may also check suggestions on using event.which in http://www.w3schools.com/jsref/event_key_keycode.asp
	switch (event.keyCode)
	{
		case (65):{	//
			console.log("Key 'A' pressed");
			this.scene.subRotate(2);
			break;
		}
		case (97):{
			console.log("Key 'a' pressed");
			this.scene.subRotate(2);
			break;
		}
		case(68):{
			console.log("Key 'D' pressed");
			this.scene.subRotate(-2);
			break;
		}
		case (100):{
			console.log("Key 'd' pressed");
			this.scene.subRotate(-2);
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
		case (69):{
			console.log("Key 'E' pressed");
            this.scene.setInclination(0.5);
            break;
		}
        case(81):{ 
        	console.log("Key 'Q' pressed");
            this.scene.setInclination(-0.5);
            break;
        }

        case (101):{
			console.log("Key 'e' pressed");
            this.scene.setInclination(0.05);
            break;
		}
        case(113):{ 
        	console.log("Key 'q' pressed");
            this.scene.setInclination(-0.05);
            break;
        }

        case (80):{
        	console.log("Key 'P' pressed");
            this.scene.setPeriscopeHeight(0.1);
            break;
        }
        case (76):{
        	console.log("Key 'L' pressed");
            this.scene.setPeriscopeHeight(-0.1);
            break;
        }

        case (112):{
        	console.log("Key 'p' pressed");
            this.scene.setPeriscopeHeight(0.1);
            break;
        }
        case (108):{
        	console.log("Key 'l' pressed");
            this.scene.setPeriscopeHeight(-0.1);
            break;
        }
        case (70):{
			console.log("Key 'F' pressed");
			this.scene.activateTorpedo();
			break;
		}
		case (102):{
			console.log("Key 'f' pressed");
			this.scene.activateTorpedo();
			break;
		}
	};
};

/**
 * processLights
 * @param event {Event}
 */
MyInterface.prototype.processLights = function(ID, value) {
	this.scene.setLight(ID,value);
}