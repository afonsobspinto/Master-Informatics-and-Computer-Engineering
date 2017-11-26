/**
 * Represents the Bezier Animation.
 * @param id - The ID of the animation
 * @param bezierPoints - The points of the Bezier Function
 * @param vel - The speed of the animation
 */
function BezierAnimation(id, bezierPoints, vel) {

    Animation.call(this, id);

    this.p1 = bezierPoints[0];
    this.p2 = bezierPoints[1];
    this.p3 = bezierPoints[2];
    this.p4 = bezierPoints[3];
    this.vel = vel;

    console.log(bezierPoints);

    this.totalDistance = this.calculateDistance();

    this.totalTime = this.totalDistance / this.vel;
    this.lastCurrentTime = -1;
    this.accumulatedTime = 0;

    this.currentAngle = 0;

    this.currentPosition = this.p1;

}

BezierAnimation.prototype = Object.create(Animation.prototype);
BezierAnimation.prototype.constructor = BezierAnimation;

/**
 * Updates the animation.
 * @param currentTime
 */
BezierAnimation.prototype.update = function (currentTime) {

    if(!this.rendering)
        return;

    this.accumulatedTime += (this.lastCurrentTime === -1) ? 0 : (currentTime - this.lastCurrentTime)/1000;
    this.lastCurrentTime = currentTime;

    if(this.accumulatedTime >= this.totalTime){
        this.rendering = false;
    }

    let s, q, qs;

    s = this.accumulatedTime/this.totalTime;
    q = this.bezier(s);
    qs = this.bezierDerivate(s);

    this.currentAngle = Math.atan2(qs.z, qs.x);
    this.currentPosition = new Vector3(this.p1.x + q.x, this.p1.y + q.y, this.p1.z + q.z);

};

/**
 * Calculates the bezier of the function s.
 * @param s - The function
 * @returns Vector3 result of the bezier
 */
BezierAnimation.prototype.bezier = function (s) {
    let x, y, z;

    x = Math.pow((1 - s), 3) * this.p1.x +
        3 * s * Math.pow((1 - s), 2) * this.p2.x +
        3 * s * s * (1 - s) * this.p3.x +
        s * s * s * this.p4.x;

    y = Math.pow((1 - s), 3) * this.p1.y +
        3 * s * Math.pow((1 - s), 2) * this.p2.y +
        3 * s * s * (1 - s) * this.p3.y +
        s * s * s * this.p4.y;

    z = Math.pow((1 - s), 3) * this.p1.z +
        3 * s * Math.pow((1 - s), 2) * this.p2.z +
        3 * s * s * (1 - s) * this.p3.z +
        s * s * s * this.p4.z;


    return new Vector3(x, y, z);
};

/**
 * Calculates the derivate of the bezier of the function s.
 * @param s - The function
 * @returns Vector3 result of the derivate of the bezier
 */
BezierAnimation.prototype.bezierDerivate = function (s) {
    let x, y, z;

    x = -3 * Math.pow((1 - s), 2) * this.p1.x +
        (3 * Math.pow((1 - s), 2) - 6 * s * (1 - s)) * this.p2.x +
        (6 * s * (1 - s) - 3 * s * s) * this.p3.x +
        3 * s * s * this.p4.x;

    y = -3 * Math.pow((1 - s), 2) * this.p1.y +
        (3 * Math.pow((1 - s), 2) - 6 * s * (1 - s)) * this.p2.y +
        (6 * s * (1 - s) - 3 * s * s) * this.p3.y +
        3 * s * s * this.p4.y;

    z = -3 * Math.pow((1 - s), 2) * this.p1.z +
        (3 * Math.pow((1 - s), 2) - 6 * s * (1 - s)) * this.p2.z +
        (6 * s * (1 - s) - 3 * s * s) * this.p3.z +
        3 * s * s * this.p4.z;


    return new Vector3(x, y, z);
};

/**
 * Calculates the total distance between the control points.
 * @returns number total distance of the control points
 */
BezierAnimation.prototype.calculateDistance = function () {
    let p12, p123, p23, p234, p34;

    p12 = middlePoint(this.p1, this.p2);
    p23 = middlePoint(this.p2, this.p3);
    p34 = middlePoint(this.p3, this.p4);
    p123 = middlePoint(p12, p23);
    p234 = middlePoint(p23, p34);

    return (distanceBetweenVertex(this.p1, p12) + distanceBetweenVertex(p12, p123) +
        distanceBetweenVertex(p123, p234) + distanceBetweenVertex(p23, p34) +
        distanceBetweenVertex(p34, this.p4));
};

/**
 * Returns the matrix of the animation.
 * @returns the matrix of the animation
 */
BezierAnimation.prototype.getAnimationMatrix = function () {
    let matrix = mat4.create();

    //mat4.rotate(matrix, matrix, Math.PI / 2, [0,1,0]);
    mat4.translate(matrix, matrix, this.currentPosition.toArray());
    mat4.rotate(matrix,matrix, this.currentAngle, [0,1,0]);

    return matrix;
};

/**
 * Clones the animation.
 */
BezierAnimation.prototype.clone = function () {

    return new BezierAnimation(this.id+'clone', [this.p1, this.p2, this.p3, this.p4], this.vel);

};
