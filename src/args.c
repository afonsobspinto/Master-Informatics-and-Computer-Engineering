/*
 * args.c
 *
 *  Created on: Apr 12, 2017
 *      Author: afonso
 */

#include "args.h"
#include <stddef.h>


void readArgs(int argc, char* argv[], struct Args* args){
	int i = 1;

	args->path = argv[i];

	args->name = "";
	args->type = "";
	args->perm = 0;
	args->print = false;
	args->delete = false;
	args->exec = false;
	args->command = "";

	for(; i < argc; i++){

		if(strcmp(argv[i],"-name") == 0)
			args->name = argv[++i];

		else if(strcmp(argv[i],"-type") == 0)
			args->type = argv[++i];

		else if(strcmp(argv[i],"-perm") == 0)
			args->perm = strtoul(argv[++i], NULL, 8);

		else if(strcmp(argv[i],"-print") == 0)
			args->print = true;

		else if(strcmp(argv[i],"-delete") == 0)
			args->delete = true;

		else if(strcmp(argv[i],"-exec") == 0){
			args->exec = true;
			args->command = argv[++i];
		}
	}

}

void showMeArgs(struct Args* args){
	printf("path: %s \n", args->path);
	printf("name %s \n", args->name);
	printf("type %s \n", args->type);
	printf("perm %o \n", args->perm);
	printf("print %u \n", args->print);
	printf("delete %u \n", args->delete);
	printf("exec %u \n", args->exec);
	printf("command %s \n", args->command);
}
