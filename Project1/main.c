#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <unistd.h>
#include <time.h>
#include "appLayer.h"

int main(int argc, char **argv) {

  srand(time(NULL));

  ApplicationLayer* applicationLayer = malloc(sizeof(ApplicationLayer));
  LinkLayer* linkLayer = malloc(sizeof(LinkLayer));
  FileData* file = malloc(sizeof(FileData));

  linkLayer->baudRate = B38400;
  linkLayer->timeout = 1;
  linkLayer->numTransmissions = 3;
  linkLayer->sequenceNumber = 0;
  initStatistics(linkLayer->stats);


  if ((argc != 3) ||
    ((strcmp("/dev/ttyS0", argv[1])!=0) &&
    (strcmp("/dev/ttyS1", argv[1])!=0)) ) {
      perror("STATUS: <serial port> <STATUS> \n"); // /dev/ttyS1 1
      exit(1);
    }

  strcpy(linkLayer->port, argv[1]);

  /*
  Read = 0;
  Write = 1;
  */

  if ((strcmp("1", argv[2]) == 0)) {
    printf("Write Mode. \n");
    applicationLayer->status = TRANSMITTER;
  }
  else if ((strcmp("0", argv[2]) == 0)) {
    printf("Read Mode. \n");
    applicationLayer->status = RECEIVER;
  }
  else{
    perror("<STATUS> must be 0 or 1 \n"); // /dev/ttyS1 1
    exit(1);
  }

  printf("SerialPort: %s\n", linkLayer->port);
  sleep(1);


  clock_t tic = clock();

  appLayer(applicationLayer, linkLayer, file);

  clock_t toc = clock();

  double timeElapsed = (double)(toc - tic) / CLOCKS_PER_SEC;

  showStats(linkLayer, file, timeElapsed);

  return 0;
}
