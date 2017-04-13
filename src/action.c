#include "action.h"
#include <stdio.h>
#include <string.h>
#include <stdlib.h>


void performAction(const struct Args* args, char *path){

	if(args->print){
		printf("%s \n", path);
	}
	if(args->delete){
		if(remove(path)<0){
			perror("remove");
			exit(-2);
		}
		else
			printf("%s deleted \n", path);
	}
	if(args->exec){

		if(!fork())
			if(execlp(args->command, args->command, path, NULL) < 0){
				perror("exec");
				exit(-3);
			}
		else
			wait(0);
	}
}

