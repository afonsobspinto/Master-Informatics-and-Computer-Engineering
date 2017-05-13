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

#define gettid() syscall(SYS_gettid)


#include "request.h"

FILE* LOGS;
char* REQUESTS_FIFO = "/tmp/entrada";
char* REJECTED_FIFO = "/tmp/rejeitados";
double STARTING_TIME;

int M_REQUESTS, F_REQUESTS;
int M_REJECTIONS, F_REJECTIONS;
int M_DISCARDED, F_DISCARDED;



void createOrdersFIFO(){
	if(mkfifo(REQUESTS_FIFO, S_IRUSR | S_IWUSR) < 0 // Permissions: User Read and User Write
			&& errno==EEXIST){
		perror("REQUESTS_FIFO '/tmp/entrada' already exists\n");
		exit(1);
	}
}


void* requestsThread(void* arg){

	//int fdRequests = open(REQUESTS_FIFO,O_WRONLY);
	unsigned int numberRequests =  ((int *)arg)[0];
	unsigned int maxUsageTime = ((int *)arg)[1];
	int lengthDuration = floor(log10(abs(maxUsageTime))) + 1;
	int lengthIDs = floor(log10(abs(numberRequests))) + 1;


	unsigned int i;


//	if(fdRequests == -1){
//		 printf("REQUESTS_FIFO '/tmp/entrada' could not be openned in WRITEONLY mode\n");
//		 exit(1);
//	}

	printf("REQUESTS_FIFO '/tmp/entrada' openned in WRITEONLY mode\n");



	for(i=0; i < numberRequests; i++){
		Request* request = malloc(sizeof(Request));

		generate(request, maxUsageTime);

		printf("p%d | %c | t%d | ...  \n",request->id, request->gender, request->duration);

		//write(fdRequests, &request, sizeof(request));

		struct timeval tvalAfter;
		gettimeofday(&tvalAfter, NULL);
		double afterTime = tvalAfter.tv_sec * 1000000 + tvalAfter.tv_usec;


		fprintf(LOGS, "%.2f - %ld - %*u: %c - %*u - PEDIDO\n",
				(afterTime-STARTING_TIME) / 1000, gettid(), lengthIDs,request->id, request->gender, lengthDuration,request->duration);

	}

	//close(fdRequests);

	return NULL;

}

void* rejectedThread(void* arg){

	int fdRejected;

	unsigned int numberRequests =  ((int *)arg)[0];
	unsigned int maxUsageTime = ((int *)arg)[1];
	int lengthDuration = floor(log10(abs(maxUsageTime))) + 1;
	int lengthIDs = floor(log10(abs(numberRequests))) + 1;


//	while ((fdRejected = open(REJECTED_FIFO, O_RDONLY)) == -1){
//		if (errno == ENOENT)
//			printf("REJECTED_FIFO '/tmp/rejeitados' not available \n");
//		sleep(1);
//	}

	printf("REJECTED_FIFO '/tmp/rejeitados' openned in READONLY mode\n");


	Request* request = malloc(sizeof(Request));

//	while(read(fdRejected, request, sizeof(Request)) != 0){
//
//		struct timeval tvalAfter;
//		gettimeofday(&tvalAfter, NULL);
//		double afterTime = tvalAfter.tv_sec * 1000000 + tvalAfter.tv_usec;
//
//		if ( ++request->rejections < 3){
//			fprintf(LOGS, "%.2f - %ld - %*u: %c - %*u - REJEITADO\n",
//								(afterTime-STARTING_TIME) / 1000, gettid(), lengthIDs,request->id, request->gender, lengthDuration,request->duration);
//			write(REQUESTS_FIFO, request, sizeof(*request));
//		}
//
//		else
//			fprintf(LOGS, "%.2f - %ld - %*u: %c - %*u - DESCARTADO\n",
//					(afterTime-STARTING_TIME) / 1000, gettid(), lengthIDs,request->id, request->gender, lengthDuration,request->duration);
//	}


	free(request);

	return NULL;
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

	if((numberRequests = atoi(argv[1])) == 0){
		printf("Invalid number of orders. \n");
		exit(1);
	}

	if((maxUsageTime = atoi(argv[2])) == 0){
		printf("Invalid usage time. \n");
		exit(1);
	}

	printf("Number of Orders: %d \nMaxUsage Time: %d \n", numberRequests, maxUsageTime);

	createOrdersFIFO();
	printf("REQUESTS_FIFO '/tmp/entrada' sucessfully created\n");


	char logsPath[32];
	sprintf(logsPath, "/tmp/ger.%d", getpid());
	if((LOGS = fopen(logsPath, "w")) == NULL){ // Opens a text file for writing. If it does not exist, then a new file is created.
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


	if(unlink(REQUESTS_FIFO) < 0)
		printf("Error when destroying REQUESTS_FIFO '/tmp/entrada'\n");
	else
		printf("REQUESTS_FIFO '/tmp/entrada' has been destroyed \n");

	return 0;


}
