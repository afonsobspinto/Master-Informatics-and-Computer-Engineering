#include "bitmap.h"
#include "stdio.h"
#include "video_gr.h"
#include "utilities.h"
#include "chess.h"
#include "game.h"


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
static Bitmap *paused;

static Bitmap *local1;
static Bitmap *local2;

static Bitmap *serial1;
static Bitmap *serial2;

static Bitmap *exit1;
static Bitmap *exit2;

static Bitmap *player1wins;
static Bitmap *player2wins;

static Bitmap *zero;
static Bitmap *one;
static Bitmap *two;
static Bitmap *three;
static Bitmap *four;
static Bitmap *five;
static Bitmap *six;
static Bitmap *seven;
static Bitmap *eigth;
static Bitmap *nine;

static Bitmap *colon;
static Bitmap *bar;

static Bitmap *sunday;
static Bitmap *monday;
static Bitmap *tuesday;
static Bitmap *wednesday;
static Bitmap *thursday;
static Bitmap *friday;
static Bitmap *saturday;



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

void deleteBitmaps(){

	deleteBitmap(board);
	deleteBitmap(wKingw);
	deleteBitmap(wKingb);
	deleteBitmap(wQueenw);
	deleteBitmap(wQueenb);
	deleteBitmap(wRookb);
	deleteBitmap(wRookw);
	deleteBitmap(wBishopw);
	deleteBitmap(wBishopb);
	deleteBitmap(wKnightb);
	deleteBitmap(wKnightw);
	deleteBitmap(wPawnb);
	deleteBitmap(wPawnw);
	deleteBitmap(bKingw);
	deleteBitmap(bKingb);
	deleteBitmap(bQueenw);
	deleteBitmap(bQueenb);
	deleteBitmap(bRookb);
	deleteBitmap(bRookw);
	deleteBitmap(bBishopw);
	deleteBitmap(bBishopb);
	deleteBitmap(bKnightb);
	deleteBitmap(bKnightw);
	deleteBitmap(bPawnb);
	deleteBitmap(bPawnw);
	deleteBitmap(player1);
	deleteBitmap(player2);
	deleteBitmap(logo);
	deleteBitmap(paused);
	deleteBitmap(local1);
	deleteBitmap(local2);
	deleteBitmap(serial1);
	deleteBitmap(serial2);
	deleteBitmap(exit1);
	deleteBitmap(exit2);
	deleteBitmap(player1wins);
	deleteBitmap(player2wins);
	deleteBitmap(zero);
	deleteBitmap(one);
	deleteBitmap(two);
	deleteBitmap(three);
	deleteBitmap(four);
	deleteBitmap(five);
	deleteBitmap(six);
	deleteBitmap(seven);
	deleteBitmap(eigth);
	deleteBitmap(nine);
	deleteBitmap(colon);
	deleteBitmap(bar);
	deleteBitmap(sunday);
	deleteBitmap(monday);
	deleteBitmap(tuesday);
	deleteBitmap(wednesday);
	deleteBitmap(thursday);
	deleteBitmap(friday);
	deleteBitmap(saturday);

}

