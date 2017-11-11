%%% Piece[piece, color, symbol];

%TODO:
%%Retirar simbolo da parte da peça
%%Brancas com maiúscula.

whiteKing(['King', 'White', 'wK']).
whiteQueen(['Queen', 'White', 'wQ']).
whiteRook1(['Rook', 'White', 'wR']).
whiteRook2(['Rook', 'White', 'wR']).
whiteBishop1(['Bishop', 'White', 'wB']).
whiteBishop2(['Bishop', 'White', 'wB']).
whiteKnigth1(['Knight', 'White', 'wN']).
whiteKnigth2(['Knight', 'White', 'wN']).

blackKing(['King', 'Black', 'bK']).
blackQueen(['Queen', 'Black', 'bQ']).
blackRook1(['Rook', 'Black', 'bR']).
blackRook2(['Rook', 'Black', 'bR']).
blackBishop1(['Bishop', 'Black', 'bB']).
blackBishop2(['Bishop', 'Black', 'bB']).
blackKnigth1(['Knight', 'Black', 'bN']).
blackKnigth2(['Knight', 'Black', 'bN']).

nonePiece(['none', 'none', '  ']).

getPieceSymbol(Piece, Symbol):-
  nth0(2, Piece, Symbol).

getPieceColor(Piece, Color):-
	nth0(1, Piece, Color).

getPieceName(Piece, Name):-
  nth0(0, Piece, Name).


%Basic Piece Movement

validBasicMove('King', SrcCol, SrcRow, DestCol, DestRow, _):-
  DiffCols is abs(DestCol-SrcCol),
  DiffRows is abs(DestRow-SrcRow),
  DiffCols < 2,
  DiffRows < 2.

validBasicMove('Rook', SrcCol, SrcRow, DestCol, DestRow, _):-
  (SrcCol == DestCol).
validBasicMove('Rook', SrcCol, SrcRow, DestCol, DestRow, _):-
  (SrcRow == DestRow).

validBasicMove('Bishop', SrcCol, SrcRow, DestCol, DestRow, _):-
  DiffCols is abs(DestCol-SrcCol),
  DiffRows is abs(DestRow-SrcRow),
  DiffCols == DiffRows.

validBasicMove('Knight', SrcCol, SrcRow, DestCol, DestRow, _):-
  DiffCols is abs(DestCol-SrcCol),
  DiffRows is abs(DestRow-SrcRow),
  DiffCols == 2,
  DiffRows == 1.

validBasicMove('Knight', SrcCol, SrcRow, DestCol, DestRow, _):-
  DiffCols is abs(DestCol-SrcCol),
  DiffRows is abs(DestRow-SrcRow),
  DiffCols == 1,
  DiffRows == 2.

validBasicMove('Queen', SrcCol, SrcRow, DestCol, DestRow, _):-
  (SrcCol == DestCol).
validBasicMove('Queen', SrcCol, SrcRow, DestCol, DestRow, _):-
  (SrcRow == DestRow).
validBasicMove('Queen', SrcCol, SrcRow, DestCol, DestRow, _):-
  DiffCols is abs(DestCol-SrcCol),
  DiffRows is abs(DestRow-SrcRow),
  DiffCols == DiffRows.

validBasicMove(_, _, _, _, _, Flag):-
invalidMove(Flag).
