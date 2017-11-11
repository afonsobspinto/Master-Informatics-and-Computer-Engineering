gameMode(pvp).
gameMode(pvb).
gameMode(bvb).

gameState(whiteToMove).
gameState(blackToMove).
gameState(whiteVictorious).
gameState(blackVictorious).
gameState(tie).
%gameState(stalemate). %TODO: Esta regra existe aqui?

%%% Game[Board, gameState, gameMode];

createPvPGame(Game):-
	initialBoard(Board),
	Game = [Board, whiteToMove, pvp], !.

createPvCGame(Game):-
	initialBoard(Board),
	Game = [Board, whiteToMove, pvc], !.

createCvCGame(Game):-
	initialBoard(Board),
	Game = [Board, whiteToMove, cvc], !.



getGameState(Game, GameState):-
	nth0(1,Game, GameState).

getGameMode(Game, GameMode):-
	nth0(2,Game, GameMode).

%Game Over
playGame(Game):-
	getGameState(Game, GameState),
	getBoard(Game, Board),
	clearConsole,
	printBoard(Board),
	(
		GameState == whiteVictorious ->
			(write('# Game over. White player won, congratulations!'), nl);
		GameState == blackVictorious ->
			(write('# Game over. Black player won, congratulations!'), nl);
		GameState == tie ->
			(write('# Game over. We got a tie, good game!'), nl);
		fail
	),
	pressEnterToContinue, !.

%Game Manager
playGame(Game):-
	getGameMode(Game, GameMode),
	(
		GameMode == pvp -> (humanTurn(Game, ContinueGame), playGame(ContinueGame), !);
		GameMode == pvc -> (humanTurn(Game, ContinueGame), botTurn(ContinueGame, BotContinueGame), playGame(BotContinueGame), !); %TODO: Human poder ser preto(2º a jogar) #Racismo
		GameMode == cvc -> (
		getBoard(Game, Board), clearConsole, printBoard(Board), nl,nl, pressEnterToContinue, botTurn(Game, ContinueGame),
		getBoard(ContinueGame, ContinueBoard), clearConsole, printBoard(ContinueBoard), nl,nl, pressEnterToContinue, somehowSmartBotTurn(ContinueGame, BotContinueGame),
		playGame(BotContinueGame), !) %TODO: Bots com abordagens diferentes
	).


%TODO: Show GameState: White2Move...

%Game Cycle Human
humanTurn(Game, ContinueGame):-
	getBoard(Game, Board),
	repeat,
	clearConsole,
	printBoard(Board),
	getSourceCoords(SrcCol, SrcRow),
	convertToNumber(SrcCol, SrcColNumber),
	getPiece(Board, SrcColNumber, SrcRow, Piece),
	getGameState(Game, GameState),
	validateOwnershipWrapper(Piece, GameState),
	getDestinyCoords(DestCol, DestRow),
	convertToNumber(DestCol, DestColNumber),
	validateMove(Piece, SrcColNumber, SrcRow, DestColNumber, DestRow, Board),
	makeMove(Board, SrcColNumber, SrcRow, DestColNumber, DestRow, NextBoard),
	updateGameState(Game, NextBoard, ContinueGame).


somehowSmartBotTurn(Game, ContinueGame):-
	getGameState(Game, GameState),
	(
	GameState == whiteVictorious;
	GameState == blackVictorious;
	GameState == tie
	),
	ContinueGame = Game.

	%Game Cycle Smart Bot - tries somehow Smart move
somehowSmartBotTurn(Game, ContinueGame):-
	getBoard(Game, Board),
	getGameState(Game, GameState),
	(
		GameState == whiteToMove -> getPiece(Board, SrcCol, SrcRow, 'King', 'White');
		getPiece(Board, SrcCol, SrcRow, 'King', 'Black')
	),
	getPiece(Board, SrcCol, SrcRow, Piece),
	DestRow is SrcRow + 1,
	random(0, 3, Move),
	(
		(Move =:= 0, DestCol is SrcCol, validateMove(Piece, SrcCol, SrcRow, DestCol, DestRow, Board));
		(Move =:= 1, DestCol is SrcCol + 1,  validateMove(Piece, SrcCol, SrcRow, DestCol, DestRow, Board));
		(Move =:= 2, DestCol is SrcCol-1, validateMove(Piece, SrcCol, SrcRow, DestCol, DestRow, Board))
	),
	makeMove(Board, SrcCol, SrcRow, DestCol, DestRow, NextBoard),
	updateGameState(Game, NextBoard, ContinueGame).

%Game Cycle Smart Bot - tries Random move
somehowSmartBotTurn(Game, ContinueGame):-
	botTurn(Game, ContinueGame).

%Check if Game as over in the first Play
botTurn(Game, ContinueGame):-
	getGameState(Game, GameState),
	(
	GameState == whiteVictorious;
	GameState == blackVictorious;
	GameState == tie
	),
	ContinueGame = Game.


