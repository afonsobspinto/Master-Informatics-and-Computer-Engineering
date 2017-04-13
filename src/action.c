#include "action.h"
#include <stdio.h>
#include <string.h>
#include <stdlib.h>


void performAction(const struct Args* args, char *path){

	printf("\n Action: \n");

	if(args->print){
		printf("%s \n", path);
	}
	if(args->delete){
		if(remove(path)<0){
			perror("remove");
			exit(-2);
		}
	}
	if(args->exec){

		if(!fork())
			execlp(args->command, args->command, path, NULL);
		else
			wait(0);
	}
}

