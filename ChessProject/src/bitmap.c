#include "bitmap.h"
#include "stdio.h"
#include "video_gr.h"
#include "utilities.h"
#include "chess.h"


//Bitmaps
static Bitmap *board;

static Bitmap *wKingw;
static Bitmap *wKingb;

static Bitmap *wQueenw;
static Bitmap *wQueenb;

static Bitmap *wRookb;
static Bitmap *wRookw;

static Bitmap *wBishopw;
static Bitmap *wBishopb;

static Bitmap *wKnightb;
static Bitmap *wKnightw;

static Bitmap *wPawnb;
static Bitmap *wPawnw;

static Bitmap *bKingb;
static Bitmap *bKingw;

static Bitmap *bQueenb;
static Bitmap *bQueenw;

static Bitmap *bRookb;
static Bitmap *bRookw;

static Bitmap *bBishopw;
static Bitmap *bBishopb;

static Bitmap *bKnightb;
static Bitmap *bKnightw;

static Bitmap *bPawnb;
static Bitmap *bPawnw;

static Bitmap *player1;
static Bitmap *player2;

static Bitmap *logo;

static Bitmap *local1;
static Bitmap *local2;

static Bitmap *serial1;
static Bitmap *serial2;

static Bitmap *exit1;
static Bitmap *exit2;



Bitmap* loadBitmap(const char* filename) {
    // allocating necessary size
    Bitmap* bmp = (Bitmap*) malloc(sizeof(Bitmap));

    // open filename in read binary mode
    FILE *filePtr;
    filePtr = fopen(filename, "rb");
    if (filePtr == NULL)
        return NULL;

    // read the bitmap file header
    BitmapFileHeader bitmapFileHeader;
    fread(&bitmapFileHeader, 2, 1, filePtr);

    // verify that this is a bmp file by check bitmap id
    if (bitmapFileHeader.type != 0x4D42) {
        fclose(filePtr);
        return NULL;
    }

    int rd;
    do {
        if ((rd = fread(&bitmapFileHeader.size, 4, 1, filePtr)) != 1)
            break;
        if ((rd = fread(&bitmapFileHeader.reserved, 4, 1, filePtr)) != 1)
            break;
        if ((rd = fread(&bitmapFileHeader.offset, 4, 1, filePtr)) != 1)
            break;
    } while (0);

    if (rd = !1) {
        fprintf(stderr, "Error reading file\n");
        exit(-1);
    }

    // read the bitmap info header
    BitmapInfoHeader bitmapInfoHeader;
    fread(&bitmapInfoHeader, sizeof(BitmapInfoHeader), 1, filePtr);

    // move file pointer to the begining of bitmap data
    fseek(filePtr, bitmapFileHeader.offset, SEEK_SET);

    // allocate enough memory for the bitmap image data
    unsigned char* bitmapImage = (unsigned char*) malloc(
            bitmapInfoHeader.imageSize);

    // verify memory allocation
    if (!bitmapImage) {
        free(bitmapImage);
        fclose(filePtr);
        return NULL;
    }

    // read in the bitmap image data
    fread(bitmapImage, bitmapInfoHeader.imageSize, 1, filePtr);

    // make sure bitmap image data was read
    if (bitmapImage == NULL) {
        fclose(filePtr);
        return NULL;
    }

    // close file and return bitmap image data
    fclose(filePtr);

    bmp->bitmapData = bitmapImage;
    bmp->bitmapInfoHeader = bitmapInfoHeader;

    return bmp;
}

void drawBitmap(char* buffer, Bitmap* bmp, int x, int y, Alignment alignment) {
    if (bmp == NULL)
        return;

    int width = bmp->bitmapInfoHeader.width;
    int drawWidth = width;
    int height = bmp->bitmapInfoHeader.height;



    if (alignment == ALIGN_CENTER)
        x -= width / 2;
    else if (alignment == ALIGN_RIGHT)
        x -= width;

    if (x + width < 0 || x > getHorResolution() || y + height < 0
            || y > getVerResolution())
        return;

    int xCorrection = 0;
    if (x < 0) {
        xCorrection = -x;
        drawWidth -= xCorrection;
        x = 0;

        if (drawWidth > getHorResolution())
            drawWidth = getHorResolution();
    } else if (x + drawWidth >= getHorResolution()) {
        drawWidth = getHorResolution() - x;
    }

    char* bufferStartPos;
    char* imgStartPos;

    int i;
    for (i = 0; i < height; i++) {

        int pos = y + height - 1 - i;

        if (pos < 0 || pos >= getVerResolution())
            continue;

        bufferStartPos = buffer;
        bufferStartPos += x * 2 + pos * getHorResolution() * 2;

        imgStartPos = bmp->bitmapData + xCorrection * 2 + i * width * 2;

        memcpy(bufferStartPos, imgStartPos, drawWidth * 2);
    }

    copy2VideoMem();
}

void deleteBitmap(Bitmap* bmp) {
    if (bmp == NULL)
        return;

    free(bmp->bitmapData);
    free(bmp);
}



