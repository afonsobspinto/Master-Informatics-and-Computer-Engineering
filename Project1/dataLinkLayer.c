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

static int inducedError = 0;
static int increaseTProg = 0;

int numTries = 0;
int flagAlarm = 1;


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

  printf("appLayer: Serial Port Open. \n");

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

int readingArray(int fd, const char validation[]){

  unsigned char readChar;
  State state = start;
  int pos = 0;

  while(state != stop && !flagAlarm){
    if((read(fd, &readChar, 1))<0){
      printf("readingArray: Reading");
      return -1;
    }

    printf("%d == %d\n", (int) readChar, (int) validation[pos] );

    if(readChar==validation[pos]){
      pos++;
      state++;
    }
    else if(readChar == FLAG)
      state = flagRCV;
    else
      state = start;
  }

  if(state == stop){
      printf("readingArray: array read successfully \n");
      return 1;
  }
  else{
    printf("readingArray: array NOT read successfully \n");
    return 0;
  }

}

int readingFrame(int fd, LinkLayer* linkLayer){
  unsigned char readChar;
  State state = start;
  int size = 0;

    while(state != stop){ // TODO: you might get trapped in here forever
      if((read(fd, &readChar, 1))<0){
        perror("readingFrame: Reading");
        return -1;
      }

      switch (state) {
        case start:
          if(readChar == FLAG){
            linkLayer->frame[size++]=readChar;
            state++;
          }
        break;
        case flagRCV:
          if(readChar == A){
            linkLayer->frame[size++]=readChar;
            state++;
          }
          else if(readChar != FLAG){
            size = 0;
            state = start;
          }
        break;
        case aRCV:
          if(readChar == 0 || readChar == (1 << 6)){
            linkLayer->frame[size++]=readChar;
            state++;
          }
          else{
            size = 1;
            state = flagRCV;
          }
        break;
        case cRCV:
          if(readChar == (linkLayer->frame[1] ^ linkLayer->frame[2])){
            linkLayer->frame[size++]=readChar;
            state++;
          }
          else if(readChar == FLAG){
            size = 1;
            state = flagRCV;
          }
          else{
            size = 0;
            state = start;
          }
        break;
        case bccOK:
          linkLayer->frame[size++]=readChar;
          if(readChar == FLAG)
              state++;
        break;
        default:
          break;
      }
  }

  printf("readingFrame: frame read \n");
  return size;
}

int llopen(ApplicationLayer* applicationLayer, LinkLayer* linkLayers) {

  switch (applicationLayer->status) {
    case TRANSMITTER:
      return llopenTransmitter(applicationLayer, linkLayers);
    case RECEIVER:
      return llopenReceiver(applicationLayer, linkLayers);
  }
  return -1;
}

int llopenTransmitter(ApplicationLayer* applicationLayer, LinkLayer* linkLayer){
  (void) signal(SIGALRM, answer);  // installs routine which answers interruption
  int success = 0;

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
      success = 1;
      break;
      }
  }

  if(!success){
    printf("llopenTransmitter: UA not acknowledge.\n");
    return -1;
}


  return 0;
}

