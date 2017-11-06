#ifndef DATALINKLAYER_H
#define DATALINKLAYER_H

#include <termios.h>

#define MAX_SIZE 256
#define SEQUENCE_NUMBER_INDEX 2
#define FLAG 0x7E
#define A_TRANSMITTER 0x03
#define A_RECEIVER 0x01
#define C_SET 0x03
#define C_UA 0x07
#define C_DISC 0x0B
#define C_REJ0 0x01
#define C_REJ1 0x81
#define C_RR0 0x05
#define C_RR1 0x85
#define C_DATA(S) ((S) << 5)
#define ESCAPE 0x7D
#define OCTETO0x20 0x20

static const char SET[5] = {FLAG, A_TRANSMITTER, C_SET, A_TRANSMITTER ^ C_SET, FLAG};
static const char UA[5] = {FLAG, A_TRANSMITTER, C_UA, A_TRANSMITTER ^ C_UA, FLAG};
static const char RR1[5] = {FLAG, A_TRANSMITTER, C_RR1, A_TRANSMITTER ^ C_RR1, FLAG};
static const char RR0[5] = {FLAG, A_TRANSMITTER, C_RR0, A_TRANSMITTER ^ C_RR0, FLAG};
static const char REJ0[5] = {FLAG, A_TRANSMITTER, C_REJ0, A_TRANSMITTER ^ C_REJ0, FLAG};
static const char REJ1[5] = {FLAG, A_TRANSMITTER, C_REJ1, A_TRANSMITTER ^ C_REJ1, FLAG};
static const char DISC[5] = {FLAG, A_TRANSMITTER, C_DISC, A_TRANSMITTER ^ C_DISC, FLAG};

extern const int DEBUG_MODE;
extern int numTries;
extern int flagAlarm;


typedef enum { TRANSMITTER, RECEIVER } Mode;
typedef enum { SUPERVISION_FRAME, DATA_FRAME } FrameType;
typedef enum { START, FLAG_RCV, A_RCV, C_RCV, BCC_OK, STOP} State;
typedef enum { RIGHT, LEFT } ORIENTATION;

typedef struct {
  /*Connection Data */
  int fileDescriptor;
  Mode mode; /*TRANSMITTER | RECEIVER*/
  char* port;
  int baudRate; /*Transmission Speed*/
  unsigned int timeout; /*Timer Value*/
  unsigned int numTransmissions;  /*Num of tries in case of error*/
  unsigned int dataSize;

  /*Connection Helpers*/
  unsigned int sequenceNumber;

  /*FIle Data*/
  char* fileName;
  unsigned int fileSize;

  /* Statistics */
	unsigned int numSentRR;
	unsigned int numReceivedRR;
	unsigned int numSentREJ;
	unsigned int numReceivedREJ;
  unsigned int numTimeouts;

  /*Error Induction*/
  unsigned int induceError;
  unsigned int increaseTProg;

  //frame
   unsigned char* frame;
} LinkLayer;



struct termios oldtio, newtio;

void answer();
int openSerialPort(LinkLayer* linkLayer);
int setNewTermiosStructure(LinkLayer* linkLayer);
int readingArray(int fd, const char validation[]);
int readingFrame(int fd, LinkLayer* linkLayer);
int processingDataFrame(LinkLayer* linkLayer);
int llopen(LinkLayer* linkLayer);
int llopenTransmitter(LinkLayer* linkLayer);
int llopenReceiver(LinkLayer* linkLayer);
int llwrite(LinkLayer* linkLayer, unsigned char* buffer, int bufferSize);
int llread(LinkLayer* linkLayer);
unsigned char getBCC2(unsigned char *buffer, int bufferSize);
int stuffingFrame(LinkLayer* linkLayer, int bufferSize);
int destuffingFrame(LinkLayer* linkLayer);
int shiftFrame(LinkLayer* linkLayer, int i, int bufferSize, ORIENTATION orientation);
int llclose(LinkLayer* linkLayer);
int llcloseTransmitter(LinkLayer* linkLayer);
int llcloseReceiver(LinkLayer* linkLayer);

int errorProbability(int value);
void linkLayerInit(LinkLayer *linkLayer);

#endif
