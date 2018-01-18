/**
 * MyGraphLeaf class, representing a leaf in the scene graph.
 * @param graph
 * @param primitive
 * @param leafID
 * @constructor
**/

function MyGraphLeaf(graph, primitive, leafID) {

    this.graph = graph;

    this.primitive = primitive;

    // The material ID.
    this.materialID = null ;

    // The texture ID.
    this.textureID = null ;

}


/**
 * Displays the primitive
 */

MyGraphLeaf.prototype.display = function () {
    this.primitive.display();
};