int llopenReceiver(ApplicationLayer* applicationLayer, LinkLayer* linkLayer){
  (void) signal(SIGALRM, answer);  // installs routine which answers interruption
  int success = 0;

  printf("llopenReceiver: start reading\n");

  while(numTries < linkLayer->numTransmissions && flagAlarm){
	  alarm(linkLayer->timeout * 2); // We want a bigger timeout in the start of the connection - logistic purposes
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

  //Add Header
  linkLayer->frame[0] = FLAG;
  linkLayer->frame[1] = A;
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
    if((write(applicationLayer->fileDescriptor, linkLayer->frame, frameSize)) < 0){
      perror("llwrite: Writing");
      return -1;
    }
    alarm(linkLayer->timeout);
    flagAlarm=0;


    printf("llwrite: Write Complete.\n");

    printf("llwrite: Start looking for confirmation in %d space \n", linkLayer->sequenceNumber);
    char temp[5];
    read(applicationLayer->fileDescriptor, temp, 5);

    if(linkLayer->sequenceNumber){
      if(temp[2] == C_REJ1)
      printf("llwrite: REJ1 received successfully.\n");
      else if(temp[2] == C_RR1){
        printf("llwrite: RR1 received successfully.\n");
        break;
      }
    }
    else{
      if(temp[2] == C_REJ0)
      printf("llwrite: REJ0 received successfully.\n");
      else if(temp[2] == C_RR0){
        printf("llwrite: RR0 received successfully.\n");
        break;
      }

    }
  //   if(linkLayer->sequenceNumber){
  //     if(readingArray(applicationLayer->fileDescriptor, RR1)){
  //       printf("llwrite: RR1 received successfully.\n");
  //       //linkLayer->stats->numReceivedRR++;
  //       break;
  //     }
  //     else if(readingArray(applicationLayer->fileDescriptor, REJ1)){
  //       printf("llwrite: REJ1 received.\n");
  //       //linkLayer->stats->numReceivedREJ++;
  //     }
  //   }
  //
  //   else{
  //     if(readingArray(applicationLayer->fileDescriptor, RR0)){
  //       printf("llwrite: RR0 received successfully.\n");
  //       //linkLayer->stats->numReceivedRR++;
  //       break;
  //     }
  //
  //     else if(readingArray(applicationLayer->fileDescriptor, REJ0)){
  //       printf("llwrite: REJ0 received.\n");
  //       //linkLayer->stats->numReceivedREJ++;
  //     }
  //   }
  }

  if(numTries == linkLayer->numTransmissions)
    return -1;

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

int processingDataFrame(LinkLayer* linkLayer){

  if(linkLayer->frame[0] != FLAG)
    return -1;

  if(linkLayer->frame[1] != A)
    return -1;

  if(linkLayer->frame[2] != 0 && linkLayer->frame[2] != (1<<6))
    return -1;

  if(linkLayer->frame[3] != (linkLayer->frame[1] ^ linkLayer->frame[2]))
    return -1;

  if(inducedError){
    if(errorProbability(FER_ERR_PROB))
      return -1;
  }

  if(increaseTProg){
    usleep(rand() % 10);
  }

  return 0;
}

int llread(ApplicationLayer* applicationLayer, LinkLayer* linkLayer){

  numTries = 0;
  flagAlarm = 1;

  int size = readingFrame(applicationLayer->fileDescriptor, linkLayer);

  if (numTries == linkLayer->numTransmissions)
    return -1;

  size = destuffingFrame(linkLayer);

  if(processingDataFrame(linkLayer)<0){
    printf("llread: processingDataFrame failed \n"); return -1;
  }

  printf("llread: Read Complete \n");
  return size;
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
  printf("llcloseTramsitter: Disconecting\n");

  numTries = 0;
  flagAlarm = 1;

  while(numTries < linkLayer->numTransmissions && flagAlarm){
    if((write(applicationLayer->fileDescriptor, DISC, sizeof(DISC))) < 0){
      printf("llcloseTramsitter: Writing DISC Error \n");
      return -1;
    }
    printf("llcloseTramsitter: sent DISC\n");
    alarm(linkLayer->timeout);
    flagAlarm=0;
    if(readingArray(applicationLayer->fileDescriptor, DISC)){
      printf("llcloseTramsitter: DISC received successfully.\n");
      break;
    }
  }


  if(numTries == linkLayer->numTransmissions){
    perror("llcloseReceiver: DISC was NOT received successfully");
    return -1;
  }
  printf("llcloseTramsitter: sent UA\n");
  if((write(applicationLayer->fileDescriptor, UA, sizeof(UA))) < 0){
    printf("llcloseTramsitter: Writing UA error \n");
    return -1;
  }

  printf("llcloseTramsitter: Disconnected.\n");
  return 0;
}


int llcloseReceiver(ApplicationLayer* applicationLayer, LinkLayer* linkLayer){
  numTries = 0;
  flagAlarm = 1;

  printf("llcloseReceiver: Disconecting\n");

  while(numTries < linkLayer->numTransmissions && flagAlarm){
	  alarm(linkLayer->timeout);
	  flagAlarm=0;
	  if(readingArray(applicationLayer->fileDescriptor, DISC)){
	    printf("llcloseReceiver: DISC received successfully.\n");
	    break;
	    }
  }

  if(numTries == linkLayer->numTransmissions){
  	perror("llcloseReceiver: DISC was NOT received successfully");
  	return -1;
  }

  numTries = 0;
  flagAlarm = 1;

  while(numTries < linkLayer->numTransmissions && flagAlarm){
    if((write(applicationLayer->fileDescriptor, DISC, sizeof(DISC))) < 0){
      printf("llcloseReceiver: Writing DISC Error \n");
      return -1;
    }
    printf("llcloseReceiver: sent DISC\n");
    alarm(linkLayer->timeout);
    flagAlarm=0;
    if(readingArray(applicationLayer->fileDescriptor, UA)){
      printf("llcloseReceiver: UA received successfully.\n");
      break;
    }
  }

  if(numTries == linkLayer->numTransmissions){
    printf("llcloseReceiver: UA NOT received successfully.\n");
    return -1;
  }
  printf("llcloseReceiver: Disconnected.\n");

  return 0;
}

Statistics* initStatistics(){
  Statistics* stats = (Statistics*) malloc(sizeof(Statistics));

  stats->numSentRR = 0;
  stats->numReceivedRR = 0;

  stats->numSentREJ = 0;
  stats->numReceivedREJ = 0;

  return stats;
}

int errorProbability(int value) {
	int num = rand() % 100;
	return num < value;
}
