#include <stdio.h>
#include <sys/stat.h>
#include <sys/types.h>
#include <fcntl.h>
#include <termios.h>
#include <stdlib.h>
#include <string.h>
#include <signal.h>
#include <unistd.h>
#include "dataLinkLayer.h"

static int numTries = 0;
static int flagAlarm = 1;
char SET[5] = {FLAG, A, C_SET, A ^ C_SET, FLAG};
char UA[5] = {FLAG, A, C_UA, A ^ C_UA, FLAG};
char RR1[5] = {FLAG, A, C_UA, A ^ C_RR1, FLAG};
char RR0[5] = {FLAG, A, C_UA, A ^ C_RR0, FLAG};
char DISC[5] = {FLAG, A, C_DISC, A ^ C_DISC, FLAG};

void answer(){ //answers alarm

  printf("answer: alarm # %d\n", numTries);
  flagAlarm=1;
  numTries++;

}


int openSerialPort(ApplicationLayer* applicationLayer, LinkLayer* linkLayer) {

  /*
  Open serial port device for reading and writing and not as controlling tty
  because we don't want to get killed if linenoise sends CTRL-C.
  */

  applicationLayer->fileDescriptor = open(linkLayer->port, O_RDWR | O_NOCTTY );
  if (applicationLayer->fileDescriptor <0) {perror(linkLayer->port); return -1; }

  return applicationLayer->fileDescriptor;
}


int setNewTermiosStructure(ApplicationLayer* applicationLayer, LinkLayer* linkLayer){

  if ( tcgetattr(applicationLayer->fileDescriptor,&oldtio) == -1) { /* save current port settings */
    perror("setNewTermiosStructure: tcgetattr");
    exit(-1);
    }

  bzero(&newtio, sizeof(newtio));
  newtio.c_cflag = linkLayer->baudRate | CS8 | CLOCAL | CREAD;
  newtio.c_iflag = IGNPAR;
  newtio.c_oflag = 0;

  /* set input mode (non-canonical, no echo,...) */
  newtio.c_lflag = 0;

  newtio.c_cc[VTIME]    = 10;   /* inter-character timer unused */
  newtio.c_cc[VMIN]     = 0;   /* blocking read until 1 chars received */


  tcflush(applicationLayer->fileDescriptor, TCIOFLUSH);

  if ( tcsetattr(applicationLayer->fileDescriptor,TCSANOW,&newtio) == -1) {
    perror("setNewTermiosStructure: tcsetattr");
     exit(-1);
  }

  printf("setNewTermiosStructure: New termios structure set\n");
  return 0;
}

int readingArray(int fd, char validation[]){

  unsigned char readChar;
  State state = start;
  int pos = 0;
  int res;

  while(state != stop && !flagAlarm){
    if((res= read(fd, &readChar, 1))<0){
      perror("readingArray: Reading");
      exit(-1);
    }


    if(readChar==validation[pos]){
      pos++;
      state++;
    }
    else if(readChar == FLAG)
      state = flagRCV;
    else
      state = start;
  }

  if(state == stop)
  	return 1;
  else
  	return 0;
}

int llopen(ApplicationLayer* applicationLayer, LinkLayer* linkLayers) {

  switch (applicationLayer->status) {
    case TRANSMITTER:
      llopenTransmitter(applicationLayer, linkLayers);
      break;
    case RECEIVER:
      llopenReceiver(applicationLayer, linkLayers);
      break;
  }
  return 0;
}

int llopenTransmitter(ApplicationLayer* applicationLayer, LinkLayer* linkLayer){
  (void) signal(SIGALRM, answer);  // installs routine which answers interruption

  while(numTries < linkLayer->numTransmissions && flagAlarm){
    if((write(applicationLayer->fileDescriptor, SET, sizeof(SET))) < 0){
      perror("llopenTransmitter: Writing");
      exit(-1);
    }
    printf("llopenTransmitter: sent SET\n");
    alarm(linkLayer->timeout);
    flagAlarm=0;
    if(readingArray(applicationLayer->fileDescriptor, UA)){
      printf("llopenTransmitter: UA received successfully.\n");
      break;
      }
  }

  return 0;
}

int llopenReceiver(ApplicationLayer* applicationLayer, LinkLayer* linkLayer){
  (void) signal(SIGALRM, answer);  // installs routine which answers interruption
  int success = 0;

  printf("llopenReceiver: start reading\n");

  while(numTries < linkLayer->numTransmissions && flagAlarm){
	  alarm(linkLayer->timeout);
	  flagAlarm=0;
	  if(readingArray(applicationLayer->fileDescriptor, SET)){
	    printf("llopenReceiver: SET received successfully.\n");
	    success = 1;
	    break;
	    }
  }

  if(!success){
  	perror("llopenReceiver: SET was NOT received successfully");
  	exit(-1);
  }

  if((write(applicationLayer->fileDescriptor, UA, sizeof(UA)))<0){
    perror("llopenReceiver: Writing");
    exit(-1);
  }
  printf("llopenReceiver: sent UA\n");

  return 0;
}


