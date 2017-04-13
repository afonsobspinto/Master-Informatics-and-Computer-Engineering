/*
 * signal_handlers.c
 *
 *  Created on: Apr 13, 2017
 *      Author: afonso
 */

#include <stdio.h>
#include "signal_handlers.h"

void sigint_handler(int signo){
	if(signo == SIGINT){

		char ans;
		printf(" \n Are you sure you want to terminate (Y/N)?");
		kill(0, SIGTSTP);

		ans =  (char) toupper(ans);

		do{
			read(STDIN_FILENO, &ans, 1);
			if (ans == 'Y')
				kill(0,SIGTERM);
			else{
				if (ans == 'N')
				{
					kill(0,SIGCONT);
					break;
				}
			}
		}while(ans != 'Y'&& ans != 'N');
	}

}
