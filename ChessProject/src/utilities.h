#pragma once

#define BIT(n) (0x01<<n)
#define singleBit(byte) (0x01 & byte)
#define swap(type, i, j) {type t = i; i=j; j=t;}

typedef enum {
	MENU,
	MULTIPLAYER_LOCAL,
	MULTIPLAYER_SERIAL,
	WHITE2PLAY,
	BLACK2PLAY,
	END
} GAME_STATE;


int fileExists(const char* filename);
