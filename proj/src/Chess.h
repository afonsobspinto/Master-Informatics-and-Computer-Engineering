#include <iostream>
using namespace std;

struct Piece
{
	//Name of the piece (R, N, B, K , Q, p)
	char name;

	//Color of the piece (b, w)
	char color;

    //If the piece is eaten or not value (t, f)
	char state;

};

struct Position
{
	int x;
	int y;
};

const Piece Rook   = {'R'};
const Piece Knight = {'N'};
const Piece Bishop = {'B'};
const Piece King   = {'K'};
const Piece Queen  = {'Q'};
const Piece Pawn   = {'p'};

void drawBoard(Piece pieces[][8]);

void updateBoard();

int isValidMove(Piece piece, Position pi, Position pf);

int isCheckMate();

int isCheck();

int clearBoard();

inline void drawBoard(Piece pieces[][8]) {
}

inline void updateBoard() {
}

inline int isValidMove(Piece piece, Position pi, Position pf) {
}

inline int isCheckMate() {
}

inline int isCheck() {
}

inline int clearBoard() {
}
