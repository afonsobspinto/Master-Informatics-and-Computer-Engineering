#include "action.h"
#include <stdio.h>
#include <string.h>


void performAction(const struct Args* args, vector *files){

	printf("\n Action: \n");

	char * path;

	int i;
	for(i = 0; i < vector_count(files); i++){

		path = vector_get(files, i);

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
}
