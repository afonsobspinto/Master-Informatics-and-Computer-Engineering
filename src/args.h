/*
 * args.h
 *
 *  Created on: Apr 12, 2017
 *      Author: afonso
 */

#ifndef ARGS_H_
#define ARGS_H_

#include <stdbool.h>

struct Args{
	char* path;
	char* name;
	char type;
	int perm;
	bool print;
	bool delete;
	bool exec;
	char* command;

};

void readArgs(int argc, char* argv[], struct Args* args);

#endif /* ARGS_H_ */
