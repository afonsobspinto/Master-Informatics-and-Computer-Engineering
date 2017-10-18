
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
    perror("appLayer: openSerialPort \n");
    exit(-1);
  }

  if (setNewTermiosStructure(applicationLayer, linkLayer) == -1) {
    perror("appLayer: setNewTermiosStructure \n");
    exit(-1);
  }

  llopen(applicationLayer, linkLayer);

  return 0;
}

int llopen(ApplicationLayer* applicationLayer, LinkLayer* linkLayers) {

  switch (applicationLayer->status) {
    case TRANSMITTER:
      llopenTransmitter(applicationLayer, linkLayers);
      break;
    case RECEIVER:
      llopenReceiver(applicationLayer, linkLayers);
      break;
  }


  return 1;
}
