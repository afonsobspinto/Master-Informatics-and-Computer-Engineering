/**
 * Creates a 3D Vector
 */
class Vector3{
    /**
     * Creates a 3D Vector
     * @constructor
     * @param x - The x-coordinate
     * @param y - The y-coordinate
     * @param z - The z-coordinate
     */
    constructor(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    /**
     * Transforms the vector to an array
     * @returns [null,null,null] array [x,y,z]
     */
    toArray(){
        return [this.x, this.y, this.z];
    }
}

/**
 * Creates a 2D Vector
 * @param x - The x-coordinate
 * @param y - The y-coordinate
 */
let Vector2 = function (x, y) {
    this.x = x;
    this.y = y;
};

/**
 * Calculates the distance between two vertexes
 * @param vertexA - The first vertex
 * @param vertexB - The second vertex
 * @returns number distance between the two vertexes
 */
let distanceBetweenVertex = function (vertexA, vertexB) {
    return Math.sqrt(Math.pow(vertexB.x - vertexA.x, 2) + Math.pow(vertexB.y - vertexA.y, 2) + Math.pow(vertexB.z - vertexA.z, 2));
};

/**
 * Calculates the middle point between two vertexes
 * @param vertexA - The first vertex
 * @param vertexB - The second vertex
 * @returns Vector3 middle point between the two vertexes
 */
let middlePoint = function (vertexA, vertexB) {

    return new Vector3((vertexB.x - vertexA.x) / 2.0, (vertexB.y - vertexA.y) / 2.0, (vertexB.z - vertexA.z) / 2.0);
};

/**
 * Normalizes a vertex
 * @param vertex - The vertex
 * @returns Vector3 3D transformed vector
 */
let normalizeVector = function (vertex) {
    const length = (Math.sqrt(Math.pow(vertex.x, 2) + Math.pow(vertex.y, 2) + Math.pow(vertex.z, 2)));

    return new Vector3(vertex.x / length, vertex.y / length, vertex.z / length);
};

// newell's method
/**
 * Calculates the normal surface (newell's method) of a vertex
 * @param vertex - The vertex
 * @returns Vector3 3D vector normalized
 */
let calculateSurfaceNormal = function (vertex) {

    let x = 0, y = 0, z = 0;

    for (let i = 0; i < vertex.length; i++) {
        const current = vertex[i];
        const next = vertex[(i + 1) % vertex.length];

        x += (current.y - next.y) * (current.z + next.z);
        y += (current.z - next.z) * (current.z + next.x);
        z += (current.x - next.x) * (current.y + next.y);
    }

    return normalizeVector(new Vector3(x, y, z));

};