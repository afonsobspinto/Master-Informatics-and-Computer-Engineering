/**
 * @constructor Piece
 * @param {CGFScene} scene
 * @param {CGFScene} info 	Information from the .obj file
 * @param {int}	lastVertexIndex	Last Vertex index
 * @param {int} vertexTotal 	Number of vertexes
 *
 */

function Piece(scene, info, lastVertexIndex, vertexTotal) {
    this.scene = scene;
    this.line = info;
    this.lastVertexIndex = lastVertexIndex;
    this.vertexTotal = vertexTotal;
    this.initBuffers();
}


Piece.prototype = Object.create(CGFobject.prototype);
Piece.prototype.constructor = Piece;

/**
 * Initiates the .obj piece elements.
 *
 * @method initBuffers
 */

Piece.prototype.initBuffers = function () {

    this.vertices = [];
    this.normals = [];
    this.indices = [];

    var repeated = 0;

    for (j in this.line) {
        var elements = this.line[j].split(' ');
        switch(elements[0]) {
            case 'v':
                this.vertices.push(parseFloat(elements[1]),
                    parseFloat(elements[2]), parseFloat(elements[3]));
                break;
            case 'f':
                var v = [];
                v[0] = parseFloat(elements[1]) - 1 - this.lastVertexIndex; v[1] = parseFloat(elements[2]) - 1 - this.lastVertexIndex; v[2] =  parseFloat(elements[3]) - 1 - this.lastVertexIndex;

                var p0 = []; p0[0] = this.vertices[v[0] * 3]; p0[1] = this.vertices[v[0] * 3 + 1]; p0[2] = this.vertices[v[0] * 3 + 2];
                var p1 = []; p1[0] = this.vertices[v[1] * 3]; p1[1] = this.vertices[v[1] * 3 + 1]; p1[2] = this.vertices[v[1] * 3 + 2];
                var p2 = []; p2[0] = this.vertices[v[2] * 3]; p2[1] = this.vertices[v[2] * 3 + 1]; p2[2] = this.vertices[v[2] * 3 + 2];

                var vec1 = vec3.fromValues(p1[0] - p0[0], p1[1] - p0[1], p1[2] - p0[2]);
                var vec2 = vec3.fromValues(p2[0] - p0[0], p2[1] - p0[1], p2[2] - p0[2]);
                var normal = vec3.create();

                vec3.cross(normal, vec1, vec2);

                for (var i = 0; i < v.length; i++) {
                    if (this.normals[v[i] * 3] != null) {
                        this.vertices.push(this.vertices[v[i] * 3],
                            this.vertices[v[i] * 3 + 1], this.vertices[v[i] * 3 + 2]);
                        v[i] = this.vertexTotal + repeated;
                        repeated++;
                    }
                    this.normals[v[i] * 3] = normal[0];
                    this.normals[v[i] * 3 + 1] = normal[1];
                    this.normals[v[i] * 3 + 2] = normal[2];
                }

                this.indices.push(v[0], v[1], v[2]);

                break;
        }
    }

    this.primitiveType=this.scene.gl.TRIANGLES;
    this.initGLBuffers();

}
