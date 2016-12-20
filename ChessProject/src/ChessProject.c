#include "ChessProject.h"
#include "utilities.h"
#include "macros.h"
#include "timer.h"
#include "game.h"
#include <stdio.h>
#include "bitmap.h"




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

	// Initialize Bitmaps

	if(loadBitmaps() == 1)
		return 1;



	GAME_STATE game_state = MENU;

	while(1){
		if(game_state == MENU){
			game_state = main_menu();
			break; // retirar;
		}
		else if(game_state == MULTIPLAYER_LOCAL)
			printf("Multiplayer_local: ");
		else if(game_state == MULTIPLAYER_SERIAL)
			printf("Multiplayer_serial: ");
		else
			return 0;
	}



//	draw_timer(30, 14);

// sleep(5);



	//game_management();

//	call_drawBitmap(Background,512,0,ALIGN_CENTER);
//
//
//	sleep(4);

	return 0;
}

int chessproject_exit(){
	vg_exit();
	return 0;
}

GAME_STATE main_menu(){

	drawMenu(1,1,1);
	sleep(5);

	return MULTIPLAYER_LOCAL;
}
