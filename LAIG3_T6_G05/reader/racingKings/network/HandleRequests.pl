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
    ), !.

parse_input(move-Board-GameState-GameMode-SrcRow-SrcCol-DestRow-DestCol, NewBoard-NewGameState-NewGameMode):-
    getPiece(Board, SrcCol, SrcRow, Piece),
    validateOwnership(Piece, GameState, 0),
    differentPositions(SrcCol, SrcRow, DestCol, DestRow, 0), !,
    differentColors(SrcCol, SrcRow, DestCol, DestRow, Board, 0), !,
    getPieceName(Piece, PieceName),
    validBasicMove(PieceName, SrcCol, SrcRow, DestCol, DestRow, 0), !,
    checkForJumping(PieceName, SrcCol, SrcRow, DestCol, DestRow, Board, 0), !,
    makeMove(Board, SrcCol, SrcRow, DestCol, DestRow, NextBoard), !,
    write(NextBoard), nl, nl,
    checkForCheck(NextBoard, 0),
    updateGameState([Board, GameState, GameMode], NextBoard, [TempNewBoard, NewGameState, NewGameMode]),
    matrixToJson(TempNewBoard, NewBoard).

parse_input(bot-Board-GameState-GameMode, NewBoard-NewGameState-NewGameMode):-
    (
    (GameMode == pvcWhiteSmart) -> somehowSmartBotTurn([Board, GameState, GameMode],  [TempNewBoard, NewGameState, NewGameMode]);
    botTurn([Board, GameState, GameMode], [TempNewBoard, NewGameState, NewGameMode])
    ),
    matrixToJson(TempNewBoard, NewBoard).






