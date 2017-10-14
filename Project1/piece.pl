%%% Piece[piece, color, symbol];

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
