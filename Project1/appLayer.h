#ifndef APPLAYER_H
#define APPLAYER_H

#include "dataLinkLayer.h"
#include "utilities.h"


#define CTRL_PACKET_DATA 1
#define CTRL_PACKET_START 2
#define CTRL_PACKET_END 3

int appLayer(ApplicationLayer* applicationLayer, LinkLayer* linkLayer, FileData* file);

int sendData(ApplicationLayer* applicationLayer, LinkLayer* linkLayer, FileData* file);
int receiveData(ApplicationLayer* applicationLayer, LinkLayer* linkLayer, FileData* file);
int sendControlPackage(int controlField, FileData* file, ApplicationLayer* applicationLayer, LinkLayer* linkLayer);
int sendDataPackage(char* buffer, int N, int length, ApplicationLayer* applicationLayer, LinkLayer* linkLayer);
int receiveControlPackage(int* controlPackageType, FileData* file, ApplicationLayer* applicationLayer, LinkLayer* linkLayer);
int receiveDataPackage(int* N, char** buf, int* length, ApplicationLayer* applicationLayer, LinkLayer* linkLayer);

void showStats(LinkLayer* linkLayer, FileData* fileData, double timeElapsed);


#endif
