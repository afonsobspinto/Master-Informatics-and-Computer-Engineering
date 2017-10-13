gameMode(pvp).
gameMode(pvb).
gameMode(bvb).

player(whitePlayer).
player(blackPlayer).

%%% Game[Board, gameState, gameMode];

createPvPGame(Game):-
	initialBoard(Board),
	Game = [Board, whitePlayer, pvp], !.


playGame(Game):-
	clearConsole,
	getBoard(Game, Board),
	printBoard(Board),
	getPiece(Board, 7, 8, Piece), nl,
	write(Piece),
	setPiece(Board,7,8, nonePiece, NewBoard),
	getPiece(NewBoard, 7, 8, Piece2), nl,
	write(Piece2).
	% getPieceToBeMovedSourceCoords(SrcRow, SrcCol),
	% validateChosenPieceOwnership(SrcRow, SrcCol, Board, Player),
	%
	% clearConsole,
	% printBoard(Board),
	% printTurnInfo(Player), nl, nl,
	% getPieceToBeMovedDestinyCoords(DestRow, DestCol),
	% validateDifferentCoordinates(SrcRow, SrcCol, DestRow, DestCol),
	%
	% validateMove(SrcRow, SrcCol, DestRow, DestCol, Game, TempGame),
	% changePlayer(TempGame, ResultantGame), !.
