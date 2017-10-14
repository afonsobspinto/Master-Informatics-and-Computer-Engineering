
initialBoard(Board):-
	whiteKing(WhiteKing),
	whiteQueen(WhiteQueen),
	whiteRook1(WhiteRook1),
	whiteRook2(WhiteRook2),
	whiteBishop1(WhiteBishop1),
	whiteBishop2(WhiteBishop2),
	whiteKnigth1(WhiteKnigth1),
	whiteKnigth2(WhiteKnigth2),

	blackKing(BlackKing),
	blackQueen(BlackQueen),
	blackRook1(BlackRook1),
	blackRook2(BlackRook2),
	blackBishop1(BlackBishop1),
	blackBishop2(BlackBishop2),
	blackKnigth1(BlackKnigth1),
	blackKnigth2(BlackKnigth2),

	nonePiece(NonePiece),

	append([], [
	[NonePiece, NonePiece, NonePiece, NonePiece, NonePiece, NonePiece, NonePiece, NonePiece],
	[NonePiece, NonePiece, NonePiece, NonePiece, NonePiece, NonePiece, NonePiece, NonePiece],
	[NonePiece, NonePiece, NonePiece, NonePiece, NonePiece, NonePiece, NonePiece, NonePiece],
	[NonePiece, NonePiece, NonePiece, NonePiece, NonePiece, NonePiece, NonePiece, NonePiece],
	[NonePiece, NonePiece, NonePiece, NonePiece, NonePiece, NonePiece, NonePiece, NonePiece],
	[NonePiece, NonePiece, NonePiece, NonePiece, NonePiece, NonePiece, NonePiece, NonePiece],
	[BlackKing, BlackRook1, BlackBishop1, BlackKnigth1, WhiteKnigth1, WhiteBishop1, WhiteRook1, WhiteKing],
  [BlackQueen, BlackRook2, BlackBishop2, BlackKnigth2, WhiteKnigth2, WhiteBishop2, WhiteRook2, WhiteQueen]], Board).



getBoard([Board|_], Board).

printBoard([],[]):-
	printColumnIDs, nl, nl.

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


getPiece(Board, Col, Row, Piece) :-
	getElePos(Row, Board, Line),
	convertToNumber(Col, ColNumber),
	getElePos(ColNumber, Line, Piece).

getElePos(1, [Element|_], Element).

getElePos(Pos, [_|Tail], Element) :-
	Pos > 1,
	Pos < 9,
	Next is Pos-1,
	getElePos(Next, Tail, Element).



setPiece(BoardIn, Col, Row, Piece, BoardOut) :-
	convertToNumber(Col, ColNumber),
	setRow(Row, BoardIn, ColNumber, Piece, BoardOut).

setRow(1, [Row|Tail], Col, Piece, [NewRow|Tail]):-
	setCol(Col, Row, Piece, NewRow).

setRow(Pos, [Row|Tail], Col, Piece, [Row|NewTail]):-
	Pos > 1,
	Pos < 9,
	Next is Pos-1,
	setRow(Next, Tail, Col, Piece, NewTail).

setCol(1, [_|Tail], Piece, [Piece|Tail]).

setCol(Pos, [Element|Tail], Piece, [Element|NewTail]):-
	Pos > 1,
	Next is Pos-1,
	setCol(Next, Tail, Piece, NewTail).
