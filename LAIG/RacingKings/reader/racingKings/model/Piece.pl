%%% Piece[piece, color, symbol];

whiteKing(['king', 'white']).
whiteQueen(['queen', 'white']).
whiteRook1(['rook', 'white']).
whiteRook2(['rook', 'white']).
whiteBishop1(['bishop', 'white']).
whiteBishop2(['bishop', 'white']).
whiteKnigth1(['knight', 'white']).
whiteKnigth2(['knight', 'white']).

blackKing(['king', 'black']).
blackQueen(['queen', 'black']).
blackRook1(['rook', 'black']).
blackRook2(['rook', 'black']).
blackBishop1(['bishop', 'black']).
blackBishop2(['bishop', 'black']).
blackKnigth1(['knight', 'black']).
blackKnigth2(['knight', 'black']).

nonePiece(['none', 'none']).

getPieceColor(Piece, Color):-
	nth0(1, Piece, Color).

getPieceName(Piece, Name):-
  nth0(0, Piece, Name).

getPieceSymbol(Piece, Symbol):-
  getPieceName(Piece,Name), Name == 'king', getPieceColor(Piece, Color), Color == 'white', Symbol = 'wK'.

getPieceSymbol(Piece, Symbol):-
  getPieceName(Piece,Name), Name == 'queen', getPieceColor(Piece, Color), Color == 'white', Symbol = 'wQ'.

getPieceSymbol(Piece, Symbol):-
  getPieceName(Piece,Name), Name == 'rook', getPieceColor(Piece, Color), Color == 'white', Symbol = 'wR'.

getPieceSymbol(Piece, Symbol):-
  getPieceName(Piece,Name), Name == 'bishop', getPieceColor(Piece, Color), Color == 'white', Symbol = 'wB'.

getPieceSymbol(Piece, Symbol):-
  getPieceName(Piece,Name), Name == 'knight', getPieceColor(Piece, Color), Color == 'white', Symbol = 'wN'.

getPieceSymbol(Piece, Symbol):-
  getPieceName(Piece,Name), Name == 'king', getPieceColor(Piece, Color), Color == 'black', Symbol = 'bK'.

getPieceSymbol(Piece, Symbol):-
  getPieceName(Piece,Name), Name == 'queen', getPieceColor(Piece, Color), Color == 'black', Symbol = 'bQ'.

getPieceSymbol(Piece, Symbol):-
  getPieceName(Piece,Name), Name == 'rook', getPieceColor(Piece, Color), Color == 'black', Symbol = 'bR'.

getPieceSymbol(Piece, Symbol):-
  getPieceName(Piece,Name), Name == 'bishop', getPieceColor(Piece, Color), Color == 'black', Symbol = 'bB'.

getPieceSymbol(Piece, Symbol):-
  getPieceName(Piece,Name), Name == 'knight', getPieceColor(Piece, Color), Color == 'black', Symbol = 'bN'.

getPieceSymbol(Piece, Symbol):-
  getPieceName(Piece,Name), Name == 'none', getPieceColor(Piece, Color), Color == 'none', Symbol = '  '.

 getPieceValue('king', Value):-
	Value = 900.
getPieceValue('queen', Value):-
	Value = 90.
getPieceValue('rook', Value):-
	Value = 50.
getPieceValue('bishop', Value):-
	Value = 30.
getPieceValue('knight', Value):-
	Value = 25.

%Basic Piece Movement

validBasicMove('king', SrcCol, SrcRow, DestCol, DestRow, _):-
  DiffCols is abs(DestCol-SrcCol),
  DiffRows is abs(DestRow-SrcRow),
  DiffCols < 2,
  DiffRows < 2.

validBasicMove('rook', SrcCol, _, DestCol, _, _):-
  (SrcCol == DestCol).
validBasicMove('rook', _, SrcRow, _, DestRow, _):-
  (SrcRow == DestRow).

validBasicMove('bishop', SrcCol, SrcRow, DestCol, DestRow, _):-
  DiffCols is abs(DestCol-SrcCol),
  DiffRows is abs(DestRow-SrcRow),
  DiffCols == DiffRows.

validBasicMove('knight', SrcCol, SrcRow, DestCol, DestRow, _):-
  DiffCols is abs(DestCol-SrcCol),
  DiffRows is abs(DestRow-SrcRow),
  DiffCols == 2,
  DiffRows == 1.

validBasicMove('knight', SrcCol, SrcRow, DestCol, DestRow, _):-
  DiffCols is abs(DestCol-SrcCol),
  DiffRows is abs(DestRow-SrcRow),
  DiffCols == 1,
  DiffRows == 2.

validBasicMove('queen', SrcCol, _, DestCol, _, _):-
  (SrcCol == DestCol).
validBasicMove('queen', _, SrcRow, _, DestRow, _):-
  (SrcRow == DestRow).
validBasicMove('queen', SrcCol, SrcRow, DestCol, DestRow, _):-
  DiffCols is abs(DestCol-SrcCol),
  DiffRows is abs(DestRow-SrcRow),
  DiffCols == DiffRows.

validBasicMove(_, _, _, _, _, Flag):-
	invalidMove(Flag).
