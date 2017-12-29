:- ensure_loaded('../model/Game.pl').

%teste servidor
parse_input(handshake, handshake).
parse_input(quit, goodbye).

%game commands
parse_input(start-GameMode-GameDifficulty, Game):-
    initialBoard(Board),
    (
        (GameMode == 0) -> Game = [Board, whiteToMove, pvp];
        (GameMode == 2) -> Game = [Board, whiteToMove, cvcWhite];
        (GameMode == 1, GameDifficulty == 0) -> Game = [Board, whiteToMove, pvcWhiteRandom];
        Game = [Board, whiteToMove, pvcWhiteSmart]
    ), !,
	bb_put(blackCanTieFlag, 0).