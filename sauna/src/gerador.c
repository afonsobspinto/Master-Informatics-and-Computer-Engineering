#include <stdio.h>
#include <stdlib.h>
#include <sys/types.h>
#include <sys/stat.h>
#include <sys/file.h>
#include <sys/syscall.h>
#include <errno.h>
#include <unistd.h>
#include <pthread.h>
#include <time.h>
#include <math.h>

#include "request.h"
#include "globals.h"

#define gettid() syscall(SYS_gettid)

typedef struct {
        unsigned int M_REQUESTS;
        unsigned int F_REQUESTS;
        unsigned int M_REJECTIONS;
        unsigned int F_REJECTIONS;
        unsigned int M_DISCARDED;
        unsigned int F_DISCARDED;
} Stats;

static FILE* LOGS;
static double STARTING_TIME;
static int FD_REQUESTS;
static Stats stats = {0,0,0,0,0,0};


void createOrdersFIFO(){
	if(mkfifo(REQUESTS_FIFO, S_IRUSR | S_IWUSR) < 0 // Permissions: User Read and User Write
			&& errno==EEXIST){
		perror("REQUESTS_FIFO '/tmp/entrada' already exists\n");
		exit(1);
	}
}

void checkStats(char type, char gender){
	if(gender == 'M'){
		switch(type){
		case 'p':
			stats.M_REQUESTS++;
			break;
		case 'r':
			stats.M_REJECTIONS++;
			break;
		case 'd':
			stats.M_DISCARDED++;
			break;
		}
	}
	else {
		switch(type){
		case 'p':
			stats.F_REQUESTS++;
			break;
		case 'r':
			stats.F_REJECTIONS++;
			break;
		case 'd':
			stats.F_DISCARDED++;
			break;
		}
	}
}

void* requestsThread(void* arg){

	unsigned int numberRequests =  ((int *)arg)[0];
	unsigned int maxUsageTime = ((int *)arg)[1];
	int lengthDuration = floor(log10(abs(maxUsageTime))) + 1;
	int lengthIDs = floor(log10(abs(numberRequests))) + 1;


	unsigned int i;


	while ((FD_REQUESTS = open(REQUESTS_FIFO, O_WRONLY | O_NONBLOCK)) == -1){
		if (errno != ENXIO){
			perror("REQUESTS_FIFO '/tmp/entrada' could not be openned in WRITEONLY mode\n");
			exit(1);
		}
		else{
			printf("REQUESTS_FIFO '/tmp/entrada' not available, read side hasn't been opened yet \n");
			sleep(1);
		}

	}

	printf("REQUESTS_FIFO '/tmp/entrada' openned in WRITEONLY mode\n");


	for(i=0; i < numberRequests; i++){
		Request* request = malloc(sizeof(Request));

		generate(request, maxUsageTime);

		printf("p%d | %c | t%d | ...  \n",request->id, request->gender, request->duration);

		checkStats('p',request->gender);

		write(FD_REQUESTS, &request, sizeof(request));

		struct timeval tvalAfter;
		gettimeofday(&tvalAfter, NULL);
		double afterTime = tvalAfter.tv_sec * 1000000 + tvalAfter.tv_usec;


		fprintf(LOGS, "%.2f - %ld - %*u: %c - %*u - PEDIDO\n",
				(afterTime-STARTING_TIME) / 1000, gettid(), lengthIDs,request->id, request->gender, lengthDuration,request->duration);

	}

	return NULL;

}

