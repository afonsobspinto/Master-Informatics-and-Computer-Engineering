/**
 * MyGraphNode class, representing an intermediate node in the scene graph.
 * @constructor
**/

function MyGraphNode(graph, nodeID) {
    this.graph = graph;

    this.nodeID = nodeID;

    // IDs of child nodes.
    this.children = [];

    // IDs of child nodes.
    this.leaves = [];

    // The material ID.
    this.materialID = null ;

    // The texture ID.
    this.textureID = null ;

    this.transformMatrix = mat4.create();
    mat4.identity(this.transformMatrix); // Contém a matrix equivalente. O valor deve ser atribruido com math.clone().
}

/**
 * Adds the reference (ID) of another node to this node's children array.
 */
MyGraphNode.prototype.addChild = function(nodeID) {
    this.children.push(nodeID);
}

/**
 * Adds a leaf to this node's leaves array.
 */
MyGraphNode.prototype.addLeaf = function(leaf) {
    this.leaves.push(leaf);
}

/**
 * Displays the node
 */

MyGraphNode.prototype.display = function() {


    //TODO: ADD Textures and Materials

    this.graph.scene.pushMatrix();

    this.graph.scene.multMatrix(this.transformMatrix);

    for(var i = 0; i < this.leaves.length; i++){
        console.log(this.leaves);
        this.leaves[i].display();
    }

    for (var j = 0; j < this.children.length; j++){
        console.log(this.children);
        this.graph.nodes[this.children[j]].display();
    }

    this.graph.scene.popMatrix();


}