int loadBitmaps(){

	board = loadBitmap("/home/lcom/ChessProject/res/board.bmp");
	if(board == NULL){
		return 1;
	}

	wKingb = loadBitmap("/home/lcom/ChessProject/res/wKingb.bmp");
	if(wKingb == NULL){
		return 1;
	}

	wKingw = loadBitmap("/home/lcom/ChessProject/res/wKingw.bmp");
	if(wKingw == NULL){
		return 1;
	}

	wQueenw = loadBitmap("/home/lcom/ChessProject/res/wQueenw.bmp");
	if(wQueenw == NULL){
		return 1;
	}

	wQueenb = loadBitmap("/home/lcom/ChessProject/res/wQueenb.bmp");
	if(wQueenb == NULL){
		return 1;
	}

	wRookb = loadBitmap("/home/lcom/ChessProject/res/wRookb.bmp");
	if(wRookb == NULL){
		return 1;
	}

	wRookw = loadBitmap("/home/lcom/ChessProject/res/wRookw.bmp");
	if(wRookw == NULL){
		return 1;
	}

	wBishopb = loadBitmap("/home/lcom/ChessProject/res/wBishopb.bmp");
	if(wBishopb == NULL){
		return 1;
	}

	wBishopw = loadBitmap("/home/lcom/ChessProject/res/wBishopw.bmp");
	if(wBishopw == NULL){
		return 1;
	}

	wKnightb = loadBitmap("/home/lcom/ChessProject/res/wKnightb.bmp");
	if(wKnightb == NULL){
		return 1;
	}

	wKnightw = loadBitmap("/home/lcom/ChessProject/res/wKnightw.bmp");
	if(wKnightw == NULL){
		return 1;
	}

	wPawnb = loadBitmap("/home/lcom/ChessProject/res/wPawnb.bmp");
	if(wPawnb == NULL){
		return 1;
	}

	wPawnw = loadBitmap("/home/lcom/ChessProject/res/wPawnw.bmp");
	if(wPawnw == NULL){
		return 1;
	}

	bKingb = loadBitmap("/home/lcom/ChessProject/res/bKingb.bmp");
	if(bKingb == NULL){
		return 1;
	}

	bKingw = loadBitmap("/home/lcom/ChessProject/res/bKingw.bmp");
	if(bKingw == NULL){
		return 1;
	}

	bQueenw = loadBitmap("/home/lcom/ChessProject/res/bQueenw.bmp");
	if(bQueenw == NULL){
		return 1;
	}

	bQueenb = loadBitmap("/home/lcom/ChessProject/res/bQueenb.bmp");
	if(bQueenb == NULL){
		return 1;
	}


	bKnightb = loadBitmap("/home/lcom/ChessProject/res/bKnightb.bmp");
	if(bKnightb == NULL){
		return 1;
	}

	bKnightw = loadBitmap("/home/lcom/ChessProject/res/bKnightw.bmp");
	if(bKnightw == NULL){
		return 1;
	}

	bRookw = loadBitmap("/home/lcom/ChessProject/res/bRookw.bmp");
	if(bRookw == NULL){
		return 1;
	}

	bRookb = loadBitmap("/home/lcom/ChessProject/res/bRookb.bmp");
	if(bRookb == NULL){
		return 1;
	}

	bBishopb = loadBitmap("/home/lcom/ChessProject/res/bBishopb.bmp");
	if(bBishopb == NULL){
		return 1;
	}

	bBishopw = loadBitmap("/home/lcom/ChessProject/res/bBishopw.bmp");
	if(bBishopw == NULL){
		return 1;
	}

	bPawnb = loadBitmap("/home/lcom/ChessProject/res/bPawnb.bmp");
	if(bPawnb == NULL){
		return 1;
	}

	bPawnw = loadBitmap("/home/lcom/ChessProject/res/bPawnw.bmp");
	if(bPawnw == NULL){
		return 1;
	}

	logo = loadBitmap("/home/lcom/ChessProject/res/logo.bmp");
	if(logo == NULL){
		return 1;
	}

	local1 = loadBitmap("/home/lcom/ChessProject/res/local1.bmp");
	if(local1 == NULL){
		return 1;
	}

	serial1 = loadBitmap("/home/lcom/ChessProject/res/serial1.bmp");
	if(serial1 == NULL){
		return 1;
	}

	exit1 = loadBitmap("/home/lcom/ChessProject/res/exit1.bmp");
	if(exit1 == NULL){
		return 1;
	}

	local2 = loadBitmap("/home/lcom/ChessProject/res/local2.bmp");
	if(local2 == NULL){
		return 1;
	}

	serial2 = loadBitmap("/home/lcom/ChessProject/res/serial2.bmp");
	if(serial2 == NULL){
		return 1;
	}

	exit2 = loadBitmap("/home/lcom/ChessProject/res/exit2.bmp");
	if(exit2 == NULL){
		return 1;
	}

	player1 = loadBitmap("/home/lcom/ChessProject/res/player1.bmp");
	if(player1 == NULL){
		return 1;
	}

	player2 = loadBitmap("/home/lcom/ChessProject/res/player2.bmp");
	if(player2 == NULL){
		return 1;
	}


	return 0;
}


