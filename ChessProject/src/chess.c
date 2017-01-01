#include "chess.h"
#include "utilities.h"
#include "mouse.h"
#include "game.h"

//GameFlags

static int wKingMove = 0;
static int wRook1Move = 0;
static int wRook2Move = 0;
static int bKingMove = 0;
static int bRook1Move = 0;
static int bRook2Move = 0;

static int wEnPassant = -1;
static int bEnPassant = -1;



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
	Piece wknightw ={'N','w',1,0,1,280,535, 'w'};
	Piece bknightb ={'N','b',1,7,1,280,15, 'b'};
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

	Piece bpawn1b ={'p', 'b', 1, 6, 0, 210, 90, 'b'};
	Piece bpawn2w ={'p', 'b', 1, 6, 1, 285, 90, 'w'};
	Piece bpawn3b ={'p', 'b', 1, 6, 2, 360, 90, 'b'};
	Piece bpawn4w ={'p', 'b', 1, 6, 3, 435, 90, 'w'};
	Piece bpawn5b ={'p', 'b', 1, 6, 4, 510, 90, 'b'};
	Piece bpawn6w ={'p', 'b', 1, 6, 5, 585, 90, 'w'};
	Piece bpawn7b ={'p', 'b', 1, 6, 6, 660, 90, 'b'};
	Piece bpawn8w ={'p', 'b', 1, 6, 7, 735, 90, 'w'};

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
				Piece noPiece = {'n', 'n', 0,i,u, width, heigth, 'b'};
				matrix[i][u] = noPiece;
			}
			else{
				Piece noPiece = {'n', 'n', 0,i,u, width, heigth, 'w'};
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

void reset_flags(){
	wKingMove = 0;
	wRook1Move = 0;
	wRook2Move = 0;
	bKingMove = 0;
	bRook1Move = 0;
	bRook2Move = 0;
	wEnPassant = -1;
	bEnPassant = -1;
}

int unmakeMove(Piece p1, Piece p2){


	MOVE_STATE *moveState = getMoveState();


	if(*moveState == NOMOVE)
		return 0;

	if(*moveState==CASTLING){

		//Unmaking Move

		if(p1.name == 'K' && p1.color == 'w' && p2.bg=='w'){ //White Short Castling

			Piece noPiece1 = {'n', 'n', 0,0,5, 585, 535, 'w'};
			Piece noPiece2 = {'n', 'n', 0,0,6, 660, 535, 'b'};
			matrix[0][5]= noPiece1;
			matrix[0][6]= noPiece2;
		}
		else if(p1.name == 'K' && p1.color == 'w' && p2.bg=='b'){ //White Long Castling

			Piece noPiece1 = {'n', 'n', 0,0,1, 280, 535, 'w'};
			Piece noPiece2 = {'n', 'n', 0,0,2, 360, 535, 'b'};
			Piece noPiece3 = {'n', 'n', 0,0,3, 435, 535, 'w'};
			matrix[0][1]= noPiece1;
			matrix[0][2]= noPiece2;
			matrix[0][3]= noPiece3;
		}
		else if(p1.name == 'K' && p1.color == 'b' && p2.bg=='b'){ //Black Short Castling

			Piece noPiece1 = {'n', 'n', 0,7,5, 585, 15, 'b'};
			Piece noPiece2 = {'n', 'n', 0,7,6, 660, 15, 'w'};
			matrix[7][5]= noPiece1;
			matrix[7][6]= noPiece2;
		}

		else if(p1.name == 'K' && p1.color == 'b' && p2.bg=='w'){ //Black Long Castling

			Piece noPiece1 = {'n', 'n', 0,7,1, 280, 15, 'b'};
			Piece noPiece2 = {'n', 'n', 0,7,2, 360, 15, 'w'};
			Piece noPiece3 = {'n', 'n', 0,7,3, 435, 15, 'b'};
			matrix[7][1]= noPiece1;
			matrix[7][2]= noPiece2;
			matrix[7][3]= noPiece3;
		}
	}
	else if(*moveState == ENPASSANT){


		if(p1.color=='w'){
			if(p1.bg == 'w'){
				Piece piece = {'p', 'b', 1,p1.i,p2.j, p2.xpos, p1.ypos, 'b'};
				matrix[piece.i][piece.j]=piece;
			}
			else{
				Piece piece = {'p', 'b', 1,p1.i,p2.j, p2.xpos, p1.ypos, 'w'};
				matrix[piece.i][piece.j]=piece;
			}


		}

		else if(p1.color=='b'){

			if(p1.bg == 'w'){
				Piece piece = {'p', 'w', 1,p1.i,p2.j, p2.xpos, p1.ypos, 'b'};
				matrix[piece.i][piece.j]=piece;
			}
			else{
				Piece piece = {'p', 'w', 1,p1.i,p2.j, p2.xpos, p1.ypos, 'w'};
				matrix[piece.i][piece.j]=piece;
			}
		}
	}

	matrix[p1.i][p1.j]=p1;
	matrix[p2.i][p2.j]=p2;
	*moveState = NOMOVE;

	// Update Castling flags
	if(p1.name == 'K' && p1.color == 'w')
		decrement(&wKingMove);

	else if(p1.name == 'R' && p1.color == 'w' && p1.i == 0 && p1.j == 7)
		decrement(&wRook1Move);

	else if(p1.name == 'R' && p1.color == 'w' && p1.i == 0 && p1.j == 0)
		decrement(&wRook2Move);

	else if(p1.name == 'K' && p1.color == 'b')
		decrement(&bKingMove);

	else if(p1.name == 'R' && p1.color == 'b' && p1.i == 7 && p1.j == 7)
		decrement(&bRook1Move);

	else if(p1.name == 'R' && p1.color == 'b' && p1.i == 7 && p1.j == 0)
		decrement(&bRook2Move);

	drawBoard();

	return 1;

}

int makeMove(Piece p1, Piece p2){


	printf("Vou fazer o Movimento \n");

	int valid = isValidMove(p1,p2);
	int res = 0;

	if(valid == 0){
		printf("Nao é Valido! Vou sair \n");
		return 0;
	}

	else
		printf("É válido\n");


	if(valid==1){

		//Normal and Attack

		Piece NewPiece;

		NewPiece.name = p1.name;
		NewPiece.color = p1.color;
		NewPiece.state = p1.state;
		NewPiece.i = p2.i;
		NewPiece.j = p2.j;
		NewPiece.xpos = p2.xpos;
		NewPiece.ypos = p2.ypos;
		NewPiece.bg = p2.bg;

		matrix[NewPiece.i][NewPiece.j]=NewPiece;

		Piece noPiece = {'n', 'n', 0,p1.i,p1.j, p1.xpos, p1.ypos, p1.bg};

		matrix[p1.i][p1.j]= noPiece;


		//Updating Flags
		wEnPassant = -1;
		bEnPassant = -1;

		if(p1.name == 'K' && p1.color == 'w')
			increment(&wKingMove);

		else if(p1.name == 'R' && p1.color == 'w' && p1.i == 0 && p1.j == 7)
			increment(&wRook1Move);

		else if(p1.name == 'R' && p1.color == 'w' && p1.i == 0 && p1.j == 0)
			increment(&wRook2Move);

		else if(p1.name == 'K' && p1.color == 'b')
			increment(&bKingMove);

		else if(p1.name == 'R' && p1.color == 'b' && p1.i == 7 && p1.j == 7)
			increment(&bRook1Move);

		else if(p1.name == 'R' && p1.color == 'b' && p1.i == 7 && p1.j == 0)
			increment(&bRook2Move);

		else if(p1.name == 'p' && p1.color == 'w' && p1.i ==1 && p2.i ==3 && p2.j == p1.j)
			wEnPassant = p1.j;

		else if(p1.name == 'p' && p1.color == 'b' && p1.i ==6 && p2.i ==4 && p2.j == p1.j)
			bEnPassant = p1.j;

		res = 1;
	}

	// Castling White
	else if (valid == WHITE_SHORT_CASTLING){
		Piece NewPiece1;
		Piece NewPiece2;
		increment(&wKingMove);

		NewPiece1.name = 'K';
		NewPiece1.color = 'w';
		NewPiece1.state = 1;
		NewPiece1.i = 0;
		NewPiece1.j = 6;
		NewPiece1.xpos = 660;
		NewPiece1.ypos = 535;
		NewPiece1.bg = 'b';



		NewPiece2.name = 'R';
		NewPiece2.color = 'w';
		NewPiece2.state = 1;
		NewPiece2.i = 0;
		NewPiece2.j = 5;
		NewPiece2.xpos = 585;
		NewPiece2.ypos = 535;
		NewPiece2.bg = 'w';

		matrix[NewPiece1.i][NewPiece1.j]=NewPiece1;
		matrix[NewPiece2.i][NewPiece2.j]=NewPiece2;

		Piece noPiece1 = {'n', 'n', 0,p1.i,p1.j, p1.xpos, p1.ypos, p1.bg};
		Piece noPiece2 = {'n', 'n', 0,p2.i,p2.j, p2.xpos, p2.ypos, p2.bg};
		matrix[p1.i][p1.j]= noPiece1;
		matrix[p2.i][p2.j]= noPiece2;

		res = WHITE_SHORT_CASTLING;
	}

	else if (valid == WHITE_LONG_CASTLING){
		Piece NewPiece1;
		Piece NewPiece2;
		increment(&wKingMove);

		NewPiece1.name = 'K';
		NewPiece1.color = 'w';
		NewPiece1.state = 1;
		NewPiece1.i = 0;
		NewPiece1.j = 2;
		NewPiece1.xpos = 360;
		NewPiece1.ypos = 535;
		NewPiece1.bg = 'b';



		NewPiece2.name = 'R';
		NewPiece2.color = 'w';
		NewPiece2.state = 1;
		NewPiece2.i = 0;
		NewPiece2.j = 3;
		NewPiece2.xpos = 435;
		NewPiece2.ypos = 535;
		NewPiece2.bg = 'w';

		matrix[NewPiece1.i][NewPiece1.j]=NewPiece1;
		matrix[NewPiece2.i][NewPiece2.j]=NewPiece2;

		Piece noPiece1 = {'n', 'n', 0,p1.i,p1.j, p1.xpos, p1.ypos, p1.bg};
		Piece noPiece2 = {'n', 'n', 0,p2.i,p2.j, p2.xpos, p2.ypos, p2.bg};
		matrix[p1.i][p1.j]= noPiece1;
		matrix[p2.i][p2.j]= noPiece2;


		res = WHITE_LONG_CASTLING;
	}

	else if (valid == BLACK_SHORT_CASTLING){
			Piece NewPiece1;
			Piece NewPiece2;
			increment(&bKingMove);

			NewPiece1.name = 'K';
			NewPiece1.color = 'b';
			NewPiece1.state = 1;
			NewPiece1.i = 7;
			NewPiece1.j = 6;
			NewPiece1.xpos = 660;
			NewPiece1.ypos = 15;
			NewPiece1.bg = 'w';


			NewPiece2.name = 'R';
			NewPiece2.color = 'b';
			NewPiece2.state = 1;
			NewPiece2.i = 7;
			NewPiece2.j = 5;
			NewPiece2.xpos = 585;
			NewPiece2.ypos = 15;
			NewPiece2.bg = 'b';

			matrix[NewPiece1.i][NewPiece1.j]=NewPiece1;
			matrix[NewPiece2.i][NewPiece2.j]=NewPiece2;

			Piece noPiece1 = {'n', 'n', 0,p1.i,p1.j, p1.xpos, p1.ypos, p1.bg};
			Piece noPiece2 = {'n', 'n', 0,p2.i,p2.j, p2.xpos, p2.ypos, p2.bg};
			matrix[p1.i][p1.j]= noPiece1;
			matrix[p2.i][p2.j]= noPiece2;


			res = BLACK_SHORT_CASTLING;
		}

	else if (valid == BLACK_LONG_CASTLING){
			Piece NewPiece1;
			Piece NewPiece2;
			increment(&bKingMove);

			NewPiece1.name = 'K';
			NewPiece1.color = 'b';
			NewPiece1.state = 1;
			NewPiece1.i = 7;
			NewPiece1.j = 2;
			NewPiece1.xpos = 360;
			NewPiece1.ypos = 15;
			NewPiece1.bg = 'w';

			NewPiece2.name = 'R';
			NewPiece2.color = 'b';
			NewPiece2.state = 1;
			NewPiece2.i = 7;
			NewPiece2.j = 3;
			NewPiece2.xpos = 435;
			NewPiece2.ypos = 15;
			NewPiece2.bg = 'b';

			matrix[NewPiece1.i][NewPiece1.j]=NewPiece1;
			matrix[NewPiece2.i][NewPiece2.j]=NewPiece2;

			Piece noPiece1 = {'n', 'n', 0,p1.i,p1.j, p1.xpos, p1.ypos, p1.bg};
			Piece noPiece2 = {'n', 'n', 0,p2.i,p2.j, p2.xpos, p2.ypos, p2.bg};
			matrix[p1.i][p1.j]= noPiece1;
			matrix[p2.i][p2.j]= noPiece2;

			res = BLACK_LONG_CASTLING;
		}

	else if (valid == MATE){
		return MATE;
	}

	else if (valid == PROMOTION){
		Piece NewPiece;

		NewPiece.name = 'Q';
		NewPiece.color = p1.color;
		NewPiece.state = p1.state;
		NewPiece.i = p2.i;
		NewPiece.j = p2.j;
		NewPiece.xpos = p2.xpos;
		NewPiece.ypos = p2.ypos;
		NewPiece.bg = p2.bg;

		matrix[NewPiece.i][NewPiece.j]=NewPiece;

		Piece noPiece = {'n', 'n', 0,p1.i,p1.j, p1.xpos, p1.ypos, p1.bg};

		matrix[p1.i][p1.j]= noPiece;

		res = PROMOTION;
	}

	else if (valid == W_EN_PASSANT){
		Piece NewPiece;

		NewPiece.name = 'p';
		NewPiece.color = p1.color;
		NewPiece.state = p1.state;
		NewPiece.i = p2.i;
		NewPiece.j = p2.j;
		NewPiece.xpos = p2.xpos;
		NewPiece.ypos = p2.ypos;
		NewPiece.bg = p2.bg;

		matrix[NewPiece.i][NewPiece.j]=NewPiece;

		Piece noPiece1 = {'n', 'n', 0,p1.i,p1.j, p1.xpos, p1.ypos, p1.bg};

		matrix[p1.i][p1.j]= noPiece1;

		Piece noPiece2 = {'n', 'n', 0, p1.i ,p2.j, p2.xpos, p1.ypos, p2.bg};

		matrix[p1.i][p2.j]= noPiece2;

		res = W_EN_PASSANT;
	}

	else if (valid == B_EN_PASSANT){
		Piece NewPiece;

		NewPiece.name = 'p';
		NewPiece.color = p1.color;
		NewPiece.state = p1.state;
		NewPiece.i = p2.i;
		NewPiece.j = p2.j;
		NewPiece.xpos = p2.xpos;
		NewPiece.ypos = p2.ypos;
		NewPiece.bg = p2.bg;

		matrix[NewPiece.i][NewPiece.j]=NewPiece;

		Piece noPiece1 = {'n', 'n', 0,p1.i,p1.j, p1.xpos, p1.ypos, p1.bg};

		matrix[p1.i][p1.j]= noPiece1;

		Piece noPiece2 = {'n', 'n', 0, p1.i ,p2.j, p2.xpos, p1.ypos, p2.bg};

		matrix[p1.i][p2.j]= noPiece2;

		res = B_EN_PASSANT;
	}


	if(isCheck(p1,p2)){
		printf("Estou em Check! Vou desfazer o Movimento \n");
		unmakeMove(p1,p2);
		res = 0;
	}
	else
		drawBoard();

	return res ;
}

int isValidMove(Piece p1, Piece p2){

	printf("Vou verificar se o Movimento é valido \n");

	char peca = p1.name;

	switch(peca){
	case 'K':
	{
		//Castling
		if(p2.name =='R'){
			//White
			if(p1.color == 'w' && p2.color == 'w' && wKingMove==0){
				//Short
				if(p2.i == 0 && p2.j == 7 && wRook1Move == 0){
					if(matrix[0][6].state == 0 && matrix[0][5].state == 0)
						return WHITE_SHORT_CASTLING;
				}
				//Long
				if(p2.i==0 && p2.j == 0 && wRook2Move == 0){
					if(matrix[0][1].state == 0 &&
							matrix[0][2].state == 0 &&
							matrix[0][3].state == 0)
						return WHITE_LONG_CASTLING;
				}
			}
			else if(p1.color == 'b' && p2.color == 'b' && bKingMove == 0){
				//Short
				if(p2.i == 7 && p2.j == 7 && bRook1Move == 0){
					if(matrix[7][6].state == 0 && matrix[7][5].state == 0)
						return BLACK_SHORT_CASTLING;
				}

				//Long
				if(p2.i==7 && p2.j == 0 && bRook2Move == 0){
					if(matrix[7][1].state == 0 &&
							matrix[7][2].state == 0 &&
							matrix[7][3].state == 0)
						return BLACK_LONG_CASTLING;
				}
			}
		}
		if(    (((p1.i == p2.i+1) && (p1.j == p2.j+1)) ||
				((p1.i == p2.i+1) && (p1.j == p2.j-1)) ||
				((p1.i == p2.i+1) && (p1.j == p2.j)) ||
				((p1.i == p2.i-1) && (p1.j == p2.j+1)) ||
				((p1.i == p2.i-1) && (p1.j == p2.j-1)) ||
				((p1.i == p2.i-1) && (p1.j == p2.j)) ||
				((p1.i == p2.i) && (p1.j == p2.j+1)) ||
				((p1.i == p2.i) && (p1.j == p2.j-1))) && (p1.color != p2.color))
			return 1;
		else
			return 0;
	}

	case 'Q':
	{
		unsigned int counter = 0;
		unsigned int aux;
		unsigned int k;
		if (p1.color != p2.color){
			if ((p1.i == p2.i) || (p1.j == p2.j)){
				// Same Line
				if (p1.i == p2.i){
					// p1 is left of p2
					if (p1.j < p2.j){
						if ((p2.j - p1.j) == 1)
							return 1;
						aux = p2.j - p1.j;
						for(k = 1; k<aux; k++){
							if (matrix[p1.i][p1.j+k].state==0)
								counter++;
							else
								return 0;
						}
						if (counter = aux-1)
							return 1;
						else
							return 0;
					}
					//p1 is right of p2
					else if (p1.j > p2.j){
						if ((p1.j - p2.j) == 1)
							return 1;
						aux = p1.j - p2.j;
						for(k = 1; k<aux; k++){
							if (matrix[p1.i][p1.j-k].state==0)
								counter++;
							else
								return 0;
						}
						if (counter = aux-1)
							return 1;
						else
							return 0;
					}
					else
						return 0;
				}
				// Same Column
				else if (p1.j == p2.j){
					// p1 is below of p2
					if (p1.i < p2.i){
						if ((p2.i - p1.i) == 1)
							return 1;
						aux = p2.i - p1.i;
						for(k = 1; k<aux; k++){
							if (matrix[p1.i+k][p1.j].state==0)
								counter++;
							else
								return 0;
						}
						if (counter = aux-1)
							return 1;
						else
							return 0;
					}
					//p1 is above of p2
					if (p1.i > p2.i){
						if ((p1.i - p2.i) == 1)
							return 1;
						aux = p1.i - p2.i;
						for(k = 1; k<aux; k++){
							if (matrix[p1.i-k][p1.j].state==0)
								counter++;
							else
								return 0;
						}
						if (counter = aux-1)
							return 1;
						else
							return 0;
					}
				}
				else
					return 0;
			}
			else{
				// Upper Left Diagonal
				if ((p1.i < p2.i) && (p1.j > p2.j)){
					aux = p1.j - p2.j;
					if (((p2.i - p1.i) == 1) && ((p1.j - p2.j) == 1)){
						return 1;
					}
					for (k = 1; k<aux; k++){
						if (matrix[p1.i+k][p1.j-k].state == 0)
							counter++;
						else
							return 0;
					}
					if (counter = aux-1)
						return 1;
					else
						return 0;
				}
				// Upper Right Diagonal
				if ((p1.i < p2.i) && (p2.j > p1.j)){
					aux = p2.j - p1.j;
					if (((p2.i - p1.i) == 1) && ((p2.j - p1.j) == 1)){
						return 1;
					}
					for (k = 1; k<aux; k++){
						if (matrix[p1.i+k][p1.j+k].state == 0)
							counter++;
						else
							return 0;
					}
					if (counter = aux-1)
						return 1;
					else
						return 0;
				}
				// Lower Left Diagonal
				if ((p2.i < p1.i) && (p1.j > p2.j)){
					aux = p1.j - p2.j;
					if (((p1.i - p2.i) == 1) && ((p1.j - p2.j) == 1)){
						return 1;
					}
					for (k = 1; k<aux; k++){
						if (matrix[p1.i-k][p1.j-k].state == 0)
							counter++;
						else
							return 0;
					}
					if (counter = aux-1)
						return 1;
					else
						return 0;
				}
				// Lower Right Diagonal
				if ((p2.i < p1.i) && (p2.j > p1.j)){
					aux = p2.j - p1.j;
					if (((p1.i - p2.i) == 1) && ((p2.j - p1.j) == 1)){
						return 1;
					}
					for (k = 1; k<aux; k++){
						if (matrix[p1.i-k][p1.j+k].state == 0)
							counter++;
						else
							return 0;
					}
					if (counter = aux-1)
						return 1;
					else
						return 0;
				}
				else
					return 0;
			}
		}
		else
			return 0;
	}
	case 'B':
	{
		unsigned int counter = 0;
		unsigned int aux;
		unsigned int k;
		if (p1.color != p2.color){
			// Upper Left Diagonal
			if ((p1.i < p2.i) && (p1.j > p2.j)){
				aux = p1.j - p2.j;
				if (((p2.i - p1.i) == 1) && ((p1.j - p2.j) == 1)){
					return 1;
				}
				for (k = 1; k<aux; k++){
					if (matrix[p1.i+k][p1.j-k].state == 0)
						counter++;
					else
						return 0;
				}
				if (counter = aux-1)
					return 1;
				else
					return 0;
			}
			// Upper Right Diagonal
			if ((p1.i < p2.i) && (p2.j > p1.j)){
				aux = p2.j - p1.j;
				if (((p2.i - p1.i) == 1) && ((p2.j - p1.j) == 1)){
					return 1;
				}
				for (k = 1; k<aux; k++){
					if (matrix[p1.i+k][p1.j+k].state == 0)
						counter++;
					else
						return 0;
				}
				if (counter = aux-1)
					return 1;
				else
					return 0;
			}
			// Lower Left Diagonal
			if ((p2.i < p1.i) && (p1.j > p2.j)){
				aux = p1.j - p2.j;
				if (((p1.i - p2.i) == 1) && ((p1.j - p2.j) == 1)){
					return 1;
				}
				for (k = 1; k<aux; k++){
					if (matrix[p1.i-k][p1.j-k].state == 0)
						counter++;
					else
						return 0;
				}
				if (counter = aux-1)
					return 1;
				else
					return 0;
			}
			// Lower Right Diagonal
			if ((p2.i < p1.i) && (p2.j > p1.j)){
				aux = p2.j - p1.j;
				if (((p1.i - p2.i) == 1) && ((p2.j - p1.j) == 1)){
					return 1;
				}
				for (k = 1; k<aux; k++){
					if (matrix[p1.i-k][p1.j+k].state == 0)
						counter++;
					else
						return 0;
				}
				if (counter = aux-1)
					return 1;
				else
					return 0;
			}
			else
				return 0;
		}
		else
			return 0;
	}
	case 'N':
	{
		if ((((p1.i == p2.i-2) && (p1.j == p2.j-1)) ||
				((p1.i == p2.i-1) && (p1.j == p2.j-2)) ||
				((p1.i == p2.i+2) && (p1.j == p2.j-1)) ||
				((p1.i == p2.i+1) && (p1.j == p2.j-2)) ||
				((p1.i == p2.i-2) && (p1.j == p2.j+1)) ||
				((p1.i == p2.i-1) && (p1.j == p2.j+2)) ||
				((p1.i == p2.i+2) && (p1.j == p2.j+1)) ||
				((p1.i == p2.i+1) && (p1.j == p2.j+2))) && (p1.color != p2.color))
			return 1;
		else
			return 0;
	}
	case 'R':
	{
		unsigned int counter = 0;
		unsigned int aux;
		unsigned int k;
		if (((p1.i == p2.i) || (p1.j == p2.j)) && (p1.color != p2.color)){
			// Same Line
			if (p1.i == p2.i){
				// p1 is left of p2
				if (p1.j < p2.j){
					if ((p2.j - p1.j) == 1)
						return 1;
					aux = p2.j - p1.j;
					for(k = 1; k<aux; k++){
						if (matrix[p1.i][p1.j+k].state==0)
							counter++;
						else
							return 0;
					}
					if (counter = aux-1)
						return 1;
					else
						return 0;
				}
				//p1 is right of p2
				else if (p1.j > p2.j){
					if ((p1.j - p2.j) == 1)
						return 1;
					aux = p1.j - p2.j;
					for(k = 1; k<aux; k++){
						if (matrix[p1.i][p1.j-k].state==0)
							counter++;
						else
							return 0;
					}
					if (counter = aux-1)
						return 1;
					else
						return 0;
				}
				else
					return 0;
			}
			// Same Column
			else if (p1.j == p2.j){
				// p1 is below of p2
				if (p1.i < p2.i){
					if ((p2.i - p1.i) == 1)
						return 1;
					aux = p2.i - p1.i;
					for(k = 1; k<aux; k++){
						if (matrix[p1.i+k][p1.j].state==0)
							counter++;
						else
							return 0;
					}
					if (counter = aux-1)
						return 1;
					else
						return 0;
				}
				//p1 is above of p2
				if (p1.i > p2.i){
					if ((p1.i - p2.i) == 1)
						return 1;
					aux = p1.i - p2.i;
					for(k = 1; k<aux; k++){
						if (matrix[p1.i-k][p1.j].state==0)
							counter++;
						else
							return 0;
					}
					if (counter = aux-1)
						return 1;
					else
						return 0;
				}
			}
			else
				return 0;
		}
		else
			return 0;
	}

	case 'p':
	{
		//White
		if (p1.color == 'w'){
			// En Passant
			if ((p1.i == 4) && (p2.i == 5) && (p2.name == 'n') && (bEnPassant == p2.j) && (p1.j == p2.j+1 || p1.j == p2.j-1))
				return W_EN_PASSANT;

			// 1st line
			if (p1.i == 1){
				if ((((p1.i == p2.i-1) && (p1.j == p2.j) && p2.name=='n') || // Andar 1 casa para a frente
						((p1.i == p2.i-2) && (p1.j == p2.j) && p2.name=='n') || // Andar 2 casas para a frente
						((p1.i == p2.i-1) && (p1.j == p2.j-1) && (p2.color == 'b')) || // Matar Diagonal direita
						((p1.i == p2.i-1) && (p1.j == p2.j+1) && (p2.color == 'b'))) && // Matar Diagonal esquerda
						(p1.color != p2.color))
					return 1;
				else
					return 0;
			}
		    else if ((((p1.i == p2.i-1) && (p1.j == p2.j) && p2.name=='n') || // Frente
					((p1.i == p2.i-1) && (p1.j == p2.j-1) && (p2.color == 'b')) || // Matar Diagonal direita
					((p1.i == p2.i-1) && (p1.j == p2.j+1) && (p2.color == 'b'))) && // Matar Diagonal esquerda
					(p1.color != p2.color)){
		    	if(p2.i == 7)
		    		return PROMOTION;
		    	else
		    		return 1;
		    }
			else
				return 0;
		}
		//Black
		else if (p1.color == 'b'){
			// En Passant
			if ((p1.i == 3) && (p2.i == 2) && (p2.name == 'n') && (wEnPassant == p2.j) && (p1.j == p2.j+1 || p1.j == p2.j-1))
				return B_EN_PASSANT;
			// 1st line
			if(p1.i == 6){
				if ((((p1.i == p2.i+1) && (p1.j == p2.j) && p2.name=='n') || // Andar 1 casa para a frente
						((p1.i == p2.i+2) && (p1.j == p2.j) && p2.name=='n') || // Andar 2 casas para a frente
						((p1.i == p2.i+1) && (p1.j == p2.j-1) && (p2.color == 'w')) || // Matar Diagonal direita
						((p1.i == p2.i+1) && (p1.j == p2.j+1) && (p2.color == 'w'))) && // Matar Diagonal esquerda
						(p1.color != p2.color))
					return 1;
				else
					return 0;
			}
		    else if ((((p1.i == p2.i+1) && (p1.j == p2.j) && p2.name=='n') || // Frente
					((p1.i == p2.i+1) && (p1.j == p2.j-1) && (p2.color == 'w')) || // Matar Diagonal direita
					((p1.i == p2.i+1) && (p1.j == p2.j+1) && (p2.color == 'w'))) && // Matar Diagonal esquerda
					(p1.color != p2.color)){
		    	if(p2.i == 0)
		    		return PROMOTION;
		    	else
		    		return 1;
		    }
			else
				return 0;
		}
		else
			return 0;
	}
	//Normal

	if(p1.color != p2.color){
		return	1;
	}

	}
	return 0;

}


int isCheck(Piece p1, Piece p2){

	Piece King;
	Piece p;

	unsigned char color = p1.color;

	unsigned int i;
	unsigned int j;
	unsigned int k;
	unsigned int l;

	for(i=0; i < ROWS; i++){
		for(j=0; j < COLS; j++){

			p = getMatrixAt(i,j);
			if(p.name == 'K' && p.color==color){
				King = p;
			}
		}
	}

	for (k=0;  k< ROWS; k++){
		for(l=0; l < COLS; l++){
			p = getMatrixAt(k,l);
			if(p.color!=color && p.color!='n'){
				if(isValidMove(p,King)){
					printf("Está em Check \n");
					return 1;
				}
			}
		}
	}

	printf("Não está em Check \n");

	return 0;

}

int isPar(int x){
	if(x%2==0)
		return 1;
	else
		return 0;
}
