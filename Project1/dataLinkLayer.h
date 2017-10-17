#ifndef DATALINKLAYER_H
#define DATALINKLAYER_H

#include <termios.h>

#define BAUDRATE B38400
#define NUMTRIES 3
#define TIMEOUT 3

#define FLAG 0x7E
#define A 0x03
#define C 0x03

#define MAX_SIZE 1000

struct termios oldtio, newtio;

int fd;

typedef struct {
  char port[20]; /*Device /dev/ttySx, x = 0, 1*/
  int baudRate; /*Transmission Speed*/
  unsigned int sequenceNumber;
  unsigned int timeout; /*Timer Value: 1 s*/
  unsigned int numTransmissions;  /*Num of tries in case of error*/

  char frame[MAX_SIZE];
} LinkLayer;

enum State {start, flagRCV, aRCV, cRCV, bccOK, stop};

static char SET[5] = {FLAG, A, C, A ^ C, FLAG};

int openSerialPort(char* serialPort);
int setNewTermiosStructure();
int llopenTransmitter(char* serialPort);
int llopenReceiver(char* serialPort);


#endif