void* rejectedThread(void* arg){

	int fdRejected;

	unsigned int numberRequests =  ((int *)arg)[0];
	unsigned int maxUsageTime = ((int *)arg)[1];
	int lengthDuration = floor(log10(abs(maxUsageTime))) + 1;
	int lengthIDs = floor(log10(abs(numberRequests))) + 1;


	while ((fdRejected = open(REJECTED_FIFO, O_RDONLY)) == -1){
		if (errno == ENOENT)
			printf("REJECTED_FIFO '/tmp/rejeitados' not available \n");
		sleep(1);
	}

	printf("REJECTED_FIFO '/tmp/rejeitados' openned in READONLY mode\n");


	Request* request = malloc(sizeof(Request));

	while(read(fdRejected, request, sizeof(Request)) != 0){

		struct timeval tvalAfter;
		gettimeofday(&tvalAfter, NULL);
		double afterTime = tvalAfter.tv_sec * 1000000 + tvalAfter.tv_usec;

		if ( ++request->rejections < 3){

			write(FD_REQUESTS, request, sizeof(*request));

			fprintf(LOGS, "%.2f - %ld - %*u: %c - %*u - REJEITADO\n",
						(afterTime-STARTING_TIME) / 1000, gettid(), lengthIDs,request->id, request->gender, lengthDuration,request->duration);

			checkStats('r',request->gender);

		}

		else{
			fprintf(LOGS, "%.2f - %ld - %*u: %c - %*u - DESCARTADO\n",
					(afterTime-STARTING_TIME) / 1000, gettid(), lengthIDs,request->id, request->gender, lengthDuration,request->duration);

			checkStats('d',request->gender);
		}
	}


	free(request);

	return NULL;
}

void showStatistics(){
	printf("Number of Requests: %u \n 	"
			"Male: %u \n 	"
			"Female: %u \n "
			"Number of Rejections: %u \n 	"
			"Male: %u \n 	"
			"Female: %u \n "
			"Number of Discarded: %u \n 	"
			"Male: %u \n 	"
			"Female: %u \n ",
			stats.M_REQUESTS+stats.F_REQUESTS, stats.M_REQUESTS, stats.F_REQUESTS,
			stats.M_REJECTIONS+stats.F_REJECTIONS, stats.M_REJECTIONS, stats.F_REJECTIONS,
			stats.M_DISCARDED+stats.F_DISCARDED, stats.M_DISCARDED, stats.F_DISCARDED);
}


int main (int argc, char* argv[], char* envp[]){
	srand(time(NULL));

	struct timeval tvalBegin;
	gettimeofday(&tvalBegin, NULL);
	STARTING_TIME = tvalBegin.tv_sec * 1000000 + tvalBegin.tv_usec;

	printf("Starting Time: %d \n", (int) STARTING_TIME);

	if(argc != 3){
		printf("Wrong number of arguments \n.");
		exit(1);
	}

	unsigned int numberRequests;
	unsigned int maxUsageTime;

	if(checkVality(argv, numberRequests)){
			printf("Invalid number of orders. \n");
			exit(1);
		}

	if(checkVality(argv, maxUsageTime)){
			printf("Invalid usage time. \n");
			exit(1);
		}

	printf("Number of Orders: %d \nMaxUsage Time: %d \n", numberRequests, maxUsageTime);

	createOrdersFIFO();
	printf("REQUESTS_FIFO '/tmp/entrada' sucessfully created\n");


	char logsPath[32];
	sprintf(logsPath, "/tmp/ger.%d", getpid());
	if((LOGS = fopen(logsPath, "a")) == NULL){ // Opens a text file for writing in Appends mode. If it does not exist, then a new file is created.
		perror("Unable to create LOGS file");
		exit(1);
	}
	printf("LOGS file: %s created \n", logsPath);


	unsigned int data[] = {numberRequests, maxUsageTime};

	pthread_t requestsTID;
	pthread_t rejectedTID;


	pthread_create(&requestsTID, NULL, requestsThread, (void*) &data);
	pthread_create(&rejectedTID, NULL, rejectedThread, (void*) &data);

	pthread_join(requestsTID, NULL);
	pthread_join(rejectedTID, NULL);

	showStatistics();

	fclose(LOGS);
	close(FD_REQUESTS);

	if(unlink(REQUESTS_FIFO) < 0)
		printf("Error when destroying REQUESTS_FIFO '/tmp/entrada'\n");
	else
		printf("REQUESTS_FIFO '/tmp/entrada' has been destroyed \n");

	return 0;
}
