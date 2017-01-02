#ifndef __CHESS_H
#define __CHESS_H

#include "bitmap.h"
#include "utilities.h"


#define WHITE_SHORT_CASTLING 2
#define WHITE_LONG_CASTLING 3
#define BLACK_SHORT_CASTLING 4
#define BLACK_LONG_CASTLING 5
#define MATE 6
#define PROMOTION 7
#define W_EN_PASSANT 8
#define B_EN_PASSANT 9

typedef struct
{
	//Name of the piece (R, N, B, K , Q, p, n)
	char name;

	//Color of the piece (b, w)
	char color;

    //1 = alive, 0 = dead
	int state;

	//matrixposition
	int i;
	int j;

	//position
	int xpos;
	int ypos;

	//background (b, w)
	char bg;

}Piece;

static Piece matrix[8][8];

void fillBoard();

void updateBoard();

int makeMove(Piece pi, Piece pf);

void reset_flags();

int unmakeMove(Piece p1, Piece p2, int force);

int isValidMove(Piece p1, Piece p2);

int isCheckMate(Piece p1, Piece p2);

int isCheck(unsigned char color);

int isPar(int x);

Piece getMatrixAt(int x, int y);


#endif /* __CHESS */
