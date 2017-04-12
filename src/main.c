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


int main(int argc, char *argv[]) {

	if (argc < 2)
	{
		perror("Wrong number of arguments");
		exit(1);
	}

	struct Args args;

	readArgs(argc, argv, &args);
	showMeArgs(&args);
	parser(args.path, &args);
	return 0;
}
