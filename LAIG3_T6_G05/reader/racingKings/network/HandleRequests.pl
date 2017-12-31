:- ensure_loaded('../model/Game.pl').

%teste servidor
parse_input(handshake, handshake).
parse_input(quit, goodbye).

%game commands

parse_input(start-GameMode-GameDifficulty, Board-GameState-GameModeOut):-
    initialBoard(TempBoard),
    matrixToJson(TempBoard, Board),
    GameState = whiteToMove,
    (
        (GameMode == 0) -> GameModeOut = pvp;
        (GameMode == 2) -> GameModeOut = cvcWhite;
        (GameMode == 1, GameDifficulty == 0) -> GameModeOut = pvcWhiteRandom;
        GameModeOut = pvcWhiteSmart
    ), !,
	bb_put(blackCanTieFlag, 0).

parse_input(move-Board-GameState-GameMode-OldRow-OldCol-NewRow-NewCol, Board):-
    getPiece(Board, OldCol, OldRow, Piece),
    write(Piece), nl, nl,
    write(GameState), nl,
    validateOwnership(Piece, GameState, 0).


