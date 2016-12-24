#include "chess.h"
#include "utilities.h"


void fillBoard(){

	Piece wrock ={'R','w',1,200,200};
	matrix[0][0] = wrock;
	matrix[0][8] = wrock;

	printf("%d \n", matrix[0][0].state);
	printf("%d \n", matrix[0][8].state);

}

Piece getMatrixAt(int x, int y){
	if(x>=0 && x < ROWS &&
			y>=0 && y < COLS)
		return matrix[x][y];

}
