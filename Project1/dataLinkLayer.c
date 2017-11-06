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



int numTries = 0;
int flagAlarm = 1;


void alarmHandler(){ //answers alarm

  printf("Timeout #%d\n", numTries + 1);
  flagAlarm=1;
  numTries++;

}

int installHandler(){
	struct sigaction sigact;
	memset(&sigact, 0, sizeof sigact);
	sigact.sa_handler = &alarmHandler;
	return sigaction(SIGALRM, &sigact, NULL);
}

void linkLayerInit(LinkLayer *linkLayer){
  linkLayer->fileDescriptor = -1;
  linkLayer->mode = -1;
  linkLayer->port = "/dev/ttyS0";
  linkLayer->baudRate = B38400;
  linkLayer->timeout = 3;
  linkLayer->numTransmissions = 3;
  linkLayer->dataSize = 255;

  linkLayer->sequenceNumber = 0;

  linkLayer->fileName = "pinguim.gif";
  linkLayer->fileSize = 10968;

  linkLayer->numSentRR = 0;
  linkLayer->numReceivedRR = 0;
  linkLayer->numSentREJ = 0;
  linkLayer->numReceivedREJ = 0;
  linkLayer->numTimeouts = 0;

  linkLayer->induceError = 0;
  linkLayer->increaseTProg = 0;

  linkLayer->frame = malloc(linkLayer->dataSize);
}


int openSerialPort(LinkLayer* linkLayer) {

  /*
  Open serial port device for reading and writing and not as controlling tty
  because we don't want to get killed if linenoise sends CTRL-C.
  */

  linkLayer->fileDescriptor = open(linkLayer->port, O_RDWR | O_NOCTTY );
  if (linkLayer->fileDescriptor <0) {printf("Open Serial Port Error"); return -1; }

  if (DEBUG_MODE)
  printf("appLayer: Serial Port Open. \n");

  return linkLayer->fileDescriptor;
}


