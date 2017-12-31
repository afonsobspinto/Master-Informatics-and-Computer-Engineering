/**
 * 
 */
function CameraAnimation(scene,xi,yi,zi,xf,yf,zf) {
    this.scene=scene;
    this.degToRad = Math.PI / 180;

    this.xi = xi;
    this.yi = yi;
    this.zi = zi;
    this.xf = xf;
    this.yf = yf;
    this.zf = zf;

    this.deltaX = this.xf - this.xi;
    this.deltaY = this.yf - this.yi;
    this.deltaZ = this.zf - this.zi;

    this.deltaZ = this.zf - this.zi;
    
    this.totalTime= 3;
    this.ended=false;

    this.lastCurrentTime = -1;
    this.accumulatedTime = 0;

    

}

/**
 * Updates the animation.
 * @param currTime - The current time of the animation
 */
CameraAnimation.prototype.update = function (currentTime) {

    if(this.accumulatedTime >= this.totalTime){
        this.scene.movingCamera = false;
        this.scene.CameraAnimation=null;
    }
    else{
     
        this.accumulatedTime += (this.lastCurrentTime === -1) ? 0 : (currentTime - this.lastCurrentTime)/1000;
        this.lastCurrentTime = currentTime;

        var delta = this.accumulatedTime/this.totalTime;

        this.currentX=  this.xi + delta*this.deltaX;
        this.currentY= this.yi + delta*this.deltaY;
        this.currentZ = this.zi + delta*this.deltaZ;

        this.scene.camera.setPosition(vec3.fromValues(this.currentX,this.currentY,this.currentY));

        
    }


};

