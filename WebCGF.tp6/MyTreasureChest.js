function MyTreasureChest(scene){
    CGFobject.call(this, scene);

    this.chest = new MyUnitCubeQuad(scene);
    this.coin = new MyLamp(scene,20,20);

    this.chestAppearance=new CGFappearance(this.scene);
	this.chestAppearance.setAmbient(1, 1, 1, 0.2);
	this.chestAppearance.setDiffuse(1, 1, 1, 0.2);
	this.chestAppearance.setSpecular(1, 1, 1, 0.3);
	this.chestAppearance.setShininess(100);
    this.chestAppearance.loadTexture("../resources/images/chest.png");

    this.coinAppearance=new CGFappearance(this.scene);
	this.coinAppearance.setAmbient(1, 1, 1, 0.2);
	this.coinAppearance.setDiffuse(1, 1, 1, 0.2);
	this.coinAppearance.setSpecular(1, 1, 1, 0.3);
	this.coinAppearance.setShininess(100);
    this.coinAppearance.loadTexture("../resources/images/coin.png");
}

MyTreasureChest.prototype = Object.create(CGFobject.prototype);
MyTreasureChest.prototype.constructor=MyTreasureChest;

MyTreasureChest.prototype.display = function(){
     
    // Chest
    this.scene.pushMatrix();
        this.scene.scale(2, 1, 1);
        this.chestAppearance.apply();
        this.chest.display();
    this.scene.popMatrix();

    // Coins
    for(i=0;i<1.9;i=i+0.1){
        for(j=0;j<0.8;j=j+0.1){
            this.scene.pushMatrix();
                this.scene.translate(-0.9+i,0.5,-0.4+j);
                this.scene.scale(0.15,0.02,0.15);
                this.scene.rotate(Math.PI/2,-1,0,0);
                this.coinAppearance.apply();
                this.coin.display();
            this.scene.popMatrix();
        }
    }
}

