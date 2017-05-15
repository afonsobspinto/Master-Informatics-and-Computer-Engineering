#include <stdio.h>
#include <stdlib.h>
#include <sys/stat.h>
#include <sys/types.h>
#include <sys/file.h>
#include <sys/syscall.h>
#include <errno.h>
#include <unistd.h>
#include <pthread.h>
#include <math.h>


#include "globals.h"
#include "request.h"

#define gettid() syscall(SYS_gettid);

typedef struct {
        unsigned int ocupation;
        unsigned int capacity;
        char gender;
        unsigned int femaleRequests;
        unsigned int maleRequests;
        unsigned int femaleRejections;
        unsigned int maleRejections;
        unsigned int femaleServed;
        unsigned int maleServed;
} Sauna;

static FILE* LOGS;
static double STARTING_TIME;
static Sauna sauna = {0,0,' ', 0,0,0,0,0,0};
static int FD_REQUESTS;
static int FD_REJECTED;

static pthread_mutex_t mutex = PTHREAD_MUTEX_INITIALIZER;
static pthread_cond_t seatsMutex = PTHREAD_COND_INITIALIZER;

void createRejectedFIFO(){
	if(mkfifo(REJECTED_FIFO, S_IRUSR | S_IWUSR) < 0 // Permissions: User Read and User Write
			&& errno==EEXIST){
		perror("REJECTED_FIFO '/tmp/rejeitados' already exists\n");
		exit(1);
	}

	printf("REJECTED_FIFO '/tmp/rejeitados' sucessfully created\n");
}

void openCommunications(){
	while ((FD_REQUESTS = open(REQUESTS_FIFO, O_RDONLY)) == -1){
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


		while ((FD_REJECTED = open(REJECTED_FIFO, O_WRONLY | O_NONBLOCK)) == -1){
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

void updateStatsAndLogs(char type, Request* request){

	struct timeval tvalAfter;
	gettimeofday(&tvalAfter, NULL);
	double afterTime = tvalAfter.tv_sec * 1000000 + tvalAfter.tv_usec;

	char* tip;

	if(request->gender == 'M'){
		switch(type){
		case 'p':
			sauna.maleRequests++;
			tip = "RECEBIDO";
			break;
		case 'r':
			sauna.maleRejections++;
			tip = "REJEITADO";
			break;
		case 's':
			sauna.maleServed++;
			tip = "SERVIDO";
			break;
		}
	}
	else {
		switch(type){
		case 'p':
			sauna.femaleRequests++;
			tip = "RECEBIDO";
			break;
		case 'r':
			sauna.femaleRejections++;
			tip = "REJEITADO";
			break;
		case 's':
			sauna.femaleServed++;
			tip = "SERVIDO";
			break;
		}
	}


	if(fprintf(LOGS, "%10.2f - %4d - %15lu - %*u: %c - %*u - %9s\n",
			(afterTime-STARTING_TIME) / 1000, getpid(), pthread_self(),LENGTHIDS,request->id, request->gender, LENGTHDURATION,request->duration, tip) < 0){
		perror("Could not write in LOGS :: Sauna\n");
		exit(1);
	}

}


void* addToSauna(void* arg){
	pthread_mutex_lock(&mutex);
	Request* request = (Request*) arg;

	pthread_mutex_unlock(&mutex);

	usleep(request->duration * 1000);

	pthread_mutex_lock(&mutex);
	sauna.ocupation--;
	if(sauna.ocupation==0)
		sauna.gender = ' ';
	pthread_mutex_unlock(&mutex);

	pthread_cond_signal(&seatsMutex);
	printf("Served Request: %d %c %d \n", request->id, request->gender, request->duration);

	free(request);
	return NULL;
}

void saunaManagement(){
	unsigned int i;
	int toRead;
	int maxUsageTime;

	pthread_t seatsTID[sauna.capacity];

	openCommunications();

	read(FD_REQUESTS, &toRead, sizeof(int));
	read(FD_REQUESTS, &maxUsageTime, sizeof(int));

	LENGTHIDS = floor(log10(abs(toRead))) + 1;
	LENGTHDURATION = floor(log10(abs(maxUsageTime))) + 1;

	while(toRead){

		Request* request = malloc(sizeof(Request));

		if (read(FD_REQUESTS, request, sizeof(Request)) != 0){
			toRead--;

			pthread_mutex_lock(&mutex);

			updateStatsAndLogs('p', request);

			if(sauna.ocupation == 0)
				sauna.gender = request->gender;

			if(sauna.gender == request->gender){

				while (sauna.ocupation == sauna.capacity)
				{
					printf("FULL FULL FULL \n");
					pthread_cond_wait(&seatsMutex, &mutex);
				}

				printf("Accepted Request: %d %c %d \n", request->id, request->gender, request->duration);

				pthread_create(&seatsTID[sauna.ocupation], NULL, addToSauna, (void*) request);

				updateStatsAndLogs('s', request);

				sauna.ocupation++;
			}
			else{

				printf("Rejected Request: %d %c %d %d \n", request->id, request->gender, request->duration, request->rejections);

				updateStatsAndLogs('r', request);

				if(++request->rejections < 3)
					toRead++;

				if(write(FD_REJECTED, request, sizeof(*request)) == -1){
					perror("Could not write in REJECTED_FIFO :: saunaManagement\n");
					exit(1);
				}
			}

			pthread_mutex_unlock(&mutex);
		}
	}


		for(i = 0; seatsTID[i] < sauna.capacity; i++){
			pthread_join(seatsTID[i], NULL);
		}

		close(FD_REJECTED);
		close(FD_REQUESTS);


		return;

}

void showStatistics(){
	printf("Number of Requests: %u \n 	"
			"Male: %u \n 	"
			"Female: %u \n"
			"Number of Rejections: %u \n 	"
			"Male: %u \n 	"
			"Female: %u \n"
			"Number of Served: %u \n 	"
			"Male: %u \n 	"
			"Female: %u \n",
			sauna.femaleRequests+sauna.maleRequests, sauna.maleRequests, sauna.femaleRequests,
			sauna.femaleRejections+sauna.maleRejections, sauna.maleRejections, sauna.femaleRejections,
			sauna.femaleServed+sauna.maleServed, sauna.maleServed, sauna.femaleServed);
}


int main (int argc, char* argv[], char* envp[]){

	struct timeval tvalBegin;
	gettimeofday(&tvalBegin, NULL);
	STARTING_TIME = tvalBegin.tv_sec * 1000000 + tvalBegin.tv_usec;

	printf("Starting Time: %d \n", (int) STARTING_TIME);


	if(argc != 2){
		printf("Wrong number of arguments \n.");
		exit(1);
	}

	int numberPlaces;

	if(!checkVality(argv[1], &numberPlaces)){
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

	showStatistics();

	fclose(LOGS);

	if(unlink(REJECTED_FIFO) < 0)
		printf("Error when destroying REJECTED_FIFO '/tmp/rejeitados'\n");
	else
		printf("REJECTED_FIFO '/tmp/rejeitados' has been destroyed \n");

	return 0;
}