int setNewTermiosStructure(LinkLayer* linkLayer){

  if ( tcgetattr(linkLayer->fileDescriptor,&oldtio) == -1) { /* save current port settings */
    printf("setNewTermiosStructure: tcgetattr error");
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


  tcflush(linkLayer->fileDescriptor, TCIOFLUSH);

  if ( tcsetattr(linkLayer->fileDescriptor,TCSANOW,&newtio) == -1) {
    printf("setNewTermiosStructure: tcsetattr error");
    exit(-1);
  }

  if (DEBUG_MODE)
  printf("setNewTermiosStructure: New termios structure set\n");
  return 0;
}

int readingArray(int fd, const char validation[]){

  unsigned char readChar;
  State state = START;
  int pos = 0;

  while(state != STOP && !flagAlarm){
    if((read(fd, &readChar, 1))<0){
      printf("readingArray: Reading Error");
      return -1;
    }

    if(readChar==validation[pos]){
      pos++;
      state++;
    }
    else if(readChar == FLAG)
      state = FLAG_RCV;
    else
      state = START;
  }

  if(state == STOP){
      if (DEBUG_MODE)
        printf("readingArray: array read successfully \n");
      return 1;
  }
  else{
    if (DEBUG_MODE)
      printf("readingArray: array NOT read successfully \n");
    return 0;
  }

}

int readingFrame(int fd, LinkLayer* linkLayer){
  unsigned char readChar;
  State state = START;
  int size = 0;

    while(state != STOP){ // TODO: you might get trapped in here forever
      if((read(fd, &readChar, 1))<0){
        printf("readingFrame: Reading Error");
        return -1;
      }

      switch (state) {
        case START:
          if(readChar == FLAG){
            linkLayer->frame[size++]=readChar;
            state++;
          }
        break;
        case FLAG_RCV:
          if(readChar == A_TRANSMITTER){
            linkLayer->frame[size++]=readChar;
            state++;
          }
          else if(readChar != FLAG){
            size = 0;
            state = START;
          }
        break;
        case A_RCV:
          if(readChar == 0 || readChar == (1 << 6)){
            linkLayer->frame[size++]=readChar;
            state++;
          }
          else{
            size = 1;
            state = FLAG_RCV;
          }
        break;
        case C_RCV:
          if(readChar == (linkLayer->frame[1] ^ linkLayer->frame[2])){
            linkLayer->frame[size++]=readChar;
            state++;
          }
          else if(readChar == FLAG){
            size = 1;
            state = FLAG_RCV;
          }
          else{
            size = 0;
            state = START;
          }
        break;
        case BCC_OK:
          linkLayer->frame[size++]=readChar;
          if(readChar == FLAG)
              state++;
        break;
        default:
          break;
      }
  }

  if (DEBUG_MODE)
    printf("readingFrame: frame read \n");
  return size;
}

int llopen(LinkLayer* linkLayer) {

  switch (linkLayer->mode) {
    case TRANSMITTER:
      return llopenTransmitter(linkLayer);
    case RECEIVER:
      return llopenReceiver(linkLayer);
  }
  return -1;
}

int llopenTransmitter(LinkLayer* linkLayer){
  installHandler();
  int success = 0;

  while(numTries < linkLayer->numTransmissions && flagAlarm){
    if((write(linkLayer->fileDescriptor, SET, sizeof(SET))) < 0){
      printf("llopenTransmitter: Writing error");
      return -1;
    }
    if (DEBUG_MODE)
      printf("llopenTransmitter: sent SET\n");

    alarm(linkLayer->timeout);
    flagAlarm=0;

    if(readingArray(linkLayer->fileDescriptor, UA)){
      if (DEBUG_MODE)
        printf("llopenTransmitter: UA received successfully.\n");
      success = 1;
      break;
      }
  }

  if(!success){
    if (DEBUG_MODE)
    printf("llopenTransmitter: UA not acknowledge.\n");
    return -1;
}

  alarm(0);
  return 0;
}

int llopenReceiver(LinkLayer* linkLayer){
  installHandler();
  int success = 0;

  if (DEBUG_MODE)
    printf("llopenReceiver: START reading\n");

  while(numTries < linkLayer->numTransmissions && flagAlarm){
	  alarm(linkLayer->timeout);
	  flagAlarm=0;
	  if(readingArray(linkLayer->fileDescriptor, SET)){
      if (DEBUG_MODE)
        printf("llopenReceiver: SET received successfully.\n");
	    success = 1;
	    break;
	    }
  }

  if(!success){
    if (DEBUG_MODE)
  	 printf("llopenReceiver: SET was NOT received successfully");
  	return -1;
  }

  if((write(linkLayer->fileDescriptor, UA, sizeof(UA)))<0){
    printf("llopenReceiver: Writing error");
    return -1;
  }
  if (DEBUG_MODE)
    printf("llopenReceiver: sent UA\n");

  alarm(0);
  return 0;
}


int llwrite(LinkLayer* linkLayer, unsigned char* buffer, int bufferSize){

  //Add Header
  linkLayer->frame[0] = FLAG;
  linkLayer->frame[1] = A_TRANSMITTER;
  linkLayer->frame[2] = linkLayer->sequenceNumber << 6;
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
    if((write(linkLayer->fileDescriptor, linkLayer->frame, frameSize)) < 0){
        printf("llwrite: Writing error");
        return -1;
    }
    alarm(linkLayer->timeout);
    flagAlarm=0;

    if (DEBUG_MODE)
    printf("llwrite: Write Complete.\n");

    char temp[5];
    read(linkLayer->fileDescriptor, temp, 5);

    if(linkLayer->sequenceNumber){
      if(temp[2] == C_REJ1){
        if (DEBUG_MODE)
          printf("llwrite: REJ1 received successfully.\n");
        linkLayer->numReceivedREJ++;
        }
      else if(temp[2] == C_RR1){
        if (DEBUG_MODE)
            printf("llwrite: RR1 received successfully.\n");
        linkLayer->numReceivedRR++;
        break;
        }
      }
    else{
      if(temp[2] == C_REJ0){
        if (DEBUG_MODE)
          printf("llwrite: REJ0 received successfully.\n");
        linkLayer->numReceivedREJ++;
      }
      else if(temp[2] == C_RR0){
        if (DEBUG_MODE)
          printf("llwrite: RR0 received successfully.\n");
        linkLayer->numReceivedRR++;
        break;
        }
      }
  }

  if(numTries == linkLayer->numTransmissions)
    return -1;

  alarm(0);
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
        linkLayer->frame[i] = (FLAG ^ OCTETO0x20);
      }
      else if(linkLayer->frame[i] == ESCAPE){
        i++;
        shiftFrame(linkLayer, i, bufferSize, RIGHT);
        bufferSize++;
        linkLayer->frame[i] = (ESCAPE ^ OCTETO0x20);
      }
    }
    if(DEBUG_MODE)
    printf("stuffingFrame: stuffing ready \n");

    return bufferSize;
}

