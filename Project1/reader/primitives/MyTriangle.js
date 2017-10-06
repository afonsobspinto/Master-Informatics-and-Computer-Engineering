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

    this.indices = [
        0, 1, 2,
    ];

    var a, b, c; // sides length of triangle

    a = Math.sqrt(Math.pow((this.vertexA.x - this.vertexC.x), 2) + Math.pow((this.vertexA.y - this.vertexC.y), 2) + Math.pow((this.vertexA.z - this.vertexC.z), 2));

    b = Math.sqrt(Math.pow((this.vertexB.x - this.vertexA.x), 2) + Math.pow((this.vertexB.y - this.vertexA.y), 2) + Math.pow((this.vertexB.z - this.vertexA.z), 2));

    c = Math.sqrt(Math.pow((this.vertexC.x - this.vertexB.x), 2) + Math.pow((this.vertexC.y - this.vertexB.y), 2) + Math.pow((this.vertexC.z - this.vertexB.z), 2));


    var vertex = [this.vertexA, this.vertexB, this.vertexC];
    var normal = calculateSurfaceNormal (vertex);

    this.normals = [
        normal.x, normal.y, normal.z,
        normal.x, normal.y, normal.z,
        normal.x, normal.y, normal.z
    ];

    var cosBeta, sinBeta; // trigonometric functions of internal angle of triangle

    cosBeta = (Math.pow(a,2) - Math.pow(b,2) + Math.pow(c,2) )/ (2 * a * c);
    sinBeta = Math.sqrt(1 - Math.pow(cosBeta, 2));

    var P0, P1, P2;

    P0 = new Vector2(c-a*cosBeta, a*sinBeta);
    P1 = new Vector2(0,0);
    P2 = new Vector2(c, 0);

    this.minS = 0.0;
    this.minT = 0.0;
    this.maxS = 1.0;
    this.maxT = 1.0;


    this.texCoords = [
        P0.x * this.maxS / c ,  ((this.maxS - (P0.x * this.maxS / c))/cosBeta) * sinBeta,
        this.maxS, this.minT,
        this.minT, this.minT
    ];


    this.primitiveType = this.scene.gl.TRIANGLES;
    this.initGLBuffers();
}

//TODO: Set amplification Factors

/**
 * Updates the Triangle amplification factors
 * @param amplifFactorS s domain amplification factor
 * @param amplifFactorT t domain amplification factor
 */
MyTriangle.prototype.setAmplifFactor = function(amplifFactorS, amplifFactorT) {


}