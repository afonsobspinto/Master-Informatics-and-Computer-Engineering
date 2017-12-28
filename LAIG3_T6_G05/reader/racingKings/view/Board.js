class Board {
    constructor(scene) {
        this.scene = scene;
        this.board = [
            new Array(8),
            new Array(8),
            new Array(8),
            new Array(8),
            new Array(8),
            new Array(8),
            new Array(8),
            new Array(8),
        ];
    }

    display() {
        console.log("Displaying Board");
    }
}
