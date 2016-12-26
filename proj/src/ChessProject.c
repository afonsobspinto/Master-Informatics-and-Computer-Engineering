#include <stdio.h>
#include "ChessProject.h"
#include "utilities.h"
#include "macros.h"
#include "timer.h"
#include "game.h"
#include "bitmap.h"
#include "chess.h"
#include "mouse.h"


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

	vg_init(MODE);

	// Initialize Mouse

	getMouse();
	drawMouse();

	sleep(5);

	// Initialize Bitmaps

	if(loadBitmaps() == 1)
		return 1;

	// Inicial State

	GAME_STATE game_state = MENU;

	while(1){
		if(game_state == MENU){
			game_state = main_menu();
		}
		else if(game_state == MULTIPLAYER_LOCAL){
			printf("Multiplayer_local: ");
			game_state = game_management();
			break;
		}

		else if(game_state == MULTIPLAYER_SERIAL)
			printf("Multiplayer_serial: ");
		else
			return 0;
	}

	return 0;
}

int chessproject_exit(){
	deleteMouse();
	//deleteBitmaps();
	vg_exit();
	return 0;
}

GAME_STATE main_menu(){

//	drawMenu(1,1,1);
//	//if(rato sobre espaço 1)
//		//drawMenu(2,1,1);
//		//if(rato click)
//			//return MULTIPLAYER_LOCAL;
//
//	sleep(5);

	return MULTIPLAYER_LOCAL;
}
