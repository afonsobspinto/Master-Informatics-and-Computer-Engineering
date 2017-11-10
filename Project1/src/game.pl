gameMode(pvp).
gameMode(pvb).
gameMode(bvb).

player(whitePlayer).
player(blackPlayer).

%%% Game[Board, gameState, gameMode];

createPvPGame(Game):-
	testBoard(Board),
	Game = [Board, whitePlayer, pvp], !.


getGameState(Game, GameState):-
	nth0(1,Game, GameState).

playGame(Game):-
	getBoard(Game, Board),
	repeat,
	clearConsole,
	printBoard(Board),
	getSourceCoords(SrcCol, SrcRow),
	convertToNumber(SrcCol, SrcColNumber),
	getPiece(Board, SrcColNumber, SrcRow, Piece),
	getGameState(Game, GameState),
	validateOwnership(Piece, GameState),
	getDestinyCoords(DestCol, DestRow),
	convertToNumber(DestCol, DestColNumber),
	validateMove(Piece, SrcColNumber, SrcRow, DestColNumber, DestRow, Board).
	% makeMove(Board, SrcColNumber, SrcRow, DestColNumber, DestRow, FinalBoard),
	% getPieceColor(Piece, PieceColor),
	% updateGameState(PieceColor, FinalBoard, DestCol, DestRow).
	%UpdateGameState & changeTurn




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
	differentPositions(SrcCol, SrcRow, DestCol, DestRow), !,
	write('differentPositions'), nl,
	differentColors(SrcCol, SrcRow, DestCol, DestRow, Board), !,
	write('differentColors'), nl,
	getPieceName(Piece, PieceName),
	write('PieceName:'), write(PieceName), nl,
	% write('Initial Coords: '), write(SrcCol), write(SrcRow), nl,
	% write('Final Coords: '), write(DestCol), write(DestRow), nl,
	validBasicMove(PieceName, SrcCol, SrcRow, DestCol, DestRow), !,
	write('Valid Basic Move'), nl,
	checkForJumping(PieceName, SrcCol, SrcRow, DestCol, DestRow, Board), !,
	write('No Jumping'), nl,
	makeMove(Board, SrcCol, SrcRow, DestCol, DestRow, TempBoard), !,
	printBoard(TempBoard).
	% checkForCheck(TempBoard).


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
	SrcCol == DestCol,
	DiffRows is (DestRow-SrcRow),
	DiffRows < 0, %Down
	findPieceOnCol(SrcCol, DestRow, SrcRow, Board).

checkForJumping('Rook', SrcCol, SrcRow, DestCol, DestRow, Board):-
	SrcCol == DestCol,
	DiffRows is (DestRow-SrcRow),
	DiffRows > 0, %UP
	findPieceOnCol(SrcCol, SrcRow, DestRow, Board).

checkForJumping('Rook', SrcCol, SrcRow, DestCol, DestRow, Board):-
	SrcRow == DestRow,
	DiffCols is (DestCol-SrcCol),
	DiffCols > 0, %Right
	findPieceOnRow(SrcRow, SrcCol, DestCol, Board).

checkForJumping('Rook', SrcCol, SrcRow, DestCol, DestRow, Board):-
	SrcRow == DestRow,
	DiffCols is (DestCol-SrcCol),
	DiffCols < 0, %Left
	findPieceOnRow(SrcRow, DestCol, SrcCol, Board).

checkForJumping('Bishop', SrcCol, SrcRow, DestCol, DestRow, Board):-
	DiffRows is (DestRow - SrcRow),
	DiffRows > 0, %UP
	DiffCols is (DestCol-SrcCol),
	DiffCols < 0, %Left

	LowRow is (SrcRow+1),
	HighCol is (SrcCol-1),
	findPieceOnDiagonalLeft(LowRow, HighCol, DestRow, DestCol, Board).

checkForJumping('Bishop', SrcCol, SrcRow, DestCol, DestRow, Board):-
	DiffRows is (DestRow - SrcRow),
	DiffRows < 0, %Down
	DiffCols is (DestCol-SrcCol),
	DiffCols > 0, %Right

	LowRow is (DestRow+1),
	HighCol is (DestCol-1),
	findPieceOnDiagonalLeft(LowRow, HighCol, SrcRow, SrcCol, Board).

checkForJumping('Bishop', SrcCol, SrcRow, DestCol, DestRow, Board):-
	DiffRows is (DestRow - SrcRow),
	DiffRows > 0, %UP
	DiffCols is (DestCol-SrcCol),
	DiffCols > 0, %Right

	LowRow is (SrcRow+1),
	LowCol is (SrcCol+1),
	findPieceOnDiagonalRight(LowRow, LowCol, DestRow, DestCol, Board).

checkForJumping('Bishop', SrcCol, SrcRow, DestCol, DestRow, Board):-
	DiffRows is (DestRow - SrcRow),
	DiffRows < 0, %Down
	DiffCols is (DestCol-SrcCol),
	DiffCols < 0, %Left

	LowRow is (DestRow+1),
	LowCol is (DestCol+1),
	findPieceOnDiagonalRight(LowRow, LowCol, SrcRow, SrcCol, Board).

checkForJumping('Queen', SrcCol, SrcRow, DestCol, DestRow, Board):-
	SrcCol == DestCol,
	DiffRows is (DestRow-SrcRow),
	DiffRows < 0, %Down
	findPieceOnCol(SrcCol, DestRow, SrcRow, Board).

checkForJumping('Queen', SrcCol, SrcRow, DestCol, DestRow, Board):-
	SrcCol == DestCol,
	DiffRows is (DestRow-SrcRow),
	DiffRows > 0, %UP
	findPieceOnCol(SrcCol, SrcRow, DestRow, Board).

