#include "ChessProject.h"
#include "utilities.h"
#include "macros.h"
#include "bitmap.h"
#include "timer.h"


#include <stdio.h>

static Bitmap *Background;

int main(int argc, char **argv) {

	/* Initialize service */
	sef_startup();

	/* Enable IO-sensitive operations for ourselves */
	//sys_enable_iop(SELF);

	if (chessproject_start())
	{
		chessproject_exit();
		printf("ChessProject: An error occurred and the program was stopped.\n");
		return 1;
	}

	chessproject_exit();

	return 0;
}

int chessproject_start(){

	time_management(0);

	sleep(2);
	vg_init(GRAF_1024x768);

	Background = loadBitmap("/home/lcom/svn/ChessProject/res/images/background.bmp");
	drawBitmap(Background,0,0,ALIGN_LEFT);


	sleep(2);

	return 0;
}

int chessproject_exit(){
	vg_exit();
	return 0;
}
