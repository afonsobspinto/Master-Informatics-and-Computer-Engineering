/**
 * The map of the Pieces
 */
var cache = new Map();

var makeView = function (scene, type) {
    if (!cache.has(type)) {
        if (type === Piece.KING)
            cache.set(type, new Obj(scene, 'scenes/pieces/King.obj'));
        else if (type === Piece.QUEEN)
            cache.set(type, new Obj(scene, 'scenes/pieces/Queen.obj'));
        else if (type === Piece.BISHOP)
            cache.set(type, new Obj(scene, 'scenes/pieces/Bishop.obj'));
        else if (type === Piece.KNIGHT)
            cache.set(type, new Obj(scene, 'scenes/pieces/Horse.obj'));
        else if (type === Piece.ROOK)
            cache.set(type, new Obj(scene, 'scenes/pieces/Rook.obj'));
    }

    return cache.get(type);
}

