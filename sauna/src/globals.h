/*
 * globals.h
 *
 *  Created on: May 14, 2017
 *      Author: afonso
 */

#ifndef GLOBALS_H_
#define GLOBALS_H_

char* REQUESTS_FIFO = "/tmp/entrada";
char* REJECTED_FIFO = "/tmp/rejeitados";

void checkVality(char* argv[], unsigned int numberRequests, unsigned int maxUsageTime){

	if((numberRequests = atoi(argv[1])) == 0){
		printf("Invalid number of orders. \n");
		exit(1);
	}

	if(numberRequests < 0){
		printf("Invalid number of orders. \n");
		exit(1);
	}

	if((maxUsageTime = atoi(argv[2])) == 0){
		printf("Invalid usage time. \n");
		exit(1);
	}

	if(maxUsageTime < 0){
		printf("Invalid usage time. \n");
		exit(1);
	}
}

#endif /* GLOBALS_H_ */
