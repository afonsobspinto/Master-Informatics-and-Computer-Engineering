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
	getBoard(Game, Board),
	repeat,
	clearConsole,
	printBoard(Board),
	getSourceCoords(SrcCol, SrcRow),
	getPiece(Board, SrcCol, SrcRow, Piece),
	getGameState(Game, GameState),
	validateOwnership(Piece, GameState),
	getDestinyCoords(DestCol, DestRow),
	validateMove(Piece, SrcCol, SrcRow, DestCol, DestRow, Board).
	%makeMove(Piece, SrcCol, SrcRow, DestCol, DestRow, Game, TempGame),
	%changeTurn(TempGame, NewGame).







	%Interaction functions

getInputCoords(SrcCol, SrcRow):-
	getColChar(SrcCol),
	getRowInt(SrcRow),
	get_code(_).


getSourceCoords(SrcCol,SrcRow):-
	write('Coords of Piece To Move: '), nl,
	getInputCoords(SrcCol, SrcRow), nl.

getDestinyCoords(SrcCol,SrcRow):-
	write('Coords of Piece New Position: '), nl,
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
	% write('Invalid Piece!'), nl, TODO: Ask that cut stuff to the teacher
	fail.

%%Piece Nao é preciso aqui
validateMove(Piece, SrcCol, SrcRow, DestCol, DestRow, Board):-
	convertToNumber(SrcCol, SrcColNumber),
	convertToNumber(DestCol, DestColNumber),
	differentPositions(SrcColNumber, SrcRow, DestColNumber, DestRow), !,
	write('differentPositions'), nl,
	differentColors(SrcCol, SrcRow, DestCol, DestRow, Board), !,
	write('differentColors'), nl,
	getPieceName(Piece, PieceName),
	write('PieceName:'), write(PieceName), nl,
	write('Initial Coords: '), write(SrcColNumber), write(SrcRow), nl,
	write('Final Coords: '), write(DestColNumber), write(DestRow), nl,
	validBasicMove(PieceName, SrcColNumber, SrcRow, DestColNumber, DestRow),
	write('validMove'), nl.
	% checkForJumping(PieceName, SrcCol, SrcRow, DestCol, DestRow, Board),
	% write('Jumping'), nl,
	% setPiece(Board, DestCol, DestRow, Piece, TempBoard),
	% write('set'), nl.
	% checkForCheck(TempBoard, SrcCol, SrcRow, DestCol, DestRow).



differentPositions(SrcCol, SrcRow, DestCol, DestRow):-
	SrcRow =\= DestRow ; SrcCol =\= DestCol.

differentPositions(_, _, _, _):-
	invalidMove.

differentColors(SrcCol, SrcRow, DestCol, DestRow, Board):-
	getPiece(Board, SrcCol, SrcRow, PieceSrc),
	getPiece(Board, DestCol, DestRow, PieceDest),
	getPieceColor(PieceSrc, ColorSrc),
	getPieceColor(PieceDest, ColorDest),
	ColorSrc \== ColorDest.

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

checkForCheck(TempBoard, SrcCol, SrcRow, DestCol, DestRow):-
 	getPiece(TempBoard, WhiteKingCol, WhiteKingRow, 'wK'),
 	getPiece(TempBoard, BlackKingCol, BlackKingRow, 'bK'),
 	makePseudoMoves('Black', WhiteKingCol, WhiteKingRow, TempBoard),
 	makePseudoMoves('White', BlackKingCol, BlackKingRow, TempBoard).

makePseudoMoves('Black', WhiteKingCol, WhiteKingRow, TempBoard):-
	checkMove(PieceName, 'Black', WhiteKingCol, WhiteKingRow, DestCol, DestRow, TempBoard).

makePseudoMoves('White', BlackKingCol, BlackKingRow, TempBoard):-
	checkMove(PieceName, 'White', BlackKingCol, BlackKingRow, DestCol, DestRow, TempBoard).

checkMove('Rook', 'Black', SrcCol, SrcRow, DestCol, DestRow, TempBoard):-
	getPiece(TempBoard, DestCol, DestRow, 'bR'),
	validBasicMove('Rook', SrcCol, SrcRow, DestCol, DestRow).

checkMove('Bishop', 'Black', SrcCol, SrcRow, DestCol, DestRow, TempBoard):-
	getPiece(TempBoard, DestCol, DestRow, 'bB'),
	validBasicMove('Bishop', SrcCol, SrcRow, DestCol, DestRow).

checkMove('Queen', 'Black', SrcCol, SrcRow, DestCol, DestRow, TempBoard):-
	getPiece(TempBoard, DestCol, DestRow, 'bQ'),
	validBasicMove('Queen', SrcCol, SrcRow, DestCol, DestRow).

checkMove('Knight', 'Black', SrcCol, SrcRow, DestCol, DestRow, TempBoard):-
	getPiece(TempBoard, DestCol, DestRow, 'bN'),
	validBasicMove('Knight', SrcCol, SrcRow, DestCol, DestRow).

checkMove('King', 'Black', SrcCol, SrcRow, DestCol, DestRow, TempBoard):-
	getPiece(TempBoard, DestCol, DestRow, 'bK'),
	validBasicMove('King', SrcCol, SrcRow, DestCol, DestRow).

checkMove('Rook', 'White', SrcCol, SrcRow, DestCol, DestRow, TempBoard):-
	getPiece(TempBoard, DestCol, DestRow, 'wR'),
	validBasicMove('Rook', SrcCol, SrcRow, DestCol, DestRow).

checkMove('Bishop', 'White', SrcCol, SrcRow, DestCol, DestRow, TempBoard):-
	getPiece(TempBoard, DestCol, DestRow, 'wB'),
	validBasicMove('Bishop', SrcCol, SrcRow, DestCol, DestRow).

checkMove('Queen', 'White', SrcCol, SrcRow, DestCol, DestRow, TempBoard):-
	getPiece(TempBoard, DestCol, DestRow, 'wQ'),
	validBasicMove('Queen', SrcCol, SrcRow, DestCol, DestRow).

checkMove('Knight', 'White', SrcCol, SrcRow, DestCol, DestRow, TempBoard):-
	getPiece(TempBoard, DestCol, DestRow, 'wN'),
	validBasicMove('Knight', SrcCol, SrcRow, DestCol, DestRow).

checkMove('King', 'White', SrcCol, SrcRow, DestCol, DestRow, TempBoard):-
	getPiece(TempBoard, DestCol, DestRow, 'wK'),
	validBasicMove('King', SrcCol, SrcRow, DestCol, DestRow).
