#include <stdio.h>
#include <stdlib.h>
#include <sys/types.h>
#include <sys/stat.h>
#include <sys/file.h>
#include <errno.h>
#include <unistd.h>
#include <pthread.h>


#include "request.h"


char* REQUESTS_FIFO = "/tmp/entrada";
char* REJECTEDS_FIFO = "/tmp/rejeitados";

void createOrdersFIFO(){
	if(mkfifo(REQUESTS_FIFO, S_IRUSR | S_IWUSR) < 0 // Permissions: User Read and User Write
			&& errno==EEXIST){
		perror("REQUESTS_FIFO '/tmp/entrada' already exists\n");
		exit(1);
	}
}


void* requestsThread(void* arg){

	int fdRequests = (REQUESTS_FIFO,O_WRONLY);
	unsigned int numberRequests = *(int*) arg;


	if(fdRequests == -1){
		 printf("REQUESTS_FIFO '/tmp/entrada' could not be openned in WRITEONLY mode\n");
		 exit(1);
	}

	sleep(3);
	printf("REQUESTS_FIFO '/tmp/entrada' openned in WRITEONLY mode\n");

}


int main (int argc, char* argv[], char* envp[]){


	if(argc != 3){
		printf("Wrong number of arguments \n.");
		exit(1);
	}

	unsigned int numberRequests;
	unsigned int usageTime;

	if((numberRequests = atoi(argv[1])) == 0){
		printf("Invalid number of orders. \n");
		exit(1);
	}

	if((usageTime = atoi(argv[2])) == 0){
		printf("Invalid usage time. \n");
		exit(1);
	}

	printf("Number of Orders: %d \nUsage Time: %d \n", numberRequests, usageTime);

	createOrdersFIFO();
	printf("REQUESTS_FIFO '/tmp/entrada' sucessfully created\n");


	pthread_t requests_tid;

	pthread_create(&requests_tid, NULL, requestsThread, (void*) &numberRequests);

	pthread_join(requests_tid, NULL);


	if(unlink(REQUESTS_FIFO) < 0)
		printf("Error when destroying REQUESTS_FIFO '/tmp/entrada'\n");
	else
		printf("REQUESTS_FIFO '/tmp/entrada' has been destroyed \n");

	return 0;


}
