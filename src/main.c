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
//	int i;
//	int size = vector_size(files);
//
//	printf("%d", size);
//
//	printf("action: \n");
//	for(i = 0; i < size; i++){
//		DIR *dirp;
//		struct dirent *direntp;
//		struct stat statBuf;
//		char *path = (char *) vector_get(files, i);
//
//		printf("%s \n",path);
//
//		dirp = opendir(path);
//		direntp = readdir(dirp);
//		printf("%s \n", direntp->d_name);
//  }

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

    printf("parent_pid = %d\n", getpid());
	parser(args.path, &args, &files);
	action(&files);
	return 0;
}

