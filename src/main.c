/*
 ============================================================================
 Name        : Hello.c
 Author      : 
 Version     :
 Copyright   : Your copyright notice
 Description : Hello World in C, Ansi-style
 ============================================================================
 */

#include <stdio.h>
#include <stdlib.h>
#include "args.h"
#include "vector.h"
#include <string.h>
#include <dirent.h>
#include <sys/stat.h>
#include <errno.h>
#include <sys/types.h>
#include <unistd.h>
#include <stdio.h>
#include "parser.h"

void action(vector* files){

}


int main(int argc, char *argv[]) {

	if (argc < 2)
	{
		perror("Wrong number of arguments");
		exit(1);
	}

	struct Args args;
	vector files;
	vector_init(&files);

	readArgs(argc, argv, &args);
	//showMeArgs(&args);

	parser(args.path, &args, &files);



	action(&files);
	return 0;

	/*
	vector v;
	vector_init(&v);

	vector_add(&v, "emil");
	vector_add(&v, "hannes");
	vector_add(&v, "lydia");
	vector_add(&v, "olle");
	vector_add(&v, "erik");

	int i;
	printf("first round:\n");
	for (i = 0; i < vector_count(&v); i++) {
		printf("%s\n", vector_get(&v, i));
	}

	vector_delete(&v, 1);
	vector_delete(&v, 3);

	printf("second round:\n");
	for (i = 0; i < vector_count(&v); i++) {
		printf("%s\n", vector_get(&v, i));
	}

	vector_free(&v);

	return 0;*/
}

