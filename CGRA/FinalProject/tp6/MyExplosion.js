function MyExplosion(scene, target) {
    CGFobject.call(this, scene);

    this.x = target.x;
    this.y = target.y;
    this.z = target.z;

   
    this.maxSize = 2;
    this.size = 1 / 3 * this.maxSize;

    this.lastTime = -1;
    this.reverse = false;
    this.end = false;

    this.boom = new MyLamp(scene,20,20);
};

MyExplosion.prototype = Object.create(CGFobject.prototype);
MyExplosion.prototype.constructor = MyTarget;

MyExplosion.prototype.update = function(currTime){
    var delta = 0;
    if(this.lastTime != -1)
        delta = (currTime - this.lastTime)/1000;
    this.lastTime = currTime;
    
    if (this.size>this.maxSize)
        this.reverse = true;

    if(this.reverse){
        this.size -= delta * 2;
        if(this.size <= this.maxSize / 2)
            this.end = true;
    }
    else
        this.size += delta * 4;
};

MyExplosion.prototype.display = function(){
    //Semisphere
    this.scene.pushMatrix();
    this.scene.translate(this.x, this.y, this.z);
    this.scene.scale(this.size, this.size, this.size);
    this.scene.rotate(90.0*degToRad,1,0,0);
    this.boom.display();
    this.scene.rotate(180.0*degToRad,1,0,0);
    this.boom.display();
    this.scene.popMatrix();
};

MyExplosion.prototype.getEnd = function(){
    return this.end;
}