int destuffingFrame(LinkLayer* linkLayer){

  int i = 1;

  while (1) {
    if (linkLayer->frame[i] == FLAG)
      break;

    else if (linkLayer->frame[i] == ESCAPE && linkLayer->frame[i + 1] == (FLAG ^ OCTETO0x20)) {
      linkLayer->frame[i] = FLAG;
      shiftFrame(linkLayer, i, 0, 1);
    }

    else if (linkLayer->frame[i] == ESCAPE && linkLayer->frame[i + 1] == (ESCAPE ^ OCTETO0x20)) {
      shiftFrame(linkLayer, i, 0, 1);
    }

    i++;
  }

  if(DEBUG_MODE)
  printf("destuffingFrame: destuffing ready \n");

  return i;
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


int llread(LinkLayer* linkLayer){

  numTries = 0;
  flagAlarm = 1;

  int size = readingFrame(linkLayer->fileDescriptor, linkLayer);

  if (numTries == linkLayer->numTransmissions)
    return -1;

  size = destuffingFrame(linkLayer);

  // if(processingDataFrame(linkLayer)<0){
  //   if(DEBUG_MODE){
  //     printf("llread: processingDataFrame failed \n"); return -1;}
  // }

  if(DEBUG_MODE)
    printf("llread: Read Complete \n");
  return size;
}


int llclose(LinkLayer* linkLayer) {


  switch (linkLayer->mode) {
    case TRANSMITTER:
      return llcloseTransmitter(linkLayer);
    case RECEIVER:
      return llcloseReceiver(linkLayer);
  }

  printf("llclose: unexpected behaviour\n");
  return -1;
}

int llcloseTransmitter(LinkLayer* linkLayer){
  if(DEBUG_MODE)
  printf("llcloseTramsitter: Disconecting\n");

  numTries = 0;
  flagAlarm = 1;

  while(numTries < linkLayer->numTransmissions && flagAlarm){
    if((write(linkLayer->fileDescriptor, DISC, sizeof(DISC))) < 0){
      if(DEBUG_MODE)
      printf("llcloseTramsitter: Writing DISC Error \n");
      return -1;
    }
    if(DEBUG_MODE)
    printf("llcloseTramsitter: sent DISC\n");
    alarm(linkLayer->timeout);
    flagAlarm=0;
    if(readingArray(linkLayer->fileDescriptor, DISC)){
      if(DEBUG_MODE)
      printf("llcloseTramsitter: DISC received successfully.\n");
      break;
    }
  }


  if(numTries == linkLayer->numTransmissions){
    if(DEBUG_MODE)
    printf("llcloseReceiver: DISC was NOT received successfully");
    return -1;
  }
  if(DEBUG_MODE)
  printf("llcloseTramsitter: sent UA\n");
  if((write(linkLayer->fileDescriptor, UA, sizeof(UA))) < 0){
    if(DEBUG_MODE)
      printf("llcloseTramsitter: Writing UA error \n");
    return -1;
  }

  printf("Disconnected!\n");
  alarm(0);
  return 0;
}


int llcloseReceiver(LinkLayer* linkLayer){
  numTries = 0;
  flagAlarm = 1;

  if(DEBUG_MODE)
  printf("llcloseReceiver: Disconecting\n");

  while(numTries < linkLayer->numTransmissions && flagAlarm){
	  alarm(linkLayer->timeout);
	  flagAlarm=0;
	  if(readingArray(linkLayer->fileDescriptor, DISC)){
      if(DEBUG_MODE)
	     printf("llcloseReceiver: DISC received successfully.\n");
	    break;
	    }
  }

  if(numTries == linkLayer->numTransmissions){
    if(DEBUG_MODE)
  	 printf("llcloseReceiver: DISC was NOT received successfully");
  	return -1;
  }

  numTries = 0;
  flagAlarm = 1;
  alarm(0);

  while(numTries < linkLayer->numTransmissions && flagAlarm){
    if((write(linkLayer->fileDescriptor, DISC, sizeof(DISC))) < 0){
      printf("llcloseReceiver: Writing DISC Error \n");
      return -1;
    }
    if(DEBUG_MODE)
      printf("llcloseReceiver: sent DISC\n");

    alarm(linkLayer->timeout);
    flagAlarm=0;
    if(readingArray(linkLayer->fileDescriptor, UA)){
      if(DEBUG_MODE)
        printf("llcloseReceiver: UA received successfully.\n");
      break;
    }
  }

  if(numTries == linkLayer->numTransmissions){
    if(DEBUG_MODE)
      printf("llcloseReceiver: UA NOT received successfully.\n");
    return -1;
  }

  printf("Disconnected!\n");

  alarm(0);
  return 0;
}

int errorProbability(int value) {
	int num = rand() % 100;
	return num < value;
}
