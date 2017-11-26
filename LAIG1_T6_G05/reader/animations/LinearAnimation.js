/**
 * Represents the Linear animation.
 * @param id - The ID of the animation
 * @param controlPoints
 * @param vel - The speed of the animation
 */
function LinearAnimation(id, controlPoints, vel) {

    Animation.call(this, id);
    this.controlPoints = controlPoints;
    this.vel = vel;

    let totalDistance = 0;
    this.distances = [];

    for (let i = 0; i < this.controlPoints.length - 1; i++) {
        const distance = distanceBetweenVertex(controlPoints[i], controlPoints[i + 1]);
        totalDistance += distance;
        this.distances.push(distance); //Array of segments [Segment 1, Segment 2, Segment 3...]
    }

    this.currentControlPoint = 0;
    this.currentPosition = new Vector3(this.controlPoints[0].x, this.controlPoints[0].y, this.controlPoints[0].z);
    this.currentAngle = this.calculateAngle(controlPoints[0], controlPoints[1]);
    this.accumulatedDistance = 0;

    this.lastCurrentTime = -1;

}

LinearAnimation.prototype = Object.create(Animation.prototype);
LinearAnimation.prototype.constructor = LinearAnimation;

/**
 * Updates the animation.
 * @param currentTime
 */
LinearAnimation.prototype.update = function(currentTime) {

    let delta, t;
    let x, y, z;

    if (!this.rendering)
        return;

    delta = (this.lastCurrentTime === -1) ? 0 : (currentTime - this.lastCurrentTime)/1000;
    this.lastCurrentTime = currentTime;

    this.accumulatedDistance += this.vel * delta; // Distance = velocity * time;
    if(this.accumulatedDistance > this.distances[this.currentControlPoint]){
        if (this.currentControlPoint === this.controlPoints.length-2) {
            this.rendering = false;
            return;
        }
        else{
            this.accumulatedDistance = 0;
            this.currentControlPoint++;
            this.currentAngle = this.calculateAngle(this.controlPoints[this.currentControlPoint],this.controlPoints[this.currentControlPoint+1]);
        }
    }

    t = this.accumulatedDistance/ this.distances[this.currentControlPoint];
    x = (this.controlPoints[this.currentControlPoint+1].x * t) + ((1-t)*this.controlPoints[this.currentControlPoint].x);
    y = (this.controlPoints[this.currentControlPoint+1].y * t) + ((1-t)*this.controlPoints[this.currentControlPoint].y);
    z = (this.controlPoints[this.currentControlPoint+1].z * t) + ((1-t)*this.controlPoints[this.currentControlPoint].z);

    this.currentPosition = new Vector3(x,y,z);
};

/**
 * Calculates the angle between two points
 * @param point1 - First point
 * @param point2 - Second point
 * @returns number - angle between the two points
 */
LinearAnimation.prototype.calculateAngle = function(point1, point2) {
    return Math.atan2((point2.z - point1.z), (point2.x - point1.x));
};

/**
 * Returns the matrix of the animation.
 * @returns the matrix of the animation
 */
LinearAnimation.prototype.getAnimationMatrix = function () {
    let matrix = mat4.create();


    mat4.translate(matrix, matrix, this.currentPosition.toArray());
    mat4.rotate(matrix, matrix, this.currentAngle, [0, 1, 0]);


    return matrix;
};

/**
 * Clones the animation.
 */
LinearAnimation.prototype.clone = function () {

    return new LinearAnimation(this.id+'clone', this.controlPoints, this.vel);

};