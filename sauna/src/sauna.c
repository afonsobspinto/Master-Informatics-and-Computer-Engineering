#include <stdio.h>
#include <stdlib.h>
#include <sys/stat.h>
#include <sys/types.h>
#include <sys/file.h>
#include <errno.h>
#include <unistd.h>


#include "globals.h"

typedef struct {
        unsigned int ocupation;
        unsigned int capacity;
        char gender;
} Sauna;

static FILE* LOGS;
static double STARTING_TIME;
static Sauna sauna = {0,0,' '};

void createRejectedFIFO(){
	if(mkfifo(REJECTED_FIFO, S_IRUSR | S_IWUSR) < 0 // Permissions: User Read and User Write
			&& errno==EEXIST){
		perror("REJECTED_FIFO '/tmp/rejeitados' already exists\n");
		exit(1);
	}

	printf("REJECTED_FIFO '/tmp/rejeitados' sucessfully created\n");
}

void saunaManagement(){
	int fdRequests;
	int fdRejected;

	while ((fdRequests = open(REQUESTS_FIFO, O_RDONLY)) == -1){
		if (errno != ENXIO){
			perror("REQUESTS_FIFO '/tmp/entrada' could not be openned in READONLY mode\n");
			exit(1);
		}
		else{
			printf("REQUESTS_FIFO '/tmp/entrada' not available, write side hasn't been opened yet \n");
			sleep(1);
		}
	}

	printf("REQUESTS_FIFO '/tmp/entrada' openned in READONLY mode\n");


	while ((fdRejected = open(REJECTED_FIFO, O_WRONLY | O_NONBLOCK)) == -1){
		if (errno != ENXIO){
			perror("REJECTED_FIFO '/tmp/rejeitados' could not be openned in WRITEONLY mode\n");
			exit(1);
		}
		else{
			printf("REJECTED_FIFO '/tmp/rejeitados' not available, read side hasn't been opened yet \n");
			sleep(1);
		}
	}

	printf("REJECTED_FIFO '/tmp/rejeitados' openned in WRITEONLY mode\n");


}


int main (int argc, char* argv[], char* envp[]){

	if(argc != 2){
		printf("Wrong number of arguments \n.");
		exit(1);
	}

	unsigned int numberPlaces;

	if((numberPlaces = atoi(argv[1])) == 0){
		printf("Invalid number of places. \n");
		exit(1);
	}

	printf("Number of Places: %d \n", numberPlaces);

	sauna.capacity = numberPlaces;

	createRejectedFIFO();


	char logsPath[32];
	sprintf(logsPath, "/tmp/bal.%d", getpid());
	if((LOGS = fopen(logsPath, "a")) == NULL){ // Opens a text file for writing in Appends mode. If it does not exist, then a new file is created.
		perror("Unable to create LOGS file");
		exit(1);
	}
	printf("LOGS file: %s created \n", logsPath);


	saunaManagement();


	if(unlink(REJECTED_FIFO) < 0)
		printf("Error when destroying REJECTED_FIFO '/tmp/rejeitados'\n");
	else
		printf("REJECTED_FIFO '/tmp/rejeitados' has been destroyed \n");

	return 0;
}
