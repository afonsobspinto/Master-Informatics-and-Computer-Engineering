:- ensure_loaded('../model/Game.pl').

%teste servidor
parse_input(handshake, handshake).
parse_input(quit, goodbye).

%game commands
parse_input(start-GameMode-GameDifficulty, Board-GameState-GameModeOut):-
    initialBoard(Board),
    GameState = whiteToMove,
    (
        (GameMode == 0) -> GameModeOut = pvp;
        (GameMode == 2) -> GameModeOut = cvcWhite;
        (GameMode == 1, GameDifficulty == 0) -> GameModeOut = pvcWhiteRandom;
        GameModeOut = pvcWhiteSmart
    ), !,
	bb_put(blackCanTieFlag, 0).