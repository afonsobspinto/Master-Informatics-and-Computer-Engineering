gameMode(pvp).
gameMode(pvb).
gameMode(bvb).

player(whitePlayer).
player(blackPlayer).

%%% Game[Board, gameState, gameMode];

createPvPGame(Game):-
	initialBoard(Board),
	Game = [Board, whitePlayer, pvp], !.


getGameState(Game, GameState):-
	nth0(1,Game, GameState).

playGame(Game):-
	clearConsole,
	getBoard(Game, Board),
	printBoard(Board),
	getSourceCoords(SrcCol, SrcRow),
	getPiece(Board, SrcCol, SrcRow, Piece),
	getGameState(Game, GameState),
	validateOwnership(Piece, GameState),
	getDestinyCoords(DestCol, DestRow).
	validateMove(Piece, SrcCol, SrcRow, DestCol, DestRow, Board),
	%makeMove().
	%ChangeTurn







	%Interaction functions

	%some problems here with j2 input for example.
getInputCoords(SrcCol, SrcRow):-
	getColChar(SrcCol),
	getRowInt(SrcRow),
	get_code(_).


getSourceCoords(SrcCol,SrcRow):-
	write('Piece To Move: '), nl,
	getInputCoords(SrcCol, SrcRow), nl.

getDestinyCoords(SrcCol,SrcRow):-
	write('Piece New Position: '), nl,
	getInputCoords(SrcCol, SrcRow), nl.


validateOwnership(Piece, GameState):-
	GameState == whitePlayer,
	getPieceColor(Piece, Color),
	Color == 'White'.

validateOwnership(Piece, GameState):-
	GameState == blackPlayer,
	getPieceColor(Piece, Color),
	Color == 'Black'.

validateOwnership(_, _):-
	write('Invalid Piece!'), nl,
	fail.

validateMove(Piece, SrcCol, SrcRow, DestCol, DestRow, Board):-
	differentPositions(SrcCol, SrcRow, DestCol, DestRow),
	differentColors(SrcCol, SrcRow, DestCol, DestRow, Board),
	validBasicMove(Piece, SrcCol, SrcRow, DestCol, DestRow).
	%CheckForJumping().
	%CheckForCheck().



differentPositions(SrcCol, SrcRow, DestCol, DestRow):-
	SrcRow =\= SrcCol ; SrcCol =\= DestCol.

differentPositions(_, _, _, _):-
	invalidMove.

differentColors(SrcCol, SrcRow, DestCol, DestRow, Board):-
	getPiece(Board, SrcCol, SrcRow, PieceSrc),
	getPiece(Board, SrcCol, SrcRow, PieceDest),
	getPieceColor(PieceSrc, ColorSrc),
	getPieceColor(PieceDest, ColorDest),
	ColorSrc =\= ColorDest.

differentColors(_, _, _, _, _):-
	invalidMove.

invalidMove:-
	write('Invalid Move!'), nl,
	fail.
