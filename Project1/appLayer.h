#ifndef APPLAYER_H
#define APPLAYER_H

#include "dataLinkLayer.h"

enum USAGE { SEND, RECEIVE };

int appLayer(char* serialPort, enum USAGE usage);


#endif
