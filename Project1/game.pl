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
	% printBoard(Board),
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
