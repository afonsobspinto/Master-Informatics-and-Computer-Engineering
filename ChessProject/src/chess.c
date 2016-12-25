#include "chess.h"
#include "utilities.h"


void fillBoard(){

	Piece wrookb ={'R','w',1,210,535, 'b'};
	Piece wrookw ={'R','w',1,735,535, 'w'};
	Piece brookb ={'R','b',1,735,15, 'b'};
	Piece brookw ={'R','b',1,210,15, 'w'};

	Piece wknightb ={'N','w',1,660,535, 'b'};
	Piece wknightw ={'N','w',1,285,535, 'w'};
	Piece bknightb ={'N','b',1,285,15, 'b'};
	Piece bknightw ={'N','b',1,660,15, 'w'};

	Piece wbishopb ={'B','w',1,360,535, 'b'};
	Piece wbishopw ={'B','w',1,585,535, 'w'};
	Piece bbishopb ={'B','b',1,585,15, 'b'};
	Piece bbishopw ={'B','b',1,360,15, 'w'};

	Piece wkingb ={'K','w',1,510,535, 'b'};
	Piece bkingw ={'K','b',1,510,15, 'w'};

	Piece wqueenw ={'Q','w',1,435,535, 'w'};
	Piece bqueenb ={'Q','b',1,435,15, 'b'};

	Piece wpawn1w ={'p', 'w', 1, 210, 465, 'w'};
	Piece wpawn2b ={'p', 'w', 1, 285, 465, 'b'};
	Piece wpawn3w ={'p', 'w', 1, 360, 465, 'w'};
	Piece wpawn4b ={'p', 'w', 1, 435, 465, 'b'};
	Piece wpawn5w ={'p', 'w', 1, 510, 465, 'w'};
	Piece wpawn6b ={'p', 'w', 1, 585, 465, 'b'};
	Piece wpawn7w ={'p', 'w', 1, 660, 465, 'w'};
	Piece wpawn8b ={'p', 'w', 1, 735, 465, 'b'};

	Piece bpawn1b ={'p', 'b', 1, 210, 95, 'b'};
	Piece bpawn2w ={'p', 'b', 1, 285, 95, 'w'};
	Piece bpawn3b ={'p', 'b', 1, 360, 95, 'b'};
	Piece bpawn4w ={'p', 'b', 1, 435, 95, 'w'};
	Piece bpawn5b ={'p', 'b', 1, 510, 95, 'b'};
	Piece bpawn6w ={'p', 'b', 1, 585, 95, 'w'};
	Piece bpawn7b ={'p', 'b', 1, 660, 95, 'b'};
	Piece bpawn8w ={'p', 'b', 1, 735, 95, 'w'};

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
				Piece noPiece = {'K', 'w', 0, width, heigth, 'b'};
				matrix[i][u] = noPiece;
			}
			else{
				Piece noPiece = {'Q', 'w', 0, width, heigth, 'w'};
				matrix[i][u] = noPiece;
			}
			width += 75;
			bg *= -1;
		}
	}


	matrix[0][0] = wrookb;
	matrix[0][7] = wrookw;
	matrix[7][7] = brookb;
	matrix[7][0] = brookw;

	matrix[0][6] = wknightb;
	matrix[0][1] = wknightw;
	matrix[7][1] = bknightb;
	matrix[7][6] = bknightw;

	matrix[0][2] = wbishopb;
	matrix[0][5] = wbishopw;
	matrix[7][5] = bbishopb;
	matrix[7][2] = bbishopw;

	matrix[7][4] = bkingw;
	matrix[0][4] = wkingb;

	matrix[7][3] = bqueenb;
	matrix[0][3] = wqueenw;

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


}

Piece getMatrixAt(int x, int y){
	if(x>=0 && x < ROWS &&
			y>=0 && y < COLS)
		return matrix[x][y];
}
