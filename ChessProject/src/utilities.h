#pragma once

#define BIT(n) (0x01<<n)
#define singleBit(byte) (0x01 & byte)
#define swap(type, i, j) {type t = i; i=j; j=t;}

#define ROWS 8
#define COLS 8

typedef enum {
	MENU,
	MULTIPLAYER_LOCAL,
	MULTIPLAYER_SERIAL,
	WHITE2PLAY,
	BLACK2PLAY,
	WHITEWINS,
	BLACKWINS,
	PAUSE_MENU,
	END
} GAME_STATE;


int fileExists(const char* filename);
