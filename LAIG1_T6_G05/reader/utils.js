class Vector3{
    constructor(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    toArray(){
        return [this.x, this.y, this.z];
    }



}
var Vector2 = function(x, y) {
    this.x = x;
    this.y = y;
}

var distanceBetweenVertex = function(vertexA, vertexB) {
    return  Math.sqrt(Math.pow(vertexB.x-vertexA.x, 2) + Math.pow(vertexB.y-vertexA.y, 2) + Math.pow(vertexB.z-vertexA.z, 2));
}

var middlePoint = function(vertexA, vertexB){
	
	return new Vector3((vertexB.x-vertexA.x)/2.0, (vertexB.y-vertexA.y)/2.0, (vertexB.z-vertexA.z)/2.0);
}

var normalizeVector = function (vertex) {
    var length = (Math.sqrt(Math.pow(vertex.x, 2) + Math.pow(vertex.y,2)+ Math.pow(vertex.z,2)));

    return new Vector3(vertex.x / length, vertex.y / length, vertex.z / length);
}

// newell's method
var calculateSurfaceNormal = function (vertex){

    var x = 0, y = 0, z = 0;

    for (var i = 0; i < vertex.length; i++){
        var current = vertex[i];
        var next = vertex[(i+1) % vertex.length];

        x += (current.y - next.y) * (current.z + next.z);
        y += (current.z - next.z) * (current.z + next.x);
        z += (current.x - next.x) * (current.y + next.y);
    }

    return normalizeVector(new Vector3(x,y,z));

}