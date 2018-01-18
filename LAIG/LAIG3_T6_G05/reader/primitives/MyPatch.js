/**
 * MyPatch
 * @param scene
 * @param partsU
 * @param partsV
 * @param degree1
 * @param degree2
 * @param controlPoints
 * @constructor
 */

function MyPatch(scene, partsU, partsV, degree1, degree2, controlPoints){

    const knots1 = this.getKnotsVector(degree1);
    const knots2 = this.getKnotsVector(degree2);

    this.controlvertexes = [];

    this.getVertexes(degree1, degree2, controlPoints);

    const nurbsSurface = new CGFnurbsSurface(degree1, degree2, knots1, knots2, this.controlvertexes);

    getSurfacePoint = function(u, v) {
        return nurbsSurface.getPoint(u, v);
    };

    CGFnurbsObject.call(this, scene, getSurfacePoint, partsU, partsV);

}

MyPatch.prototype = Object.create(CGFnurbsObject.prototype);
MyPatch.prototype.constructor = MyPatch;

/**
 * Gets the vertex
 */


MyPatch.prototype.getVertexes = function(degree1, degree2, controlPoints) {

    let index = 0;

    for (let i = 0; i < degree1 + 1; i++) {
        const vec = [];
        for (let j = 0; j < degree2 + 1; j++) {
            vec.push(controlPoints[index]);
            index++;
        }
        this.controlvertexes.push(vec);
    }

};


/**
 * Gets Knots Vector
 */

MyPatch.prototype.getKnotsVector = function(degree) {
    let i;
    const v = [];
    for (i = 0; i<=degree; i++) {
        v.push(0);
    }
    for (i = 0; i<=degree; i++) {
        v.push(1);
    }
    return v;
}
