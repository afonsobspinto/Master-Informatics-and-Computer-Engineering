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
    mat4.identity(this.transformMatrix);
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


    this.graph.scene.pushMatrix();

    this.graph.scene.multMatrix(this.transformMatrix);


    if (this.materialID == "null")
        this.graph.materialsStack.push(this.graph.materialsStack[this.graph.materialsStack.length-1]);
    else
        this.graph.materialsStack.push(this.materialID);


    for (var i = 0; i < this.children.length; i++){
        this.graph.nodes[this.children[i]].display();
    }

    for(var j = 0; j < this.leaves.length; j++){
        var material = this.graph.materials[this.graph.materialsStack[this.graph.materialsStack.length-1]];
        material.apply();
        this.leaves[j].display();
    }

    this.graph.materialsStack.pop();

    this.graph.scene.popMatrix();

}

/**
 *
 * @returns the node's material
 */

MyGraphNode.prototype.getMaterial = function() {
    return this.materialID;
}


/**
 *
 * @returns the node's texture
 */
MyGraphNode.prototype.getTexture = function() {
    return this.textureID;
}
