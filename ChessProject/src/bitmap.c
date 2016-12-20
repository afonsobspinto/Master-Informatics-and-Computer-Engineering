#include "bitmap.h"
#include "stdio.h"
#include "video_gr.h"
#include "utilities.h"


//Bitmaps
static Bitmap *background;
static Bitmap *cursor;
static Bitmap *logo;
static Bitmap *local1;
static Bitmap *serial1;
static Bitmap *exit1;
static Bitmap *local2;
static Bitmap *serial2;
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

    copy_buffer(getHorResolution()*getVerResolution()*2);
}

void deleteBitmap(Bitmap* bmp) {
    if (bmp == NULL)
        return;

    free(bmp->bitmapData);
    free(bmp);
}



int loadBitmaps(){

	background = loadBitmap("/home/lcom/ChessProject/res/background.bmp");
	if(background == NULL){
		return 1;
	}

	//	cursor = loadBitmap("/home/lcom/ChessProject/res/cursor.bmp");
	//	if(background == NULL){
	//		return 1;
	//	}

	logo = loadBitmap("/home/lcom/ChessProject/res/logo.bmp");
	if(background == NULL){
		return 1;
	}

	local1 = loadBitmap("/home/lcom/ChessProject/res/local1.bmp");
	if(background == NULL){
		return 1;
	}

	serial1 = loadBitmap("/home/lcom/ChessProject/res/serial1.bmp");
	if(background == NULL){
		return 1;
	}

	exit1 = loadBitmap("/home/lcom/ChessProject/res/exit1.bmp");
	if(background == NULL){
		return 1;
	}


	return 0;
}


void drawMenu(unsigned local, unsigned serial, unsigned exit){

	call_drawBitmap(logo,512,10,ALIGN_CENTER);
	if(local==1)
		call_drawBitmap(local1, 512, 150, ALIGN_CENTER);
	if(serial==1)
		call_drawBitmap(serial1, 512, 200, ALIGN_CENTER);
	if(exit==1)
		call_drawBitmap(exit1, 512, 245, ALIGN_CENTER);


	// Adicionar else com outra a imagem colorida;
}
