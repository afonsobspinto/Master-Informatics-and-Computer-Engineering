#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <unistd.h>

#include "appLayer.h"

int main(int argc, char **argv) {

  char serialPort[255];
  enum USAGE usage;

  if ((argc != 3) ||
    ((strcmp("/dev/ttyS0", argv[1])!=0) &&
    (strcmp("/dev/ttyS1", argv[1])!=0)) ) {
      perror("Usage: <serial port> <usage> \n"); // /dev/ttyS1 1
      exit(1);
    }

  strcat(serialPort, argv[1]);

  /*
  Read = 0;
  Write = 1;
  */

  if ((strcmp("1", argv[2]) == 0)) {
    printf("Write Mode. \n");
    usage = SEND;
  }
  else if ((strcmp("0", argv[2]) == 0)) {
    printf("Read Mode. \n");
    usage = RECEIVE;
  }
  else{
    perror("<usage> must be 0 or 1 \n"); // /dev/ttyS1 1
    exit(1);
  }

  printf("SerialPort: %s\n", serialPort);
  sleep(1);

  //appLayer(serialPort, usage);

  return 0;
}