int llwrite(ApplicationLayer* applicationLayer, LinkLayer* linkLayer, unsigned char* buffer, int bufferSize){

  (void) signal(SIGALRM, answer);  // installs routine which answers interruption

  //Add Header
  linkLayer->frame[0] = FLAG;
  linkLayer->frame[1] = A;
  linkLayer->frame[2] = linkLayer->sequenceNumber;
  linkLayer->frame[3] = linkLayer->frame[1] ^ linkLayer->frame[2];

  //Add Data
  memcpy(&linkLayer->frame[4], buffer, bufferSize);

  //Get and Add BCC2
  linkLayer->frame[bufferSize + 4] = getBCC2(buffer, bufferSize);

  //Add end Flag
  linkLayer->frame[bufferSize + 5] = FLAG;

  int frameSize = stuffingFrame(linkLayer, bufferSize + 6);

  numTries = 0;
  flagAlarm = 1;

  while(numTries < linkLayer->numTransmissions && flagAlarm){
    if((write(applicationLayer->fileDescriptor, linkLayer->frame, frameSize)) < 0){
      perror("llwrite: Writing");
      exit(-1);
    }
    alarm(linkLayer->timeout);
    flagAlarm=0;

    if(linkLayer->sequenceNumber){
      if(readingArray(applicationLayer->fileDescriptor, RR1)){
        printf("llwrite: RR1 received successfully.\n");
        linkLayer->stats->numReceivedRR++;
        break;
      }
    }
    else{
      if(readingArray(applicationLayer->fileDescriptor, RR0)){
        printf("llwrite: RR0 received successfully.\n");
        linkLayer->stats->numReceivedRR++;
        break;
      }
    }

    linkLayer->stats->numReceivedREJ++;
  }

  return 0;

}


unsigned char getBCC2(unsigned char *buffer, int bufferSize) {
  unsigned char BCC = 0;

  int i = 0;
  for (; i < bufferSize; i++) {
    BCC ^= buffer[i];
  }

  return BCC;
}

int stuffingFrame(LinkLayer* linkLayer, int bufferSize){

    int i;
    for (i = 1; i < bufferSize-1; i++){
      if(linkLayer->frame[i] == FLAG){
        linkLayer->frame[i] = ESCAPE;
        i++;
        shiftFrame(linkLayer, i, bufferSize, RIGHT);
        bufferSize++;
        linkLayer->frame[i] = FLAG ^ OCTETO0x20;
      }
      else if(linkLayer->frame[i] == ESCAPE){
        i++;
        shiftFrame(linkLayer, i, bufferSize, RIGHT);
        bufferSize++;
        linkLayer->frame[i] = ESCAPE ^ OCTETO0x20;
      }
    }

    return bufferSize;
}


int shiftFrame(LinkLayer* linkLayer, int i, int bufferSize, ORIENTATION orientation){
  if(orientation == RIGHT){
    bufferSize--;
    for(; bufferSize>=i; bufferSize--)
      linkLayer->frame[bufferSize+1] = linkLayer->frame[bufferSize];
  }

  else if(orientation == LEFT){
    int over = 0;
    i++;
    do{
      linkLayer->frame[i] = linkLayer->frame[i+1];
      i++;
      if(linkLayer->frame[i] == FLAG) {over = 1;}

    }while (!over);
  }

  return 0;
}

int llread(ApplicationLayer* applicationLayer, LinkLayer* linkLayer, unsigned char** buffer){
  //TODO:
  return 0;
}

int llclose(ApplicationLayer* applicationLayer, LinkLayer* linkLayers) {

  switch (applicationLayer->status) {
    case TRANSMITTER:
      llcloseTransmitter(applicationLayer, linkLayers);
      break;
    case RECEIVER:
      llcloseReceiver(applicationLayer, linkLayers);
      break;
  }
  return 0;
}

int llcloseTransmitter(ApplicationLayer* applicationLayer, LinkLayer* linkLayer){
  (void) signal(SIGALRM, answer);  // installs routine which answers interruption
  printf("llcloseTramsitter: Disconecting\n");

  numTries = 0;
  flagAlarm = 1;

  while(numTries < linkLayer->numTransmissions && flagAlarm){
    if((write(applicationLayer->fileDescriptor, DISC, sizeof(DISC))) < 0){
      perror("llcloseTramsitter: Writing DISC");
      exit(-1);
    }
    printf("llcloseTramsitter: sent DISC\n");
    alarm(linkLayer->timeout);
    flagAlarm=0;
    if(readingArray(applicationLayer->fileDescriptor, DISC)){
      printf("llcloseTramsitter: DISC received successfully.\n");
      break;
    }
  }

  if((write(applicationLayer->fileDescriptor, UA, sizeof(UA))) < 0){
    perror("llcloseTramsitter: Writing UA");
    exit(-1);
  }

  printf("llcloseTramsitter: Disconnected.\n");
  return 0;
}


int llcloseReceiver(ApplicationLayer* applicationLayer, LinkLayer* linkLayer){
  (void) signal(SIGALRM, answer);  // installs routine which answers interruption
  int success = 0;
  numTries = 0;
  flagAlarm = 1;

  printf("llcloseReceiver: Disconecting\n");

  while(numTries < linkLayer->numTransmissions && flagAlarm){
	  alarm(linkLayer->timeout);
	  flagAlarm=0;
	  if(readingArray(applicationLayer->fileDescriptor, DISC)){
	    printf("llcloseReceiver: DISC received successfully.\n");
	    success = 1;
	    break;
	    }
  }

  if(!success){
  	perror("llcloseReceiver: DISC was NOT received successfully");
  	exit(-1);
  }

  if((write(applicationLayer->fileDescriptor, UA, sizeof(UA)))<0){
    perror("llcloseReceiver: Writing");
    exit(-1);
  }
  printf("llcloseReceiver: sent UA\n");
  printf("llcloseReceiver: Disconnected.\n");

  return 0;
}

int initStatistics(Statistics* stats){
  stats = (Statistics*) malloc(sizeof(Statistics));

  stats->numSentRR = 0;
  stats->numReceivedRR = 0;

  stats->numSentREJ = 0;
  stats->numReceivedREJ = 0;

  return 0;
}

int errorProbability(int value) {
	int num = rand() % 100;
	return num < value;
}
