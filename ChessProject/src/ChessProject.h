#ifndef _CHESSPROJECT_H
#define _CHESSPROJECT_H


typedef enum {
	MENU,
	MULTIPLAYER_LOCAL,
	MULTIPLAYER_SERIAL,
	PAUSE_MENU,
	END
} MENU_STATE;

/**
 * @brief Start the program
 *
 * @return Return 0 upon success, non-zero otherwise
 */
int chessproject_start();


/**
 * @brief Exit the program
 *
 * @return Return 0 upon success, non-zero otherwise
 */
int chessproject_exit();


MENU_STATE getMenuState();


#endif
