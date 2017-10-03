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

MyGraphNode.prototype.display = function(parentTextureID, parentMaterialID) {

    var newMaterial = parentMaterialID;
    var newTexture = parentTextureID;


    //TODO: Check if every situation is controlled

    this.graph.scene.pushMatrix();

    this.graph.scene.multMatrix(this.transformMatrix);

    for(var i = 0; i < this.leaves.length; i++){
        this.leaves[i].display();
    }

    for (var j = 0; j < this.children.length; j++){
        if (this.materialID != 'null')
            newMaterial = this.materialID;

        if (newMaterial != 'null')
            this.graph.materials[newMaterial].apply();


        if(this.textureID != 'null' && this.textureID != 'clear')
            newTexture = this.textureID;
        if(this.textureID != 'clear' && newTexture!='null'){
            console.log(newTexture);
            this.graph.textures[newTexture][0].bind();
        }



        this.graph.nodes[this.children[j]].display(newTexture, newMaterial);

    }

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
