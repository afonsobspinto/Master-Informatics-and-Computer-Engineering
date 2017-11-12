%%% Piece[piece, color, symbol];

whiteKing(['King', 'White']).
whiteQueen(['Queen', 'White']).
whiteRook1(['Rook', 'White']).
whiteRook2(['Rook', 'White']).
whiteBishop1(['Bishop', 'White']).
whiteBishop2(['Bishop', 'White']).
whiteKnigth1(['Knight', 'White']).
whiteKnigth2(['Knight', 'White']).

blackKing(['King', 'Black']).
blackQueen(['Queen', 'Black']).
blackRook1(['Rook', 'Black']).
blackRook2(['Rook', 'Black']).
blackBishop1(['Bishop', 'Black']).
blackBishop2(['Bishop', 'Black']).
blackKnigth1(['Knight', 'Black']).
blackKnigth2(['Knight', 'Black']).

nonePiece(['none', 'none']).

getPieceColor(Piece, Color):-
	nth0(1, Piece, Color).

getPieceName(Piece, Name):-
  nth0(0, Piece, Name).

getPieceSymbol(Piece, Symbol):-
  getPieceName(Piece,Name), Name == 'King', getPieceColor(Piece, Color), Color == 'White', Symbol = 'wK'.

getPieceSymbol(Piece, Symbol):-
  getPieceName(Piece,Name), Name == 'Queen', getPieceColor(Piece, Color), Color == 'White', Symbol = 'wQ'.

getPieceSymbol(Piece, Symbol):-
  getPieceName(Piece,Name), Name == 'Rook', getPieceColor(Piece, Color), Color == 'White', Symbol = 'wR'.

getPieceSymbol(Piece, Symbol):-
  getPieceName(Piece,Name), Name == 'Bishop', getPieceColor(Piece, Color), Color == 'White', Symbol = 'wB'.

getPieceSymbol(Piece, Symbol):-
  getPieceName(Piece,Name), Name == 'Knight', getPieceColor(Piece, Color), Color == 'White', Symbol = 'wN'.

getPieceSymbol(Piece, Symbol):-
  getPieceName(Piece,Name), Name == 'King', getPieceColor(Piece, Color), Color == 'Black', Symbol = 'bK'.

getPieceSymbol(Piece, Symbol):-
  getPieceName(Piece,Name), Name == 'Queen', getPieceColor(Piece, Color), Color == 'Black', Symbol = 'bQ'.

getPieceSymbol(Piece, Symbol):-
  getPieceName(Piece,Name), Name == 'Rook', getPieceColor(Piece, Color), Color == 'Black', Symbol = 'bR'.

getPieceSymbol(Piece, Symbol):-
  getPieceName(Piece,Name), Name == 'Bishop', getPieceColor(Piece, Color), Color == 'Black', Symbol = 'bB'.

getPieceSymbol(Piece, Symbol):-
  getPieceName(Piece,Name), Name == 'Knight', getPieceColor(Piece, Color), Color == 'Black', Symbol = 'bN'.

getPieceSymbol(Piece, Symbol):-
  getPieceName(Piece,Name), Name == 'none', getPieceColor(Piece, Color), Color == 'none', Symbol = '  '.

 getPieceValue('King', Value):-
	Value = 900.
getPieceValue('Queen', Value):-
	Value = 90.
getPieceValue('Rook', Value):-
	Value = 50.
getPieceValue('Bishop', Value):-
	Value = 30.
getPieceValue('Knight', Value):-
	Value = 25.
	
%Basic Piece Movement

validBasicMove('King', SrcCol, SrcRow, DestCol, DestRow, _):-
  DiffCols is abs(DestCol-SrcCol),
  DiffRows is abs(DestRow-SrcRow),
  DiffCols < 2,
  DiffRows < 2.

validBasicMove('Rook', SrcCol, _, DestCol, _, _):-
  (SrcCol == DestCol).
validBasicMove('Rook', _, SrcRow, _, DestRow, _):-
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

validBasicMove('Queen', SrcCol, _, DestCol, _, _):-
  (SrcCol == DestCol).
validBasicMove('Queen', _, SrcRow, _, DestRow, _):-
  (SrcRow == DestRow).
validBasicMove('Queen', SrcCol, SrcRow, DestCol, DestRow, _):-
  DiffCols is abs(DestCol-SrcCol),
  DiffRows is abs(DestRow-SrcRow),
  DiffCols == DiffRows.

validBasicMove(_, _, _, _, _, Flag):-
	invalidMove(Flag).