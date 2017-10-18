
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

int appLayer(ApplicationLayer* applicationLayer, LinkLayer* linkLayer){

  if (openSerialPort(applicationLayer, linkLayer) == -1) {
    perror("Error Opening Serial Port \n");
    exit(-1);
  }

  if (setNewTermiosStructure(applicationLayer, linkLayer) == -1) {
    perror("Error Setting New Termios \n");
    exit(-1);
  }

  llopen(linkLayer->port, applicationLayer->status);

  return 0;
}

int llopen(char* serialPort, STATUS status) {

  switch (status) {
    case TRANSMITTER:
      llopenTransmitter(serialPort);
      break;
    case RECEIVER:
      llopenReceiver(serialPort);
      break;
  }


  return 1;
}
