/**
 * MyPatch
 * @param scene
 * @param degree1
 * @param degree2
 * @param partsU
 * @param partsV
 * @param controlPoints
 * @constructor
 */

function MyPatch(scene, degree1, degree2, partsU, partsV, controlPoints){
    CGFobject.call(this, scene);

    var knots1 = this.getKnotsVector(degree1);
    var knots2 = this.getKnotsVector(degree2);

    this.controlvertexes = [];

    this.getVertexes(degree1, degree2, controlPoints);

    var nurbsSurface = new CGFnurbsSurface(degree1, degree2, knots1, knots2, this.controlvertexes);

    getSurfacePoint = function(u, v) {
        return nurbsSurface.getPoint(u, v);
    };

    CGFnurbsObject.call(this, scene, getSurfacePoint, partsU, partsV);

};

MyPatch.prototype = Object.create(CGFobject.prototype);
MyPatch.prototype.constructor = MyPatch;

/**
 * Gets the vertex
 */


MyPatch.prototype.getVertexes = function(degree1, degree2, controlPoints) {

    var pos = 0;

    for (var i = 0; i < degree1 + 1; i++) {
        var vec = [];
        for (var j = 0; j < degree2 + 1; j++) {
            vec.push(controlPoints[pos]);
            pos++;
        }
        this.controlvertexes.push(vec);
    }

}


/**
 * Gets Knots Vector
 */

MyPatch.prototype.getKnotsVector = function(degree) {
    var v = new Array();
    for (var i=0; i<=degree; i++) {
        v.push(0);
    }
    for (var i=0; i<=degree; i++) {
        v.push(1);
    }
    return v;
}