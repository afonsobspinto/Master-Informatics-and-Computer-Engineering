#ifndef APPLAYER_H
#define APPLAYER_H

#include "dataLinkLayer.h"

typedef enum { TRANSMITTER, RECEIVER } STATUS;

typedef struct {
  int fileDescriptor; /*Descritor correspondente à porta série*/
  STATUS status; /*TRANSMITTER | RECEIVER*/
}ApplicationLayer;

int appLayer(char* serialPort, STATUS status);
int llopen(char* serialPort, STATUS status);


#endif
