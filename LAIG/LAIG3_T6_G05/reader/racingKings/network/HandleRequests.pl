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
        (GameMode == 2, GameDifficulty == 0) -> GameModeOut = cvcWhiteRandom;
        (GameMode == 2, GameDifficulty == 1) -> GameModeOut = cvcWhiteSmart;
        (GameMode == 1, GameDifficulty == 0) -> GameModeOut = pvcWhiteRandom;
        GameModeOut = pvcWhiteSmart
    ), !,
    bb_put(blackCanTieFlag, 0).

parse_input(move-Board-GameState-GameMode-SrcRow-SrcCol-DestRow-DestCol, NewBoard-NewGameState-NewGameMode):-
    getPiece(Board, SrcCol, SrcRow, Piece),
    validateOwnership(Piece, GameState, 0),
    differentPositions(SrcCol, SrcRow, DestCol, DestRow, 0), !,
    differentColors(SrcCol, SrcRow, DestCol, DestRow, Board, 0), !,
    getPieceName(Piece, PieceName),
    validBasicMove(PieceName, SrcCol, SrcRow, DestCol, DestRow, 0), !,
    checkForJumping(PieceName, SrcCol, SrcRow, DestCol, DestRow, Board, 0), !,
    makeMove(Board, SrcCol, SrcRow, DestCol, DestRow, NextBoard), !,
    checkForCheck(NextBoard, 0),
    updateGameState([Board, GameState, GameMode], NextBoard, [TempNewBoard, NewGameState, NewGameMode]),
    matrixToJson(TempNewBoard, NewBoard).

parse_input(bot-Board-GameState-GameMode, NewBoard-NewGameState-NewGameMode):-
    (
    (GameMode == pvcWhiteSmart; GameMode == cvcWhiteSmart) -> somehowSmartBotTurn([Board, GameState, GameMode],  [TempNewBoard, NewGameState, NewGameMode]);
    botTurn([Board, GameState, GameMode], [TempNewBoard, NewGameState, NewGameMode])
    ),
    matrixToJson(TempNewBoard, NewBoard).

parse_input(strength-Board-GameState-GameMode, Strength):-
    evaluatePosition('white', Board, WhiteValue), !,
    evaluatePosition('black', Board, BlackValue), !,
	(GameState == whiteToMove ->
	        WhiteNewValue is (WhiteValue + 10), Strength is (WhiteNewValue - BlackValue) ;
	        BlackNewValue is (BlackValue + 10),	Strength is (WhiteValue - BlackNewValue)
	).

