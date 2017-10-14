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
	validateOwnership(Piece, GameState).
	%
	% clearConsole,
	% printBoard(Board),
	% printTurnInfo(Player), nl, nl,
	% getPieceToBeMovedDestinyCoords(DestRow, DestCol),
	% validateDifferentCoordinates(SrcRow, SrcCol, DestRow, DestCol),
	%
	% validateMove(SrcRow, SrcCol, DestRow, DestCol, Game, TempGame),
	% changePlayer(TempGame, ResultantGame), !.








	%Interaction functions

	%some problems here with j2 input for example.
getInputCoords(SrcCol, SrcRow):-
	getColChar(SrcCol),
	getRowInt(SrcRow).


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

validateOwnership(Piece, GameState):-
	write('Invalid Piece!'), nl,
	fail.
