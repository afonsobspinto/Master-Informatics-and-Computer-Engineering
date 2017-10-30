#ifndef UTILITIES_H
#define UTILITIES_H

#define MAX_SIZE 255

typedef enum {start, flagRCV, aRCV, cRCV, bccOK, stop} State;
typedef enum { TRANSMITTER, RECEIVER } STATUS;
typedef enum { RIGHT, LEFT } ORIENTATION;



typedef struct {
  int fileDescriptor; /*Descritor correspondente à porta série*/
  STATUS status; /*TRANSMITTER | RECEIVER*/
}ApplicationLayer;

typedef struct {
  char port[20]; /*Device /dev/ttySx, x = 0, 1*/
  int baudRate; /*Transmission Speed*/
  unsigned int sequenceNumber;
  unsigned int timeout; /*Timer Value: 1 s*/
  unsigned int numTransmissions;  /*Num of tries in case of error*/
  unsigned char frame[MAX_SIZE];
	int numSentRR;
	int numReceivedRR;
	int numSentREJ;
	int numReceivedREJ;
} LinkLayer;

typedef struct {
  unsigned int size;
  char name[MAX_SIZE];
} FileData;


int getFileName(char *filename);
int getFileSize(FILE *fd);

#endif
