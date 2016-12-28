#ifndef __GAME_H
#define __GAME_H

#include "ChessProject.h"

typedef enum {

	WHITE2PLAY,
	BLACK2PLAY,
	WHITEWINS,
	BLACKWINS

} GAME_STATE;

int game_management();

MENU_STATE menu_management();

GAME_STATE getGameState();



#endif /* __GAME_H */
