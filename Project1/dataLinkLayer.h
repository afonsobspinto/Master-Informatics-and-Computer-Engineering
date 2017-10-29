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
#define C_DISC 0x0B
#define T_FILE_SIZE 0
#define T_FILE_NAME 1
#define ESCAPE 0x7D
#define OCTETO0x20 0x20
#define FER_ERR_PROB 10
#define SEQUENCE_NUMBER_INDEX 2

static const char SET[5] = {FLAG, A, C_SET, A ^ C_SET, FLAG};
static const char UA[5] = {FLAG, A, C_UA, A ^ C_UA, FLAG};
static const char RR1[5] = {FLAG, A, C_UA, A ^ C_RR1, FLAG};
static const char RR0[5] = {FLAG, A, C_UA, A ^ C_RR0, FLAG};
static const char REJ0[5] = {FLAG, A, C_UA, A ^ C_REJ0, FLAG};
static const char REJ1[5] = {FLAG, A, C_UA, A ^ C_REJ1, FLAG};
static const char DISC[5] = {FLAG, A, C_DISC, A ^ C_DISC, FLAG};


struct termios oldtio, newtio;

void answer();
int openSerialPort(ApplicationLayer* applicationLayer, LinkLayer* linkLayer);
int setNewTermiosStructure(ApplicationLayer* applicationLayer, LinkLayer* linkLayer);
int readingArray(int fd, const char validation[]);
int readingFrame(int fd, LinkLayer* linkLayer);
int processingDataFrame(LinkLayer* linkLayer);
int llopen(ApplicationLayer* applicationLayer, LinkLayer* linkLayer);
int llopenTransmitter(ApplicationLayer* applicationLayer, LinkLayer* linkLayer);
int llopenReceiver(ApplicationLayer* applicationLayer, LinkLayer* linkLayer);
int llwrite(ApplicationLayer* applicationLayer, LinkLayer* linkLayer, unsigned char* buffer, int bufferSize);
int llread(ApplicationLayer* applicationLayer, LinkLayer* linkLayer);
unsigned char getBCC2(unsigned char *buffer, int bufferSize);
int stuffingFrame(LinkLayer* linkLayer, int bufferSize);
int destuffingFrame(LinkLayer* linkLayer);
int shiftFrame(LinkLayer* linkLayer, int i, int bufferSize, ORIENTATION orientation);
int llclose(ApplicationLayer* applicationLayer, LinkLayer* linkLayer);
int llcloseTransmitter(ApplicationLayer* applicationLayer, LinkLayer* linkLayer);
int llcloseReceiver(ApplicationLayer* applicationLayer, LinkLayer* linkLayer);

int initStatistics(Statistics* stats);
int errorProbability(int value);

#endif
