#ifndef DATALINKLAYER_H
#define DATALINKLAYER_H

#include <termios.h>
#include "utilities.h"

#define FLAG 0x7E
#define A 0x03
#define C 0x03

struct termios oldtio, newtio;

int openSerialPort(ApplicationLayer* applicationLayer, LinkLayer* linkLayer);
int setNewTermiosStructure(ApplicationLayer* applicationLayer, LinkLayer* linkLayer);
int llopenTransmitter(char* serialPort);
int llopenReceiver(char* serialPort);

#endif
