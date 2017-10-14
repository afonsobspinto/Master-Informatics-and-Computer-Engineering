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
	getPieceToBeMovedSourceCoords(SrcRow, SrcCol).
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
