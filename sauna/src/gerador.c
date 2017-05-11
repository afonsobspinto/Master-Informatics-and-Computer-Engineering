#include <stdio.h>
#include <stdlib.h>
#include <sys/types.h>
#include <sys/stat.h>
#include <errno.h>
#include <unistd.h>

char* createOrdersFIFO(){
	char* ordersFIFO = "/tmp/entrada";
	if(mkfifo(ordersFIFO, S_IRUSR | S_IWUSR)<0  && errno==EEXIST){// Permissions: User Read and User Write
		perror("FIFO '/tmp/entrada' already exists\n");
		exit(1);
	}
	return ordersFIFO;
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

	char *orderFifo = createOrdersFIFO();



	unlink(orderFifo);

	return 0;


}