%Game Cycle Random Bot
botTurn(Game, ContinueGame):-
	getBoard(Game, Board),
	repeat,
	random(1, 9, SrcRow),
	random(1, 9, SrcCol),
	getPiece(Board, SrcCol, SrcRow, Piece),
	getGameState(Game, GameState),
	validateOwnershipWrapper(Piece, GameState),
	random(1, 9, DestRow),
	random(1, 9, DestCol),
	validateMove(Piece, SrcCol, SrcRow, DestCol, DestRow, Board),
	makeMove(Board, SrcCol, SrcRow, DestCol, DestRow, NextBoard),
	updateGameState(Game, NextBoard, ContinueGame).

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

validateOwnershipWrapper(Piece, GameState):-
	validateOwnership(Piece, GameState), !.

validateOwnership(Piece, GameState):-
	GameState == whiteToMove,
	getPieceColor(Piece, Color),
	Color == 'White'.

validateOwnership(Piece, GameState):-
	GameState == blackToMove,
	getPieceColor(Piece, Color),
	Color == 'Black'.

validateOwnership(_, _):-
	%write('Invalid Piece!'), nl,
	%pressEnterToContinue, !,
	fail.



%TODO:
%%Piece Nao é preciso aqui
validateMove(Piece, SrcCol, SrcRow, DestCol, DestRow, Board):-
	differentPositions(SrcCol, SrcRow, DestCol, DestRow), !,
	differentColors(SrcCol, SrcRow, DestCol, DestRow, Board), !,
	getPieceName(Piece, PieceName),
	validBasicMove(PieceName, SrcCol, SrcRow, DestCol, DestRow), !,
	checkForJumping(PieceName, SrcCol, SrcRow, DestCol, DestRow, Board), !,
	makeMove(Board, SrcCol, SrcRow, DestCol, DestRow, TempBoard), !, %TODO: Doesn't show Invalid Move when fails cause it's pseudo
	checkForCheck(TempBoard).


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

%TODO: Maybe add a Flag
invalidMove:-
	%write('Invalid Move!'), nl,
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
	validBasicMove(PieceName, Col, Row, DestCol, DestRow),%TODO: Doesn't show Invalid Move when fails cause it's pseudo
	checkForJumping(PieceName, Col, Row, DestCol, DestRow, TempBoard).


makePseudoMoves('White', TempBoard, DestCol, DestRow):-
	getPiece(TempBoard, Col, Row, PieceName, PieceColor),
	PieceColor == 'White',
	validBasicMove(PieceName, Col, Row, DestCol, DestRow), %TODO: Doesn't show Invalid Move when fails cause it's pseudo
	checkForJumping(PieceName, Col, Row, DestCol, DestRow, TempBoard).

updateGameState(Game, NextBoard, ContinueGame):-
	gameOver(Game, NextBoard, ContinueGame).

updateGameState(Game, NextBoard, ContinueGame):-
	changeTurn(Game, NextBoard, ContinueGame).

gameOver(Game, NextBoard, ContinueGame):-
	kingOnLastRow('White', NextBoard),
	\+(blackCanTie(NextBoard)),
	getGameMode(Game, GameMode),
	ContinueGame = [NextBoard, whiteVictorious, GameMode], !.

gameOver(Game, NextBoard, ContinueGame):-
	kingOnLastRow('Black', NextBoard),
	getGameMode(Game, GameMode),
	ContinueGame = [NextBoard, blackVictorious, GameMode], !.

%TODO: tecnically they can make other move besides the one that gives a draw. But then they lose
gameOver(Game, NextBoard, ContinueGame):-
	kingOnLastRow('White', NextBoard),
	blackCanTie(NextBoard),
	getGameMode(Game, GameMode),
	ContinueGame = [NextBoard, tie, GameMode],!.

kingOnLastRow(Color, Board):-
	getPiece(Board, _, 8, 'King', Color).

blackCanTie(Board):-
	getPiece(Board, Col, 7, 'King', 'Black'),
	differentColors(Col, 7, Col, 8, Board),
	makeMove(Board, Col, 7, Col, 8, NextBoard), %TODO: Doesn't show Invalid Move when fails cause it's pseudo
	checkForCheck(NextBoard).

blackCanTie(Board):-
	getPiece(Board, Col, 7, 'King', 'Black'),
	NextCol is Col+1,
	differentColors(Col, 7, NextCol, 8, Board),
	makeMove(Board, Col, 7, NextCol, 8, NextBoard), %TODO: Doesn't show Invalid Move when fails cause it's pseudo
	checkForCheck(NextBoard).

blackCanTie(Board):-
	getPiece(Board, Col, 7, 'King', 'Black'),
	LastCol is Col-1,
	differentColors(Col, 7, LastCol, 8, Board),
	makeMove(Board, Col, 7, LastCol, 8, NextBoard), %TODO: Doesn't show Invalid Move when fails cause it's pseudo
	checkForCheck(NextBoard).

changeTurn(Game, NextBoard, ContinueGame):-
	getGameMode(Game, GameMode),
	getGameState(Game, GameState),
	(
		GameState == whiteToMove ->
		NextGameState = blackToMove;
		NextGameState = whiteToMove
	),
	ContinueGame = [NextBoard, NextGameState, GameMode], !.
