
initialBoard([
	[nonePiece, nonePiece, nonePiece, nonePiece, nonePiece, nonePiece, nonePiece, nonePiece],
	[nonePiece, nonePiece, nonePiece, nonePiece, nonePiece, nonePiece, nonePiece, nonePiece],
	[nonePiece, nonePiece, nonePiece, nonePiece, nonePiece, nonePiece, nonePiece, nonePiece],
	[nonePiece, nonePiece, nonePiece, nonePiece, nonePiece, nonePiece, nonePiece, nonePiece],
	[nonePiece, nonePiece, nonePiece, nonePiece, nonePiece, nonePiece, nonePiece, nonePiece],
	[nonePiece, nonePiece, nonePiece, nonePiece, nonePiece, nonePiece, nonePiece, nonePiece],
	[blackKing, blackRook1, blackBishop1, blackKnigth1, whiteKnigth1, whiteBishop1, whiteRook1, whiteKing],
  [blackQueen, blackRook2, blackBishop2, blackKnigth2, whiteKnigth2, whiteBishop2, whiteRook2, whiteQueen]
	]).


getBoard([Board|_], Board).

printBoard([],[]):-printColumnIDs.

printBoard(Board):-
	rowIDsList(RowIDs),
	printBoard(Board, RowIDs).


printBoard([Line|BoardTail], [RowsIDHead|RowsIDTail]) :-
	write(RowsIDHead), write('|'),
	printLine(Line), nl,
	printBoard(BoardTail,RowsIDTail).


printLine([]).
printLine([Piece|LineTail]):-
	getPieceSymbol(Piece, Symbol),
	write(Symbol), write('|'),
	printLine(LineTail).


printColumnIDs:-
	write('     a  b  c  d  e  f  g  h').

rowIDsList([' 1 ', ' 2 ', ' 3 ', ' 4 ', ' 5 ', ' 6 ', ' 7 ', ' 8 ']).


getPieceSymbol(nonePiece, '  ').
getPieceSymbol(blackKing, 'bK').
getPieceSymbol(blackQueen, 'bQ').
getPieceSymbol(blackRook1, 'bR').
getPieceSymbol(blackRook2, 'bR').
getPieceSymbol(blackBishop1, 'bB').
getPieceSymbol(blackBishop2, 'bB').
getPieceSymbol(blackKnigth1, 'bN').
getPieceSymbol(blackKnigth2, 'bN').

getPieceSymbol(whiteKing, 'wK').
getPieceSymbol(whiteQueen, 'wQ').
getPieceSymbol(whiteRook1, 'wR').
getPieceSymbol(whiteRook2, 'wR').
getPieceSymbol(whiteBishop1, 'wB').
getPieceSymbol(whiteBishop2, 'wB').
getPieceSymbol(whiteKnigth1, 'wN').
getPieceSymbol(whiteKnigth2, 'wN').
