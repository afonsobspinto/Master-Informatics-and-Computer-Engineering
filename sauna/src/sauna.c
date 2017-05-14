#include <stdio.h>
#include <stdlib.h>

typedef struct {
        unsigned int ocupation;
        unsigned int capacity;
        char gender;
} Sauna;


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




	return 0;
}
