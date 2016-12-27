#ifndef __CHESS_H
#define __CHESS_H

#include "bitmap.h"
#include "utilities.h"


typedef struct
{
	//Name of the piece (R, N, B, K , Q, p, n)
	char name;

	//Color of the piece (b, w)
	char color;

    //1 = alive, 0 = dead
	int state;

	//position
	int xpos;
	int ypos;

	//background (b, w)
	char bg;

}Piece;

static Piece matrix[8][8];

void fillBoard();

void updateBoard();

//int isValidMove(Piece piece, Position pi, Position pf);

int isCheckMate();

int isCheck();

int clearBoard();

Piece getMatrixAt(int x, int y);


#endif /* __CHESS */
