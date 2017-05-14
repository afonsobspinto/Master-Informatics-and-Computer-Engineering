/*
 * globals.h
 *
 *  Created on: May 14, 2017
 *      Author: afonso
 */

#ifndef GLOBALS_H_
#define GLOBALS_H_

#include <stdbool.h>

char* REQUESTS_FIFO = "/tmp/entrada";
char* REJECTED_FIFO = "/tmp/rejeitados";


bool checkVality(char* argv, unsigned int* var){

	if(((*var = atoi(argv)) == 0))
		return false;

	if(*var < 0)
		return false;

	return true;
}


#endif /* GLOBALS_H_ */