int loadBitmaps(){

	printf("0\n");
	board = loadBitmap("/home/lcom/ChessProject/res/board.bmp");
	if(board == NULL){
		printf("35\n");
		return 1;
	}

	wKingb = loadBitmap("/home/lcom/ChessProject/res/wKingb.bmp");
	if(wKingb == NULL){
		printf("34\n");
		return 1;
	}

	wKingw = loadBitmap("/home/lcom/ChessProject/res/wKingw.bmp");
	if(wKingw == NULL){
		printf("33\n");
		return 1;
	}

	wQueenw = loadBitmap("/home/lcom/ChessProject/res/wQueenw.bmp");
	if(wQueenw == NULL){
		printf("32\n");
		return 1;
	}

	wQueenb = loadBitmap("/home/lcom/ChessProject/res/wQueenb.bmp");
	if(wQueenb == NULL){
		printf("31\n");
		return 1;
	}

	wRookb = loadBitmap("/home/lcom/ChessProject/res/wRookb.bmp");
	if(wRookb == NULL){
		printf("30\n");
		return 1;
	}

	wRookw = loadBitmap("/home/lcom/ChessProject/res/wRookw.bmp");
	if(wRookw == NULL){
		printf("29\n");
		return 1;
	}

	wBishopb = loadBitmap("/home/lcom/ChessProject/res/wBishopb.bmp");
	if(wBishopb == NULL){
		printf("28\n");
		return 1;
	}

	wBishopw = loadBitmap("/home/lcom/ChessProject/res/wBishopw.bmp");
	if(wBishopw == NULL){
		printf("27\n");
		return 1;
	}

	wKnightb = loadBitmap("/home/lcom/ChessProject/res/wKnightb.bmp");
	if(wKnightb == NULL){
		printf("26\n");
		return 1;
	}

	wKnightw = loadBitmap("/home/lcom/ChessProject/res/wKnightw.bmp");
	if(wKnightw == NULL){
		printf("25\n");
		return 1;
	}

	wPawnb = loadBitmap("/home/lcom/ChessProject/res/wPawnb.bmp");
	if(wPawnb == NULL){
		printf("24\n");
		return 1;
	}

	wPawnw = loadBitmap("/home/lcom/ChessProject/res/wPawnw.bmp");
	if(wPawnw == NULL){
		printf("23\n");
		return 1;
	}

	bKingb = loadBitmap("/home/lcom/ChessProject/res/bKingb.bmp");
	if(bKingb == NULL){
		printf("22\n");
		return 1;
	}

	bKingw = loadBitmap("/home/lcom/ChessProject/res/bKingw.bmp");
	if(bKingw == NULL){
		printf("21\n");
		return 1;
	}

	bQueenw = loadBitmap("/home/lcom/ChessProject/res/bQueenw.bmp");
	if(bQueenw == NULL){
		printf("20\n");
		return 1;
	}

	bQueenb = loadBitmap("/home/lcom/ChessProject/res/bQueenb.bmp");
	if(bQueenb == NULL){
		printf("19\n");
		return 1;
	}


	bKnightb = loadBitmap("/home/lcom/ChessProject/res/bKnightb.bmp");
	if(bKnightb == NULL){
		printf("18\n");
		return 1;
	}

	bKnightw = loadBitmap("/home/lcom/ChessProject/res/bKnightw.bmp");
	if(bKnightw == NULL){
		printf("17\n");
		return 1;
	}

	bRookw = loadBitmap("/home/lcom/ChessProject/res/bRookw.bmp");
	if(bRookw == NULL){
		printf("16\n");
		return 1;
	}

	bRookb = loadBitmap("/home/lcom/ChessProject/res/bRookb.bmp");
	if(bRookb == NULL){
		printf("15\n");
		return 1;
	}

	bBishopb = loadBitmap("/home/lcom/ChessProject/res/bBishopb.bmp");
	if(bBishopb == NULL){
		printf("14\n");
		return 1;
	}

	bBishopw = loadBitmap("/home/lcom/ChessProject/res/bBishopw.bmp");
	if(bBishopw == NULL){
		printf("13\n");
		return 1;
	}

	bPawnb = loadBitmap("/home/lcom/ChessProject/res/bPawnb.bmp");
	if(bPawnb == NULL){
		printf("12\n");
		return 1;
	}

	bPawnw = loadBitmap("/home/lcom/ChessProject/res/bPawnw.bmp");
	if(bPawnw == NULL){
		printf("11\n");
		return 1;
	}

	logo = loadBitmap("/home/lcom/ChessProject/res/logo.bmp");
	if(logo == NULL){
		printf("10\n");
		return 1;
	}

	paused = loadBitmap("/home/lcom/ChessProject/res/paused.bmp");
	if(paused == NULL){
		printf("9\n");
		return 1;
	}

	local1 = loadBitmap("/home/lcom/ChessProject/res/local1.bmp");
	if(local1 == NULL){
		printf("8\n");
		return 1;
	}

	serial1 = loadBitmap("/home/lcom/ChessProject/res/serial1.bmp");
	if(serial1 == NULL){
		printf("7\n");
		return 1;
	}

	exit1 = loadBitmap("/home/lcom/ChessProject/res/exit1.bmp");
	if(exit1 == NULL){
		printf("6\n");
		return 1;
	}

	local2 = loadBitmap("/home/lcom/ChessProject/res/local2.bmp");
	if(local2 == NULL){
		printf("5\n");
		return 1;
	}

	serial2 = loadBitmap("/home/lcom/ChessProject/res/serial2.bmp");
	if(serial2 == NULL){
		printf("4\n");
		return 1;
	}

	exit2 = loadBitmap("/home/lcom/ChessProject/res/exit2.bmp");
	if(exit2 == NULL){
		printf("3\n");
		return 1;
	}

	player1 = loadBitmap("/home/lcom/ChessProject/res/player1.bmp");
	if(player1 == NULL){
		printf("2\n");
		return 1;
	}

	player2 = loadBitmap("/home/lcom/ChessProject/res/player2.bmp");
	if(player2 == NULL){
		printf("1\n");
		return 1;
	}

	player1wins = loadBitmap("/home/lcom/ChessProject/res/player1wins.bmp");
	if(player1wins == NULL){
		printf("-1\n");
		return 1;
	}

	player2wins = loadBitmap("/home/lcom/ChessProject/res/player2wins.bmp");
	if(player2wins == NULL){
		printf("-2\n");
		return 1;
	}

	zero = loadBitmap("/home/lcom/ChessProject/res/zero.bmp");
	if(zero == NULL){
		return 1;
	}
	one = loadBitmap("/home/lcom/ChessProject/res/one.bmp");
	if(one == NULL){
		return 1;
	}
	two = loadBitmap("/home/lcom/ChessProject/res/two.bmp");
	if(two == NULL){
		return 1;
	}
	three = loadBitmap("/home/lcom/ChessProject/res/three.bmp");
	if(three == NULL){
		return 1;
	}
	four = loadBitmap("/home/lcom/ChessProject/res/four.bmp");
	if(four == NULL){
		return 1;
	}
	five = loadBitmap("/home/lcom/ChessProject/res/five.bmp");
	if(five == NULL){
		return 1;
	}
	six = loadBitmap("/home/lcom/ChessProject/res/six.bmp");
	if(six == NULL){
		return 1;
	}
	seven = loadBitmap("/home/lcom/ChessProject/res/seven.bmp");
	if(seven == NULL){
		return 1;
	}

	eigth = loadBitmap("/home/lcom/ChessProject/res/eigth.bmp");
	if(eigth == NULL){
		return 1;
	}
	nine = loadBitmap("/home/lcom/ChessProject/res/nine.bmp");
	if(nine == NULL){
		return 1;
	}

	colon = loadBitmap("/home/lcom/ChessProject/res/colon.bmp");
	if(colon == NULL){
		return 1;
	}

	bar = loadBitmap("/home/lcom/ChessProject/res/bar.bmp");
	if(bar == NULL){
		return 1;
	}

	sunday = loadBitmap("/home/lcom/ChessProject/res/sunday.bmp");
	if(sunday == NULL){
		return 1;
	}
	monday = loadBitmap("/home/lcom/ChessProject/res/monday.bmp");
	if(monday == NULL){
		return 1;
	}
	tuesday = loadBitmap("/home/lcom/ChessProject/res/tuesday.bmp");
	if(tuesday == NULL){
		return 1;
	}
	wednesday = loadBitmap("/home/lcom/ChessProject/res/wednesday.bmp");
	if(wednesday == NULL){
		return 1;
	}
	thursday = loadBitmap("/home/lcom/ChessProject/res/thursday.bmp");
	if(thursday == NULL){
		return 1;
	}
	friday = loadBitmap("/home/lcom/ChessProject/res/friday.bmp");
	if(friday == NULL){
		return 1;
	}
	saturday = loadBitmap("/home/lcom/ChessProject/res/saturday.bmp");
	if(saturday == NULL){
		return 1;
	}


	return 0;
}


