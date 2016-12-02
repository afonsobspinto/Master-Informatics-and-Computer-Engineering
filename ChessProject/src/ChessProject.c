#include "ChessProject.h"
#include "utilities.h"
#include "macros.h"

#include <stdio.h>


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

	vg_init(GRAF_1024x768);

	sleep(2);

	return 0;
}

int chessproject_exit(){
	vg_exit();
	return 0;
}
