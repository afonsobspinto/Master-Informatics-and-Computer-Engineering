#include "menu.h"

GAME_STATE main_menu(){
	printf("Menu: \n");

	return MENU; //Editar para selecao do user;
}

GAME_STATE exit_menu(){
	printf("Exit Menu: \n");

	return END;
}
