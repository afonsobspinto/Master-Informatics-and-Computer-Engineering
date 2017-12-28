class Cell {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.piece = null;
    }

    get getPiece(){
        return this.piece;
    }

    get getX(){
        return this.x;
    }

    get getY(){
        return this.y;
    }
}
