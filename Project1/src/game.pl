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
	validateMove(Piece, SrcCol, SrcRow, DestCol, DestRow, Board).
	%makeMove(Piece, SrcCol, SrcRow, DestCol, DestRow, Game, TempGame),
	%changeTurn(TempGame, NewGame).







	%Interaction functions

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


	%Validation functions

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
	getPieceName(Piece, PieceName),
	validBasicMove(PieceName, SrcCol, SrcRow, DestCol, DestRow).
	checkForJumping(PieceName, SrcCol, SrcRow, DestCol, DestRow, Board),
	setPiece(Board, DestCol, DestRow, Piece, TempBoard).
	% checkForCheck(TempBoard, SrcCol, SrcRow, DestCol, DestRow).



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


checkForJumping('Rook', SrcCol, SrcRow, DestCol, DestRow, Board):-
	(SrcCol == DestCol),
	(DestRow - SrcRow) < 0, %Up
	findPieceOnCol(SrcCol, DestRow, SrcRow, Board).

checkForJumping('Rook', SrcCol, SrcRow, DestCol, DestRow, Board):-
	(SrcCol == DestCol),
	(DestRow - SrcRow) > 0, %Down
	findPieceOnCol(SrcCol, SrcRow, DestRow, Board).

checkForJumping('Rook', SrcCol, SrcRow, DestCol, DestRow, Board):-
	(SrcRow == DestRow),
	(DestCol - SrcCol) < 0, %Left
	findPieceOnRow(SrcRow, DestCol, SrcCol, Board).

checkForJumping('Rook', SrcCol, SrcRow, DestCol, DestRow, Board):-
	(SrcRow == DestRow),
	(DestCol - SrcCol) > 0, %Right
	findPieceOnRow(SrcRow, SrcCol, DestCol, Board).

checkForJumping('Bishop', SrcCol, SrcRow, DestCol, DestRow, Board):-
	(DestRow - SrcRow) < 0, %Up
	(DestCol - SrcCol) < 0, %Left
	findPieceOnDiagonal(DestCol, SrcCol, DestRow, SrcRow, Board).

checkForJumping('Bishop', SrcCol, SrcRow, DestCol, DestRow, Board):-
	(DestRow - SrcRow) < 0, %Up
	(DestCol - SrcCol) < 0, %Right
	findPieceOnDiagonal(SrcCol, DestCol, DestRow, SrcRow, Board).

checkForJumping('Bishop', SrcCol, SrcRow, DestCol, DestRow, Board):-
	(DestRow - SrcRow) < 0, %Down
	(DestCol - SrcCol) < 0, %Right
	findPieceOnDiagonal(SrcCol, DestCol, SrcRow, DestRow, Board).

checkForJumping('Bishop', SrcCol, SrcRow, DestCol, DestRow, Board):-
	(DestRow - SrcRow) < 0, %Down
	(DestCol - SrcCol) < 0, %Left
	findPieceOnDiagonal(DestCol, SrcCol, SrcRow, DestRow, Board).

checkForJumping('Queen', SrcCol, SrcRow, DestCol, DestRow, Board):-
	(SrcCol == DestCol),
	(DestRow - SrcRow) < 0, %Up
	findPieceOnCol(SrcCol, DestRow, SrcRow, Board).

checkForJumping('Queen', SrcCol, SrcRow, DestCol, DestRow, Board):-
	(SrcCol == DestCol),
	(DestRow - SrcRow) > 0, %Down
	findPieceOnCol(SrcCol, SrcRow, DestRow, Board).

checkForJumping('Queen', SrcCol, SrcRow, DestCol, DestRow, Board):-
	(SrcRow == DestRow),
	(DestCol - SrcCol) < 0, %Left
	findPieceOnRow(SrcRow, DestCol, SrcCol, Board).

checkForJumping('Queen', SrcCol, SrcRow, DestCol, DestRow, Board):-
	(SrcRow == DestRow),
	(DestCol - SrcCol) > 0, %Right
	findPieceOnRow(SrcRow, SrcCol, DestCol, Board).

checkForJumping('Queen', SrcCol, SrcRow, DestCol, DestRow, Board):-
	(DestRow - SrcRow) < 0, %Up
	(DestCol - SrcCol) < 0, %Left
	findPieceOnDiagonal(DestCol, SrcCol, DestRow, SrcRow, Board).

checkForJumping('Queen', SrcCol, SrcRow, DestCol, DestRow, Board):-
	(DestRow - SrcRow) < 0, %Up
	(DestCol - SrcCol) < 0, %Right
	findPieceOnDiagonal(SrcCol, DestCol, DestRow, SrcRow, Board).

checkForJumping('Queen', SrcCol, SrcRow, DestCol, DestRow, Board):-
	(DestRow - SrcRow) < 0, %Down
	(DestCol - SrcCol) < 0, %Right
	findPieceOnDiagonal(SrcCol, DestCol, SrcRow, DestRow, Board).

checkForJumping('Queen', SrcCol, SrcRow, DestCol, DestRow, Board):-
	(DestRow - SrcRow) < 0, %Down
	(DestCol - SrcCol) < 0, %Left
	findPieceOnDiagonal(DestCol, SrcCol, SrcRow, DestRow, Board).

checkForJumping('King', SrcCol, SrcRow, DestCol, DestRow, Board).
checkForJumping('Knight', SrcCol, SrcRow, DestCol, DestRow, Board).


% checkForCheck(TempBoard, SrcCol, SrcRow, DestCol, DestRow):-
% 	findKingPosition('White', WhiteKingCol, WhiteKingRow, TempBoard),
% 	findKingPosition('Black', BlackKingCol, BlackKingRow, TempBoard),
% 	makePseudoMoves('Black', WhiteKingCol, WhiteKingRow, TempBoard),
% 	makePseudoMoves('White', BlackKingCol, BlackKingRow, TempBoard).
