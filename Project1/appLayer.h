#ifndef APPLAYER_H
#define APPLAYER_H

#include "dataLinkLayer.h"
#include "utilities.h"

int appLayer(ApplicationLayer* applicationLayer, LinkLayer* linkLayer);
int llopen(ApplicationLayer* applicationLayer, LinkLayer* linkLayer);

#endif
