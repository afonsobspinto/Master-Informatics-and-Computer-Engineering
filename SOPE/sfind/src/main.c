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
#include <string.h>
#include <dirent.h>
#include <sys/stat.h>
#include <errno.h>
#include <sys/types.h>
#include <unistd.h>
#include <signal.h>
#include "parser.h"
#include "args.h"
#include "signal_handlers.h"

int child_counter;


int main(int argc, char *argv[]) {

	if (argc < 2)
	{
		perror("Wrong number of arguments");
		exit(1);
	}

	struct sigaction action;
	// prepare the 'sigaction struct'
	action.sa_handler = sigint_handler;
	sigemptyset(&action.sa_mask);
	action.sa_flags = 0;
	// install the handler
	sigaction(SIGINT,&action,NULL);

	struct Args args;

	readArgs(argc, argv, &args);
	//showMeArgs(&args);


	parser(args.path, &args);

	int i;
	child_counter = 0;
	for(i = 0; i < child_counter; i++){
		wait(0);
	}


	return 0;
}