checkForJumping('Queen', SrcCol, SrcRow, DestCol, DestRow, Board):-
	SrcRow == DestRow,
	DiffCols is (DestCol-SrcCol),
	DiffCols > 0, %Right
	findPieceOnRow(SrcRow, SrcCol, DestCol, Board).

checkForJumping('Queen', SrcCol, SrcRow, DestCol, DestRow, Board):-
	SrcRow == DestRow,
	DiffCols is (DestCol-SrcCol),
	DiffCols < 0, %Left
	findPieceOnRow(SrcRow, DestCol, SrcCol, Board).

checkForJumping('Queen', SrcCol, SrcRow, DestCol, DestRow, Board):-
	DiffRows is (DestRow - SrcRow),
	DiffRows > 0, %UP
	DiffCols is (DestCol-SrcCol),
	DiffCols < 0, %Left

	LowRow is (SrcRow+1),
	HighCol is (SrcCol-1),
	findPieceOnDiagonalLeft(LowRow, HighCol, DestRow, DestCol, Board).

checkForJumping('Queen', SrcCol, SrcRow, DestCol, DestRow, Board):-
	DiffRows is (DestRow - SrcRow),
	DiffRows < 0, %Down
	DiffCols is (DestCol-SrcCol),
	DiffCols > 0, %Right

	LowRow is (DestRow+1),
	HighCol is (DestCol-1),
	findPieceOnDiagonalLeft(LowRow, HighCol, SrcRow, SrcCol, Board).

checkForJumping('Queen', SrcCol, SrcRow, DestCol, DestRow, Board):-
	DiffRows is (DestRow - SrcRow),
	DiffRows > 0, %UP
	DiffCols is (DestCol-SrcCol),
	DiffCols > 0, %Right

	LowRow is (SrcRow+1),
	LowCol is (SrcCol+1),
	findPieceOnDiagonalRight(LowRow, LowCol, DestRow, DestCol, Board).

checkForJumping('Queen', SrcCol, SrcRow, DestCol, DestRow, Board):-
	DiffRows is (DestRow - SrcRow),
	DiffRows < 0, %Down
	DiffCols is (DestCol-SrcCol),
	DiffCols < 0, %Left

	LowRow is (DestRow+1),
	LowCol is (DestCol+1),
	findPieceOnDiagonalRight(LowRow, LowCol, SrcRow, SrcCol, Board).

checkForJumping('King', SrcCol, SrcRow, DestCol, DestRow, Board).
checkForJumping('Knight', SrcCol, SrcRow, DestCol, DestRow, Board).

checkForJumping(_, _, _, _, _, _):-
	invalidMove.

makeMove(Board, SrcCol, SrcRow, DestCol, DestRow, TempBoard):-
	getPiece(Board, SrcCol, SrcRow, Piece),
	nonePiece(NonePiece),
	write(SrcCol), write(SrcRow), nl,
	setPiece(Board, SrcCol, SrcRow, NonePiece, TempTempBoard),
	setPiece(TempTempBoard, DestCol, DestRow, Piece, TempBoard).

checkForCheck(TempBoard):-
	getPiece(TempBoard, WhiteKingCol, WhiteKingRow, 'King', 'White'),
	getPiece(TempBoard, BlackKingCol, BlackKingRow, 'King', 'Black'),
	\+(makePseudoMoves('Black', TempBoard, WhiteKingCol, WhiteKingRow)),
	\+(makePseudoMoves('White', TempBoard, BlackKingCol, BlackKingRow)).

makePseudoMoves('Black', TempBoard, DestCol, DestRow):-
	getPiece(TempBoard, Col, Row, PieceName, PieceColor),
	PieceColor == 'Black',
	write(PieceName),write(' '),write(PieceColor), nl,
	validBasicMove(PieceName, Col, Row, DestCol, DestRow),%TODO: Doesn't show Invalid Move when fails cause it's pseudo
	checkForJumping(PieceName, Col, Row, DestCol, DestRow, TempBoard).


makePseudoMoves('White', TempBoard, DestCol, DestRow):-
	getPiece(TempBoard, Col, Row, PieceName, PieceColor),
	PieceColor == 'White',
	write(PieceName),write(' '),write(PieceColor), nl,
	validBasicMove(PieceName, Col, Row, DestCol, DestRow),
	write('ok'), nl,
	checkForJumping(PieceName, Col, Row, DestCol, DestRow, TempBoard).

updateGameState(PieceColor, TempBoard, DestCol, DestRow):-
	kingOnLastRow(PieceColor, TempBoard, DestRow).

kingOnLastRow('Black', TempBoard, DestRow):-
	DestRow = 8,
	write('Black Win').

kingOnLastRow('White', TempBoard, DestRow):-
	DestRow = 8,
	getPiece(TempBoard, OtherKingCol, OtherKingRow, 'King', 'Black'),
	validBasicMove('King', OtherKingCol, OtherKingRow, OtherKingCol, 8),
	write('Tie 1').

kingOnLastRow('White', TempBoard, DestRow):-
	DestRow = 8,
	getPiece(TempBoard, OtherKingCol, OtherKingRow, 'King', 'Black'),
	validBasicMove('King', OtherKingCol, OtherKingRow, (OtherKingCol + 1), 8),
	write('Tie 2').

kingOnLastRow('White', TempBoard, DestRow):-
	DestRow = 8,
	getPiece(TempBoard, OtherKingCol, OtherKingRow, 'King', 'Black'),
	validBasicMove('King', OtherKingCol, OtherKingRow, (OtherKingCol - 1), 8),
	write('Tie 3').

kingOnLastRow('White', TempBoard, DestRow):-
	DestRow = 8,
	write('White Win').
