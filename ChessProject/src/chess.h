#ifndef __CHESS_H
#define __CHESS_H

#include "bitmap.h"
#include "utilities.h"


#define WHITE_SHORT_CASTLING 2
#define WHITE_LONG_CASTLING 3

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

int isValidMove(Piece p1, Piece p2);

Piece getMatrixAt(int x, int y);


#endif /* __CHESS */
