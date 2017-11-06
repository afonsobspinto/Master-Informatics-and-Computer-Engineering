#ifndef INTERACTION_H
#define INTERACTION_H

#include "dataLinkLayer.h"

void userInteraction(LinkLayer* linkLayer);
int getIntInput(int min, int max, char* message);
Mode getMode();
char* getPort();
int getBaudRate();
int getFrameSize();
char* getFileName();

#endif
