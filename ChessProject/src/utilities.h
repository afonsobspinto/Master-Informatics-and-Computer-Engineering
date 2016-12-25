#pragma once

#define BIT(n) (0x01<<n)
#define singleBit(byte) (0x01 & byte)
#define swap(type, i, j) {type t = i; i=j; j=t;}

#define ROWS 8
#define COLS 8

#define YELLOW 				65024
#define RED					38914
#define BLUE				255
#define WHITE				16777215
#define BLACK				0

#define VIDEO_MEM 	  				1
#define SECOND_BUFFER 				2
#define THIRD_BUFFER  				3



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
