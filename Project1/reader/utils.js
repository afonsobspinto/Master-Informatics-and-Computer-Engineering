var Vector3 = function(x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;
}

var Vector2 = function(x, y) {
    this.x = x;
    this.y = y;
}

var distanceBetweenVertex = function(vertexA, vertexB) {
    return  Math.sqrt(Math.pow(vertexB.x-vertexA.x, 2) + Math.pow(vertexB.y-vertexA.y, 2) + Math.pow(vertexB.z-vertexA.z, 2));
}
