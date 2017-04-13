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
#include <signal.h>

static pid_t parent_pid;


void sigint_handler(int signo)
{
	if(parent_pid == getpid()){
		char ans;

		printf(" \n Are you sure you want to terminate (Y/N)?");
		scanf("%s",&ans);

		ans =  (char) toupper(ans);

		if(ans == 'Y'){
			printf("Exiting... \n");
			exit(0);
		}
		else
			return;
	}
}



int main(int argc, char *argv[]) {

	if (argc < 2)
	{
		perror("Wrong number of arguments");
		exit(1);
	}

	parent_pid = getpid();

	struct sigaction action;
	// prepare the 'sigaction struct'
	action.sa_handler = sigint_handler;
	sigemptyset(&action.sa_mask);
	action.sa_flags = 0;
	// install the handler
	sigaction(SIGINT,&action,NULL);


	struct Args args;
	vector files;
	vector_init(&files);

	readArgs(argc, argv, &args);
	//showMeArgs(&args);

	parser(args.path, &args, &files);


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

