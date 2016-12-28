#ifndef __GAME_H
#define __GAME_H

typedef enum {

	WHITE2PLAY,
	BLACK2PLAY,
	WHITEWINS,
	BLACKWINS

} GAME_STATE;

int game_management();

GAME_STATE menu_management();

GAME_STATE getGameState();



#endif /* __GAME_H */
