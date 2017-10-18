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

void answer(){

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
    perror("tcgetattr");
    return -1;
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
    perror("tcsetattr");
    return -1;
  }

  printf("New termios structure set\n");
  return 0;
}


int llopenTransmitter(char* serialPort){

  (void) signal(SIGALRM, answer);  // installs routine which answers interruption

  return 0;
}


int llopenReceiver(char* serialPort){

  (void) signal(SIGALRM, answer);  // installs routine which answers interruption

  return 0;
}
