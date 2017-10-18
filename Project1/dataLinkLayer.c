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
char SET[5] = {FLAG, A, C, A ^ C, FLAG};
char UA[5] = {FLAG, A, C, A ^ C, FLAG};

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

  newtio.c_cc[VTIME]    = 0;   /* inter-character timer unused */
  newtio.c_cc[VMIN]     = 1;   /* blocking read until 1 chars received */


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

  while(state != stop){
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

  return 1; //True
}

int llopenTransmitter(ApplicationLayer* applicationLayer, LinkLayer* linkLayer){
  int res;
  (void) signal(SIGALRM, answer);  // installs routine which answers interruption

  while(numTries < linkLayer->numTransmissions && flagAlarm){
    if((res = write(applicationLayer->fileDescriptor, SET, sizeof(SET))) < 0){
      perror("llopenTransmitter: Writing");
      exit(-1);
    }
    printf("llopenTransmitter: sent SET\n");
    alarm(linkLayer->timeout);
    flagAlarm=0;
    if(readingArray(applicationLayer->fileDescriptor, UA)) //TODO: UA should be equal to SET right?
      printf("llopenTransmitter: UA received successfully.\n");
    break;
  }

  return 0;
}

int llopenReceiver(ApplicationLayer* applicationLayer, LinkLayer* linkLayer){
  int res;

  if(readingArray(applicationLayer->fileDescriptor, SET))
    printf("llopenReceiver: SET received successfully.\n");

  if((res = write(applicationLayer->fileDescriptor, UA, sizeof(UA)))<0){
    perror("llopenTransmitter: Writing");
    exit(-1);
  }

  return 0;
}
