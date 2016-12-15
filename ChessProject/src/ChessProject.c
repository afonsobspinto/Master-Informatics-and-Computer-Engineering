#include "ChessProject.h"
#include "utilities.h"
#include "macros.h"
#include "bitmap.h"
#include "timer.h"


#include <stdio.h>

static Bitmap *Background;
static counterPlayer1 = 30;
static counterPlayer2 = 30;

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


	printf("Tudo 0k");
	//vg_init(RESOLUTION);

	GAME_STATE game_state = MENU;

//	while(1){
//		if(game_state == MENU){
//			game_state = main_menu();
//			break; // retirar;
//		}
//		else if(game_state == MULTIPLAYER_LOCAL)
//			printf("Multiplayer_local: ");
//		else if(game_state == MULTIPLAYER_SERIAL)
//			printf("Multiplayer_serial: ");
//		else
//			return 0;
//	}



//
//	Background = loadBitmap("/home/lcom/ChessProject/res/background.bmp");
//	if(Background == NULL){
//		printf("NULL\n");
//	}
//	call_drawBitmap(Background,512,0,ALIGN_CENTER);


	sleep(4);

	return 0;
}

int chessproject_exit(){
	vg_exit();
	return 0;
}
