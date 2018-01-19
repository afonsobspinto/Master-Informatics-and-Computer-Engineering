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
		scanf("%s",&ans);

		ans =  (char) toupper(ans);

		if(ans == 'Y'){
			printf("\n Exiting... \n");
			exit(0);
		}
		else
			return;
	}

}
