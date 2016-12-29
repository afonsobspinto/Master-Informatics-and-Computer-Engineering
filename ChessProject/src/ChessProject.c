#include <stdio.h>
#include "ChessProject.h"
#include "utilities.h"
#include "macros.h"
#include "timer.h"
#include "game.h"
#include "bitmap.h"
#include "chess.h"
#include "mouse.h"


static MENU_STATE menu_state;

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

	// Initialize Bitmaps

	if(loadBitmaps() == 1)
		return 1;

	// Inicial State

	menu_state = MENU;

	while(1){
		if(menu_state == MENU){
			menu_state = menu_management();
		}
		else if(menu_state == MULTIPLAYER_LOCAL){
			menu_state = game_management();
			break;
		}

		else if(menu_state == MULTIPLAYER_SERIAL)
			printf("Multiplayer_serial: ");
		else
			return 0;
	}

	return 0;
}

int chessproject_exit(){
	deleteMouse();
	deleteBitmaps();
	vg_exit();
	return 0;
}


MENU_STATE *getMenuState(){
	MENU_STATE *out;
	asm ("movl %1, %%eax; movl %%eax,%0;"
			:"=r"(out)
			 :"r"(&menu_state)
			  :"%eax"
	);
	return out;
}
