
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


getPiece(Board, Row, Col, Piece) :-
	getElePos(Row, Board, Line),
	getElePos(Col, Line, Piece).

getElePos(1, [Element|_], Element).

getElePos(Pos, [_|Tail], Element) :-
	Pos > 1,
	Next is Pos-1,
	getElePos(Next, Tail, Element).



setPiece(BoardIn, Row, Col, Piece, BoardOut) :-
	setRow(Row, BoardIn, Col, Piece, BoardOut).

setRow(1, [Row|Tail], Col, Piece, [NewRow|Tail]):-
	setCol(Col, Row, Piece, NewRow).

setRow(Pos, [Row|Tail], Col, Piece, [Row|NewTail]):-
	Pos > 1,
	Next is Pos-1,
	setRow(Next, Tail, Col, Piece, NewTail).

setCol(1, [_|Tail], Piece, [Piece|Tail]).

setCol(Pos, [Element|Tail], Piece, [Element|NewTail]):-
	Pos > 1,
	Next is Pos-1,
	setCol(Next, Tail, Piece, NewTail).
