#ifndef APPLAYER_H
#define APPLAYER_H

#include "dataLinkLayer.h"
#include "utilities.h"


#define CTRL_PACKET_DATA 1
#define CTRL_PACKET_START 2
#define CTRL_PACKET_END 3

int appLayer(ApplicationLayer* applicationLayer, LinkLayer* linkLayer);

int sendData(ApplicationLayer* applicationLayer, LinkLayer* linkLayer);
int receiveData(ApplicationLayer* applicationLayer, LinkLayer* linkLayer);
int sendControlPackage(int controlField, FileData file, ApplicationLayer* applicationLayer, LinkLayer* linkLayer);
int sendDataPackage(int N, char* buffer, int length, ApplicationLayer* applicationLayer, LinkLayer* linkLayer);


#endif
