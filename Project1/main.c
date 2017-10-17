#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <unistd.h>

#include "appLayer.h"

int main(int argc, char **argv) {

  ApplicationLayer applicationLayer;
  LinkLayer linkLayer;


  if ((argc != 3) ||
    ((strcmp("/dev/ttyS0", argv[1])!=0) &&
    (strcmp("/dev/ttyS1", argv[1])!=0)) ) {
      perror("STATUS: <serial port> <STATUS> \n"); // /dev/ttyS1 1
      exit(1);
    }

  strcpy(linkLayer.port, argv[1]);

  /*
  Read = 0;
  Write = 1;
  */

  if ((strcmp("1", argv[2]) == 0)) {
    printf("Write Mode. \n");
    applicationLayer.status = TRANSMITTER;
  }
  else if ((strcmp("0", argv[2]) == 0)) {
    printf("Read Mode. \n");
    applicationLayer.status = RECEIVER;
  }
  else{
    perror("<STATUS> must be 0 or 1 \n"); // /dev/ttyS1 1
    exit(1);
  }

  printf("SerialPort: %s\n", linkLayer.port);
  sleep(1);

  //appLayer(serialPort, status);

  return 0;
}
