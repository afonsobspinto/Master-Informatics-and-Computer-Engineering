/**
 * MyTriangle
 * @param scene
 * @param vertexA
 * @param vertexB
 * @param vertexC
 * @constructor
 */

function MyTriangle(scene, vertexA, vertexB, vertexC){
    CGFobject.call(this, scene);

    this.vertexA = vertexA;
    this.vertexB = vertexB;
    this.vertexC = vertexC;

    this.initBuffers();
};

MyTriangle.prototype = Object.create(CGFobject.prototype);
MyTriangle.prototype.constructor = MyTriangle;


/**
 * Initializes the buffers
 */

MyTriangle.prototype.initBuffers = function() {

    this.vertices = [
        this.vertexA.x, this.vertexA.y, this.vertexA.z,
        this.vertexB.x, this.vertexB.y, this.vertexB.z,
        this.vertexC.x, this.vertexC.y, this.vertexC.z
    ];

    this.minS = 0.0;
    this.minT = 0.0;
    this.maxS = 1.0;
    this.maxT = 1.0;

    this.indices = [
        0, 1, 2,
    ];

    this.normals = [
        0, 0, 1,
        0, 0, 1,
        0, 0, 1
    ];



    var dAB = distanceBetweenVertex(this.vertexA, this.vertexB);
    var dBC = distanceBetweenVertex(this.vertexB, this.vertexC);
    var dAC = distanceBetweenVertex(this.vertexA, this.vertexC);
    var beta =  Math.acos((Math.pow(dBC, 2) + Math.pow(dAB, 2) - Math.pow(dAC, 2)) / (2*dAB*dBC)); // cos(Beta) = a^2 - b^2 + c^2 / (2*a*c)


    this.texCoords = [
        this.minS, this.minT,
        this.maxS, this.minT,
        (dAB - dBC * Math.cos(beta)) / dAB, (dBC*Math.sin(beta))/dAB // P0 = (c-a*cos(Beta), a*sin(B); /dAB para normalizar.
    ];


    this.primitiveType = this.scene.gl.TRIANGLES;
    this.initGLBuffers();
}

//TODO: Set amplification Factors e TextCoords

/**
 * Updates the Triangle amplification factors
 * @param amplifFactorS s domain amplification factor
 * @param amplifFactorT t domain amplification factor
 */
MyTriangle.prototype.setAmplifFactor = function(amplifFactorS, amplifFactorT) {

/*    var ab = Math.sqrt(Math.pow(this.v2x-this.v1x, 2) + Math.pow(this.v2y-this.v1y, 2) + Math.pow(this.v2z-this.v1z, 2));
    var bc = Math.sqrt(Math.pow(this.v2x-this.v3x, 2) + Math.pow(this.v2y-this.v3y, 2) + Math.pow(this.v2z-this.v3z, 2));
    var ac = Math.sqrt(Math.pow(this.v1x-this.v3x, 2) + Math.pow(this.v1y-this.v3y, 2) + Math.pow(this.v1z-this.v3z, 2));
    var beta = Math.acos((Math.pow(bc, 2) + Math.pow(ab, 2) - Math.pow(ac, 2))/(2*ab*bc));

    this.texCoords = [
        this.minS, this.minT,
        this.maxS, this.minT*ab/amplif_s,
        ((ab - bc*Math.cos(beta))/ab)*ab/amplif_s, (bc*Math.sin(beta)/ab)*ab/amplif_t
    ];

    this.updateTexCoordsGLBuffers();*/
}