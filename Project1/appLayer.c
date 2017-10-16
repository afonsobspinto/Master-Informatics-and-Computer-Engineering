
#include <stdio.h>
#include <sys/stat.h>
#include <sys/types.h>
#include <fcntl.h>
#include <termios.h>
#include <stdlib.h>
#include <string.h>
#include <signal.h>
#include <unistd.h>

#include "dataLinkLayer.h"
#include "appLayer.h"

int appLayer(char* serialPort, enum USAGE usage){

  if (openSerialPort(serialPort) == -1) {
    perror("Error Opening Serial Port \n");
    exit(-1);
  }

  if (setNewTermiosStructure() == -1) {
    perror("Error Setting New Termios \n");
    exit(-1);
  }


  return 0;
}
