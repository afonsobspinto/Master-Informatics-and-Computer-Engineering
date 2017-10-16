#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <unistd.h>

#include "appLayer.h"

int main(int argc, char **argv) {

  char serialPort[255];
  enum USE use;

  if ((argc != 3) ||
    ((strcmp("/dev/ttyS0", argv[1])!=0) &&
    (strcmp("/dev/ttyS1", argv[1])!=0)) ) {
      printf("Usage: <SerialPort> <USE> \n"); // /dev/ttyS1 1
      exit(1);
    }

  strcat(serialPort, argv[1]);

  /*
  Read = 0;
  Write = 1;
  */

  if ((strcmp("1", argv[2]) == 0)) {
    printf("Write Mode. \n");
    use = WRITE;
  }
  else if ((strcmp("0", argv[2]) == 0)) {
    printf("Read Mode. \n");
    use = READ;
  }
  else{
    printf("<USE> must be 0 or 1 \n"); // /dev/ttyS1 1
    exit(1);
  }


  printf("SerialPort: %s\n", serialPort);
  sleep(1);

  return 0;
}
