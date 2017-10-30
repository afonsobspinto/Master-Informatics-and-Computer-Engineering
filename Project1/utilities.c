#include <stdio.h>
#include <sys/types.h>
#include <sys/stat.h>
#include <unistd.h>
#include "utilities.h"

int getFileName(char *filename){

  printf("Enter file path : ");
  scanf("%s", filename);

  return 0;
}

int getFileSize(FILE *fd){
  struct stat s;
  if (fstat(fileno(fd), &s) == -1) {
    return (-1);
  }
  return (s.st_size);
}

int getInput(int min, int max) {

	int input;
	int flag = 0;

	while (!flag) {
		if (scanf("%d", &input) == 1 && input >= min && input <= max)
			flag = 1;
		else{
			printf("Invalid input.\n");
			getInput(min,max);
		}
	}

	return input;
}


void userInteraction(LinkLayer* linkLayer){
	printf("Timeout Time? (0 - 10) ");
	linkLayer->timeout = getInput(0, 10);
	printf("\n");
	printf("Number of tries? (0 - 10) ");
	linkLayer->numTransmissions = getInput(0, 10);
	printf("\n");
  printf("Induced Error? (0 -> No 1 -> Yes) ");
  inducedError = getInput(0, 1);
  printf("\n");
  printf("Increase TProg? (0 -> No 1 -> Yes) ");
  increaseTProg = getInput(0, 1);
  printf("\n");
}
