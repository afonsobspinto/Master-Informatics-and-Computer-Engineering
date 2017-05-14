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
static int FD_REJECTED;
static Stats stats = {0,0,0,0,0,0};

static pthread_mutex_t mutex = PTHREAD_MUTEX_INITIALIZER;


void createOrdersFIFO(){
	if(mkfifo(REQUESTS_FIFO, S_IRUSR | S_IWUSR) < 0 // Permissions: User Read and User Write
			&& errno==EEXIST){
		perror("REQUESTS_FIFO '/tmp/entrada' already exists\n");
		exit(1);
	}

	printf("REQUESTS_FIFO '/tmp/entrada' sucessfully created\n");
}

void updateStatsAndLogs(char type, Request* request){

	struct timeval tvalAfter;
	gettimeofday(&tvalAfter, NULL);
	double afterTime = tvalAfter.tv_sec * 1000000 + tvalAfter.tv_usec;

	char* tip;

	if(request->gender == 'M'){
		switch(type){
		case 'p':
			stats.M_REQUESTS++;
			tip = "PEDIDO";
			break;
		case 'r':
			stats.M_REJECTIONS++;
			tip = "REJEITADO";
			break;
		case 'd':
			stats.M_DISCARDED++;
			tip = "DESCARTADO";
			break;
		}
	}
	else {
		switch(type){
		case 'p':
			stats.F_REQUESTS++;
			tip = "PEDIDO";
			break;
		case 'r':
			stats.F_REJECTIONS++;
			tip = "REJEITADO";
			break;
		case 'd':
			stats.F_DISCARDED++;
			tip = "DESCARTADO";
			break;
		}
	}
	fprintf(LOGS, "%.2f - %d - %*u: %c - %*u - %s\n",
			(afterTime-STARTING_TIME) / 1000, getpid(), LENGTHIDS,request->id, request->gender, LENGTHDURATION,request->duration, tip);

}

void openCommunications(){

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

	while ((FD_REJECTED = open(REJECTED_FIFO, O_RDONLY)) == -1){
		if (errno == ENOENT)
			printf("REJECTED_FIFO '/tmp/rejeitados' not available \n");
		sleep(1);
	}

	printf("REJECTED_FIFO '/tmp/rejeitados' openned in READONLY mode\n");

}


void* requestsThread(void* arg){

	unsigned int numberRequests =  ((int *)arg)[0];
	unsigned int maxUsageTime = ((int *)arg)[1];


	unsigned int i;


	for(i=0; i < numberRequests; i++){
		pthread_mutex_lock(&mutex);
		Request* request = malloc(sizeof(Request));

		generate(request, maxUsageTime);

		printf("p%d | %c | t%d | ...  \n",request->id, request->gender, request->duration);

		updateStatsAndLogs('p',request);

		write(FD_REQUESTS, &request, sizeof(request));

		free(request);
		pthread_mutex_unlock(&mutex);

	}

	close(FD_REQUESTS);

	return NULL;

}

void* rejectedThread(void* arg){

	Request* request = malloc(sizeof(Request));

	while(read(FD_REJECTED, request, sizeof(Request)) != 0){

		 pthread_mutex_lock(&mutex);

		if (request->rejections < 3){

			write(FD_REQUESTS, request, sizeof(*request));

			updateStatsAndLogs('r',request);

		}

		else
			updateStatsAndLogs('d',request);

		 pthread_mutex_unlock(&mutex);
	}

	free(request);

	return NULL;
}

void geradorManagement(void *arg){

	openCommunications();

	pthread_t requestsTID;
	pthread_t rejectedTID;

	pthread_create(&requestsTID, NULL, requestsThread, arg);
	pthread_create(&rejectedTID, NULL, rejectedThread, NULL);

	pthread_join(requestsTID, NULL);
	pthread_join(rejectedTID, NULL);


	close(FD_REJECTED);

}

void showStatistics(){
	printf("Number of Requests: %u \n 	"
			"Male: %u \n 	"
			"Female: %u \n"
			"Number of Rejections: %u \n 	"
			"Male: %u \n 	"
			"Female: %u \n"
			"Number of Discarded: %u \n 	"
			"Male: %u \n 	"
			"Female: %u \n",
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

	int numberRequests;
	int maxUsageTime;

	if(!checkVality(argv[1], &numberRequests)){
			printf("Invalid number of orders. \n");
			exit(1);
		}

	if(!checkVality(argv[2], &maxUsageTime)){
			printf("Invalid usage time. \n");
			exit(1);
		}

	printf("Number of Orders: %d \nMaxUsage Time: %d \n", numberRequests, maxUsageTime);

	LENGTHDURATION = floor(log10(abs(maxUsageTime))) + 1;
	LENGTHIDS = floor(log10(abs(numberRequests))) + 1;

	createOrdersFIFO();

	char logsPath[32];
	sprintf(logsPath, "/tmp/ger.%d", getpid());
	if((LOGS = fopen(logsPath, "a")) == NULL){ // Opens a text file for writing in Appends mode. If it does not exist, then a new file is created.
		perror("Unable to create LOGS file");
		exit(1);
	}
	printf("LOGS file: %s created \n", logsPath);


	unsigned int data[] = {numberRequests, maxUsageTime};

	geradorManagement((void*) &data);

	showStatistics();

	fclose(LOGS);

	if(unlink(REQUESTS_FIFO) < 0)
		printf("Error when destroying REQUESTS_FIFO '/tmp/entrada'\n");
	else
		printf("REQUESTS_FIFO '/tmp/entrada' has been destroyed \n");

	return 0;
}
