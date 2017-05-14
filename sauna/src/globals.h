/*
 * globals.h
 *
 *  Created on: May 14, 2017
 *      Author: afonso
 */

#ifndef GLOBALS_H_
#define GLOBALS_H_

typedef int bool;
#define true 1
#define false 0

char* REQUESTS_FIFO = "/tmp/entrada";
char* REJECTED_FIFO = "/tmp/rejeitados";

bool checkVality(char* argv[], unsigned int* var){

	if(((var = atoi(argv[1])) == 0) || ((var = atoi(argv[2])) == 0)){
		return false;
	}
	else if(var < 0){
		return false;
	}
	else
		return true;
}

#endif /* GLOBALS_H_ */
