#ifndef DATALINKLAYER_H
#define DATALINKLAYER_H

#include <termios.h>
#include "utilities.h"

#define FLAG 0x7E
#define A 0x03
#define C_SET 0x03
#define C_UA 0x07
#define C_REJ0 0x01
#define C_REJ1 0x01
#define C_RR0 0x05
#define C_RR1 0x85
#define T_FILE_SIZE 0
#define T_FILE_NAME 1
#define ESCAPE 0x7D
#define OCTETO0x20 0x20

struct termios oldtio, newtio;

void answer();
int openSerialPort(ApplicationLayer* applicationLayer, LinkLayer* linkLayer);
int setNewTermiosStructure(ApplicationLayer* applicationLayer, LinkLayer* linkLayer);
int readingArray(int fd, char validation[]);
int llopen(ApplicationLayer* applicationLayer, LinkLayer* linkLayer);
int llopenTransmitter(ApplicationLayer* applicationLayer, LinkLayer* linkLayer);
int llopenReceiver(ApplicationLayer* applicationLayer, LinkLayer* linkLayer);
int llwrite(ApplicationLayer* applicationLayer, LinkLayer* linkLayer, unsigned char* buffer, int bufferSize);
unsigned char getBCC2(unsigned char *buffer, int bufferSize);
int stuffingFrame(LinkLayer* linkLayer, int bufferSize);
int shiftFrame(LinkLayer* linkLayer, int i, int bufferSize, ORIENTATION orientation);

#endif