void drawMenu(unsigned local, unsigned serial, unsigned exit){

	fill_screen(BLACK);

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

	fill_screen(BLACK);

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


void drawPaused(){
	fill_screen(BLACK);
	call_drawBitmap(paused, 0,0, ALIGN_LEFT);
}

void drawWinner(){
	GAME_STATE gameState = getGameState();

	if (gameState == BLACKWINS)
		call_drawBitmap(player2wins, 0, 0, ALIGN_LEFT);
	else if (gameState == WHITEWINS)
		call_drawBitmap(player1wins, 0, 0, ALIGN_LEFT);
}

void drawTime(time_info_t *time) {
	char timestr[9];
	sprintf(timestr, "%02d:%02d:%02d", time->hours, time->minutes, time->seconds);

	int i = 0;
		while (timestr[i] != '\0') {
			if (timestr[i] == '0')
				call_drawBitmap(zero, TIMEX+i*GAP, TIMEY, ALIGN_LEFT);
			else if (timestr[i] == '1')
				call_drawBitmap(one, TIMEX+i*GAP+2, TIMEY, ALIGN_LEFT);
			else if (timestr[i] == '2')
				call_drawBitmap(two, TIMEX+i*GAP+2, TIMEY, ALIGN_LEFT);
			else if (timestr[i] == '3')
				call_drawBitmap(three, TIMEX+i*GAP+2, TIMEY, ALIGN_LEFT);
			else if (timestr[i] == '4')
				call_drawBitmap(four, TIMEX+i*GAP+2, TIMEY, ALIGN_LEFT);
			else if (timestr[i] == '5')
				call_drawBitmap(five, TIMEX+i*GAP, TIMEY, ALIGN_LEFT);
			else if (timestr[i] == '6')
				call_drawBitmap(six, TIMEX+i*GAP, TIMEY, ALIGN_LEFT);
			else if (timestr[i] == '7')
				call_drawBitmap(seven, TIMEX+i*GAP, TIMEY, ALIGN_LEFT);
			else if (timestr[i] == '8')
				call_drawBitmap(eigth, TIMEX+i*GAP, TIMEY, ALIGN_LEFT);
			else if (timestr[i] == '9')
				call_drawBitmap(nine, TIMEX+i*GAP, TIMEY, ALIGN_LEFT);
			else if (timestr[i] == ':')
				call_drawBitmap(colon, TIMEX+i*GAP, TIMEY, ALIGN_LEFT);
			i++;
		}

}

void drawDate(date_info_t *date) {

	static char dateStr[9];
	int i = 0;

	switch (date->week_day) {
	case SUNDAY:
		call_drawBitmap(sunday, DAYX, DAYY, ALIGN_RIGHT);
		break;
	case MONDAY:
		call_drawBitmap(monday, DAYX, DAYY, ALIGN_RIGHT);
		break;
	case TUESDAY:
		call_drawBitmap(tuesday, DAYX, DAYY, ALIGN_RIGHT);
		break;
	case WEDNESDAY:
		call_drawBitmap(wednesday, DAYX, DAYY, ALIGN_RIGHT);
		break;
	case THURSDAY:
		call_drawBitmap(thursday, DAYX, DAYY, ALIGN_RIGHT);
		break;
	case FRIDAY:
		call_drawBitmap(friday, DAYX, DAYY, ALIGN_RIGHT);
		break;
	case SATURDAY:
		call_drawBitmap(saturday, DAYX, DAYY, ALIGN_RIGHT);
		break;
	}

	sprintf(dateStr, "%02d/%02d/%02d", date->month_day, date->month, date->year);

	while (dateStr[i] != '\0') {
		if (dateStr[i] == '0')
			call_drawBitmap(zero, DATEX+i*GAP, DATEY, ALIGN_LEFT);
		else if (dateStr[i] == '1')
			call_drawBitmap(one, DATEX+i*GAP+2, DATEY, ALIGN_LEFT);
		else if (dateStr[i] == '2')
			call_drawBitmap(two, DATEX+i*GAP+2, DATEY, ALIGN_LEFT);
		else if (dateStr[i] == '3')
			call_drawBitmap(three, DATEX+i*GAP+2, DATEY, ALIGN_LEFT);
		else if (dateStr[i] == '4')
			call_drawBitmap(four, DATEX+i*GAP+2, DATEY, ALIGN_LEFT);
		else if (dateStr[i] == '5')
			call_drawBitmap(five, DATEX+i*GAP, DATEY, ALIGN_LEFT);
		else if (dateStr[i] == '6')
			call_drawBitmap(six, DATEX+i*GAP, DATEY, ALIGN_LEFT);
		else if (dateStr[i] == '7')
			call_drawBitmap(seven, DATEX+i*GAP, DATEY, ALIGN_LEFT);
		else if (dateStr[i] == '8')
			call_drawBitmap(eigth, DATEX+i*GAP, DATEY, ALIGN_LEFT);
		else if (dateStr[i] == '9')
			call_drawBitmap(nine, DATEX+i*GAP, DATEY, ALIGN_LEFT);
		else if (dateStr[i] == '/')
			call_drawBitmap(bar, DATEX+i*GAP, DATEY, ALIGN_LEFT);
		i++;
	}
}
