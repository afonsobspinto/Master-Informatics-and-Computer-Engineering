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


    console.log('Leaf Processed: ');
    console.log(primitive);


}


/**
 * Displays the primitive
 */

MyGraphLeaf.prototype.display = function () {
    this.primitive.display();
}

/**
 *
 * @returns the leaf's material
 */

MyGraphLeaf.prototype.getMaterial = function () {
    return this.materialID;
}

/**
 *
 * @returns the leaf's texture
 */
MyGraphLeaf.prototype.getTexture = function () {
    return this.textureID;
}