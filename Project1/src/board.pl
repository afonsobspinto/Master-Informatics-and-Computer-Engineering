
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

	%Print Board functions

%TODO: Colors



printBoard(Board):-
	rowIDsList(RowIDs),
	write('    _______________________________________________________'), nl,
	write('   |      |      |      |      |      |      |      |      |'), nl,
	printBoard(Board, RowIDs).

printBoard([],[]):-
		printColumnIDs, nl, nl.

printBoard([Line|[]],[RowsIDTail|[]]):-
	write(RowsIDTail), write('|'),
	printLine(Line), nl,
	write('   |      |      |      |      |      |      |      |      |'), nl,
	write('   |______|______|______|______|______|______|______|______|'), nl,
	printBoard([],[]).

printBoard([Line|BoardTail], [RowsIDHead|RowsIDTail]) :-
	write(RowsIDHead), write('|'),
	printLine(Line), nl,
	write('   |      |      |      |      |      |      |      |      |'), nl,
	write('   |------|------|------|------|------|------|------|------|'), nl,
	write('   |      |      |      |      |      |      |      |      |'), nl,
	printBoard(BoardTail,RowsIDTail).

printLine([]).
printLine([Piece|LineTail]):-
	getPieceSymbol(Piece, Symbol),
	write('  '), write(Symbol), write('  |'),
	printLine(LineTail).

printColumnIDs:-
	write('       a      b      c      d      e      f      g      h').

rowIDsList([' 8 ', ' 7 ', ' 6 ', ' 5 ', ' 4 ', ' 3 ', ' 2 ', ' 1 ']).


%Matrix Helper functions

getBoard([Board|_], Board).


getPiece(Board, Col, Row, Piece) :-
	% convertToNumber(Col,ColNumber),
	RowNumber is abs(Row-9),
	nth1(RowNumber, Board, Line),
  nth1(Col, Line, Piece).

getPiece(Board, Col, Row, PieceName, PieceColor) :-
	nth1(TempRow, Board, Line),
    nth1(Col, Line, Value),
	getPieceName(Value, PieceNameTemp),
	getPieceColor(Value, PieceColorTemp),
	PieceName = PieceNameTemp,
	PieceColor = PieceColorTemp,
	Row is abs(9-TempRow).

setPiece(BoardIn, Col, Row, Piece, BoardOut) :-
	RowDiff is abs(9-Row),
	setRow(RowDiff, BoardIn, Col, Piece, BoardOut).

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


%Validation Helper functions

findPieceOnCol(_, LowRow, HighRow, _):-
	NextRow is (LowRow+1),
	NextRow == HighRow.

findPieceOnCol(SrcCol, LowRow, HighRow, Board):-
	NextRow is (LowRow+1),
	getPiece(Board, SrcCol, NextRow, Piece),
	getPieceName(Piece, Name),
	Name == 'none',
	findPieceOnCol(SrcCol, NextRow, HighRow, Board).

findPieceOnRow(_, LowCol, HighCol, _):-
	NextCol is (LowCol+1),
	NextCol == HighCol.

findPieceOnRow(SrcRow, LowCol, HighCol, Board):-
	NextCol is (LowCol+1),
	getPiece(Board, NextCol, SrcRow, Piece),
	getPieceName(Piece, Name),
	Name == 'none',
	findPieceOnRow(SrcRow, NextCol, HighCol, Board).

findPieceOnDiagonalLeft(LowRow, HighCol, HighRow, LowCol, _):-
	LowRow == HighRow,
	LowCol == HighCol.

findPieceOnDiagonalLeft(LowRow, HighCol, HighRow, LowCol, Board):-
	getPiece(Board, HighCol, LowRow, Piece),
	getPieceName(Piece, Name),
	Name == 'none',
	NextRow is (LowRow+1),
	NextCol is (HighCol-1),
	findPieceOnDiagonalLeft(NextRow, NextCol, HighRow, LowCol, Board).

findPieceOnDiagonalRight(LowRow, LowCol, HighRow, HighCol, _):-
	LowRow == HighRow,
	LowCol == HighCol.

findPieceOnDiagonalRight(LowRow, LowCol, HighRow, HighCol, Board):-
	getPiece(Board, LowCol, LowRow, Piece),
	getPieceName(Piece, Name),
	Name == 'none',
	NextRow is (LowRow+1),
	NextCol is (LowCol+1),
	findPieceOnDiagonalRight(NextRow, NextCol, HighRow, HighCol, Board).
