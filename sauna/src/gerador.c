#include <stdio.h>
#include <stdlib.h>
#include <sys/types.h>
#include <sys/stat.h>
#include <errno.h>
#include <unistd.h>

char* REQUESTS_FIFO = "/tmp/entrada";
char* REJECTEDS_FIFO = "/tmp/rejeitados";

void createOrdersFIFO(){
	if(mkfifo(REQUESTS_FIFO, S_IRUSR | S_IWUSR) < 0 // Permissions: User Read and User Write
			&& errno==EEXIST){
		perror("REQUESTS_FIFO '/tmp/entrada' already exists\n");
		exit(1);
	}
}

int main (int argc, char* argv[], char* envp[]){


	if(argc != 3){
		printf("Wrong number of arguments \n.");
		exit(1);
	}

	unsigned int numberOrders;
	unsigned int usageTime;

	if((numberOrders = atoi(argv[1])) == 0){
		printf("Invalid number of orders. \n");
		exit(1);
	}

	if((usageTime = atoi(argv[2])) == 0){
		printf("Invalid usage time. \n");
		exit(1);
	}

	printf("Number of Orders: %d \nUsage Time: %d \n", numberOrders, usageTime);

	createOrdersFIFO();
	printf("FIFO '/tmp/entrada' sucessfully created\n");



	unlink(REQUESTS_FIFO);
	printf("FIFO '/tmp/entrada' sucessfully deleted \n");

	return 0;


}
