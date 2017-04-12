/*
 * args.c
 *
 *  Created on: Apr 12, 2017
 *      Author: afonso
 */

#include "args.h"


void readArgs(int argc, char* argv[], struct Args* args){
	int i = 1;

	args->path = argv[i];

}