void drawMenu(unsigned local, unsigned serial, unsigned exit){

	call_drawBitmap(logo,XFONT,LOGO,ALIGN_CENTER);
	if(local==1)
		call_drawBitmap(local1, XFONT, YLOCAL, ALIGN_CENTER);
	if(serial==1)
		call_drawBitmap(serial1, XFONT, YSERIAL, ALIGN_CENTER);
	if(exit==1)
		call_drawBitmap(exit1, XFONT, YEXIT, ALIGN_CENTER);
	if(local==2)
		call_drawBitmap(local2, XFONT, YLOCAL, ALIGN_CENTER);
	if(serial==2)
		call_drawBitmap(serial2, XFONT, YSERIAL, ALIGN_CENTER);
	if(exit==2)
		call_drawBitmap(exit2, XFONT, YEXIT, ALIGN_CENTER);

}


void drawBoard(){

	fill_screen(0);
	call_drawBitmap(board,800,0,ALIGN_RIGHT);
	call_drawBitmap(logo,20,10,ALIGN_LEFT);
	call_drawBitmap(player1, 10, 230, ALIGN_LEFT);
	call_drawBitmap(player2, 10, 430, ALIGN_LEFT);



	unsigned int i = 0;
	for(; i < ROWS ; i++){
		unsigned int u = 0;
		for (; u < COLS ; u++){
			Piece P = getMatrixAt(i,u);
			if(P.name == 'R'){
				if(P.color == 'w'){
					if(P.bg == 'b'){
						call_drawBitmap(wRookb, P.xpos, P.ypos, ALIGN_LEFT);
					}
					else{
						call_drawBitmap(wRookw, P.xpos, P.ypos, ALIGN_LEFT);
					}
				}
				else{
					if(P.bg == 'b'){
						call_drawBitmap(bRookb, P.xpos, P.ypos, ALIGN_LEFT);
					}
					else{
						call_drawBitmap(bRookw, P.xpos, P.ypos, ALIGN_LEFT);
					}
				}
			}
			else if(P.name == 'N'){
				if(P.color == 'w'){
					if(P.bg == 'b'){
						call_drawBitmap(wKnightb, P.xpos, P.ypos, ALIGN_LEFT);
					}
					else{
						call_drawBitmap(wKnightw, P.xpos, P.ypos, ALIGN_LEFT);
					}
				}
				else{
					if(P.bg == 'b'){
						call_drawBitmap(bKnightb, P.xpos, P.ypos, ALIGN_LEFT);
					}
					else{
						call_drawBitmap(bKnightw, P.xpos, P.ypos, ALIGN_LEFT);
					}
				}
			}
			else if(P.name == 'B'){
				if(P.color == 'w'){
					if(P.bg == 'b'){
						call_drawBitmap(wBishopb, P.xpos, P.ypos, ALIGN_LEFT);
					}
					else{
						call_drawBitmap(wBishopw, P.xpos, P.ypos, ALIGN_LEFT);
					}
				}
				else{
					if(P.bg == 'b'){
						call_drawBitmap(bBishopb, P.xpos, P.ypos, ALIGN_LEFT);
					}
					else{
						call_drawBitmap(bBishopw, P.xpos, P.ypos, ALIGN_LEFT);
					}
				}
			}
			else if(P.name == 'K'){
				if(P.color == 'w'){
					if(P.bg == 'b'){
						call_drawBitmap(wKingb, P.xpos, P.ypos, ALIGN_LEFT);
					}
					else{
						call_drawBitmap(wKingw, P.xpos, P.ypos, ALIGN_LEFT);
					}
				}
				else{
					if(P.bg == 'b'){
						call_drawBitmap(bKingb, P.xpos, P.ypos, ALIGN_LEFT);
					}
					else{
						call_drawBitmap(bKingw, P.xpos, P.ypos, ALIGN_LEFT);
					}
				}
			}

			else if(P.name == 'Q'){
				if(P.color == 'w'){
					if(P.bg == 'b'){
						call_drawBitmap(wQueenb, P.xpos, P.ypos, ALIGN_LEFT);
					}
					else{
						call_drawBitmap(wQueenw, P.xpos, P.ypos, ALIGN_LEFT);
					}
				}
				else{
					if(P.bg == 'b'){
						call_drawBitmap(bQueenb, P.xpos, P.ypos, ALIGN_LEFT);
					}
					else{
						call_drawBitmap(bQueenw, P.xpos, P.ypos, ALIGN_LEFT);
					}
				}
			}
			else if(P.name == 'p'){
				if(P.color == 'w'){
					if(P.bg == 'b'){
						call_drawBitmap(wPawnb, P.xpos, P.ypos, ALIGN_LEFT);
					}
					else{
						call_drawBitmap(wPawnw, P.xpos, P.ypos, ALIGN_LEFT);
					}
				}
				else{
					if(P.bg == 'b'){
						call_drawBitmap(bPawnb, P.xpos, P.ypos, ALIGN_LEFT);
					}
					else{
						call_drawBitmap(bPawnw, P.xpos, P.ypos, ALIGN_LEFT);
					}
				}
			}
		}
	}
}
