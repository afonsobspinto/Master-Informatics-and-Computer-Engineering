#include <unistd.h>
#include <math.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include "dataLinkLayer.h"
#include "interaction.h"
#include "utilities.h"

void userInteraction(LinkLayer* linkLayer){
    linkLayer->mode = getMode();
    linkLayer->port = getPort();
    linkLayer->baudRate = getBaudRate();
    linkLayer->timeout = getIntInput(0,10, "Timeout? (0 - 10)");
    linkLayer->numTransmissions = getIntInput(0,10, "Tries? (0 - 10)");
    linkLayer->dataSize = getFrameSize();
    linkLayer->induceError = getIntInput(0,100, "Induce Errors Probability? (0 - 100)");
    linkLayer->increaseTProg = getIntInput(0,1, "Increse Propagation Time? (0 -> No 1 -> Yes)");

    if(linkLayer->mode == TRANSMITTER){
      linkLayer->fileName = getFileName();
      linkLayer->fileSize = getFileSize(linkLayer->fileName);
      }

}


int getIntInput(int min, int max, char* message) {
	int input;
  int valid;

  do {
    printf("%s\n", message);
    valid = scanf("%d", &input);
    clearBuffer(stdin);
  } while(valid <= 0 || input < min || input > max);

	return input;
}

Mode getMode(){

  char* mode = malloc(sizeof(char) * 16);

  do {
    printf("Mode? (transmitter/receiver)\n");
    scanf("%s", mode);
  } while(strcmp(mode, "transmitter") != 0 && strcmp(mode, "receiver")!=0);


  if(strcmp(mode,"transmitter") == 0)
    return TRANSMITTER;

  return RECEIVER;

}

char* getPort(){

  char* port = malloc(sizeof(char) * 16);

  do {
    printf("Port? (/dev/ttyS0 / /dev/ttyS1)\n");
    scanf("%s", port);
  } while(strcmp(port, "/dev/ttyS0") != 0 && strcmp(port, "/dev/ttyS1") != 0);

  return port;

}


int getBaudRate(){ //TODO: change this
  int option;
  int i;

  for(i = 0; i < BAUDRATE_VALUES; i++){
    printf("%d: %s\n", i+1, validBaudRatesChar[i]);
  }

  option = getIntInput(1, 19, "BaudRate? (1-19)");

	return validBaudRates[option-1];
}

int getFrameSize(){
  int option;
  int i;

  for(i = 0; i < 10; i++){
    printf("%d: %d bytes\n", i, (int) pow(2, i+5));
  }

  option = getIntInput(0, 9, "Frame Size? (0-9)");

	return pow(2, option+5);
}


char* getFileName(){

  char* fileName = malloc(sizeof(char) * 128);

  do {
    printf("File Name?\n");
    scanf("%s", fileName);
  } while(access(fileName,F_OK) != 0);

  return fileName;
}
