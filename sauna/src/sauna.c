#include <stdio.h>
#include <stdlib.h>

typedef struct {
        unsigned int ocupation;
        unsigned int capacity;
        char gender;
} Sauna;

static FILE* LOGS;
static double STARTING_TIME;
static Sauna sauna = {0,0,' '};

void startSauna(int numberPlaces){

	sauna.capacity = numberPlaces;



}


int main (int argc, char* argv[], char* envp[]){

	if(argc != 2){
		printf("Wrong number of arguments \n.");
		exit(1);
	}

	unsigned int numberPlaces;

	if((numberPlaces = atoi(argv[1])) <= 0){
		printf("Invalid number of places. \n");
		exit(1);
	}

	printf("Number of Places: %d \n", numberPlaces);

	char logsPath[32];
	sprintf(logsPath, "/tmp/bal.%d", getpid());
	if((LOGS = fopen(logsPath, "a")) == NULL){ // Opens a text file for writing in Appends mode. If it does not exist, then a new file is created.
		perror("Unable to create LOGS file");
		exit(1);
	}
	printf("LOGS file: %s created \n", logsPath);

	startSauna(numberPlaces);

	return 0;
}
