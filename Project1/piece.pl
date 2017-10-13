%%% Piece[piece, color, position];

whiteKing(['King', 'White', 'H2']).
whiteQueen(['Queen', 'White', 'H1']).
whiteRook1(['Rook', 'White', 'G2']).
whiteRook2(['Rook', 'White', 'G1']).
whiteBishop1(['Bishop', 'White', 'F2']).
whiteBishop2(['Bishop', 'White', 'F1']).
whiteKnigth1(['Knight', 'White', 'E2']).
whiteKnigth2(['Knight', 'White', 'E1']).

blackKing(['King', 'Black', 'A2']).
blackQueen(['Queen', 'Black', 'A1']).
blackRook1(['Rook', 'Black', 'B2']).
blackRook2(['Rook', 'Black', 'B1']).
blackBishop1(['Bishop', 'Black', 'C2']).
blackBishop2(['Bishop', 'Black', 'C1']).
blackKnigth1(['Knight', 'Black', 'D2']).
blackKnigth2(['Knight', 'Black', 'D1']).

nonePiece(['none', 'none', 'none']).


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
