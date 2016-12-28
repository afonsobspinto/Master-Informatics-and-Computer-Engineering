#include "chess.h"
#include "utilities.h"


void fillBoard(){

	Piece wrookb ={'R','w',1,0,0,210,535, 'b'};
	Piece wrookw ={'R','w',1,0,7,735,535, 'w'};
	Piece brookb ={'R','b',1,7,7,735,15, 'b'};
	Piece brookw ={'R','b',1,7,0,210,15, 'w'};

	matrix[0][0] = wrookb;
	matrix[0][7] = wrookw;
	matrix[7][7] = brookb;
	matrix[7][0] = brookw;

	Piece wknightb ={'N','w',1,0,6,660,535, 'b'};
	Piece wknightw ={'N','w',1,0,1,285,535, 'w'};
	Piece bknightb ={'N','b',1,7,1,285,15, 'b'};
	Piece bknightw ={'N','b',1,7,6,660,15, 'w'};

	matrix[0][6] = wknightb;
	matrix[0][1] = wknightw;
	matrix[7][1] = bknightb;
	matrix[7][6] = bknightw;

	Piece wbishopb ={'B','w',1,0,2,360,535, 'b'};
	Piece wbishopw ={'B','w',1,0,5,585,535, 'w'};
	Piece bbishopb ={'B','b',1,7,5,585,15, 'b'};
	Piece bbishopw ={'B','b',1,7,2,360,15, 'w'};

	matrix[0][2] = wbishopb;
	matrix[0][5] = wbishopw;
	matrix[7][5] = bbishopb;
	matrix[7][2] = bbishopw;

	Piece wkingb ={'K','w',1,0,4,510,535, 'b'};
	Piece bkingw ={'K','b',1,7,4,510,15, 'w'};

	matrix[0][4] = wkingb;
	matrix[7][4] = bkingw;


	Piece wqueenw ={'Q','w',1,0,3,435,535, 'w'};
	Piece bqueenb ={'Q','b',1,7,3,435,15, 'b'};

	matrix[0][3] = wqueenw;
	matrix[7][3] = bqueenb;


	Piece wpawn1w ={'p', 'w', 1, 1, 0, 210, 465, 'w'};
	Piece wpawn2b ={'p', 'w', 1, 1, 1, 285, 465, 'b'};
	Piece wpawn3w ={'p', 'w', 1, 1, 2, 360, 465, 'w'};
	Piece wpawn4b ={'p', 'w', 1, 1, 3, 435, 465, 'b'};
	Piece wpawn5w ={'p', 'w', 1, 1, 4, 510, 465, 'w'};
	Piece wpawn6b ={'p', 'w', 1, 1, 5, 585, 465, 'b'};
	Piece wpawn7w ={'p', 'w', 1, 1, 6, 660, 465, 'w'};
	Piece wpawn8b ={'p', 'w', 1, 1, 7, 735, 465, 'b'};

	Piece bpawn1b ={'p', 'b', 1, 6, 0, 210, 95, 'b'};
	Piece bpawn2w ={'p', 'b', 1, 6, 1, 285, 95, 'w'};
	Piece bpawn3b ={'p', 'b', 1, 6, 2, 360, 95, 'b'};
	Piece bpawn4w ={'p', 'b', 1, 6, 3, 435, 95, 'w'};
	Piece bpawn5b ={'p', 'b', 1, 6, 4, 510, 95, 'b'};
	Piece bpawn6w ={'p', 'b', 1, 6, 5, 585, 95, 'w'};
	Piece bpawn7b ={'p', 'b', 1, 6, 5, 660, 95, 'b'};
	Piece bpawn8w ={'p', 'b', 1, 6, 6, 735, 95, 'w'};

	matrix[1][0] = wpawn1w;
	matrix[1][1] = wpawn2b;
	matrix[1][2] = wpawn3w;
	matrix[1][3] = wpawn4b;
	matrix[1][4] = wpawn5w;
	matrix[1][5] = wpawn6b;
	matrix[1][6] = wpawn7w;
	matrix[1][7] = wpawn8b;

	matrix[6][0] = bpawn1b;
	matrix[6][1] = bpawn2w;
	matrix[6][2] = bpawn3b;
	matrix[6][3] = bpawn4w;
	matrix[6][4] = bpawn5b;
	matrix[6][5] = bpawn6w;
	matrix[6][6] = bpawn7b;
	matrix[6][7] = bpawn8w;

	unsigned int i = 2;
	unsigned int heigth = 465;
	int bg = -1;

	for (; i < ROWS-2; i++){
		unsigned int u = 0;
		unsigned int width = 210;
		heigth -= 75;
		bg *= -1;

		for (; u < COLS; u++){

			if(bg == 1){
				Piece noPiece = {'n', 'n', 0,i,u, width, heigth, 'n'};
				matrix[i][u] = noPiece;
			}
			else{
				Piece noPiece = {'n', 'n', 0,i,u, width, heigth, 'n'};
				matrix[i][u] = noPiece;
			}
			width += 75;
			bg *= -1;
		}
	}



}

Piece getMatrixAt(int x, int y){
	if(x>=0 && x < ROWS &&
			y>=0 && y < COLS)
		return matrix[x][y];
}


int makeMove(Piece pi, Piece pf){

	printf("Vou fazer aquele Move");


}
