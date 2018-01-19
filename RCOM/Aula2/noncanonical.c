/*Non-Canonical Input Processing*/

#include <sys/types.h>
#include <sys/stat.h>
#include <fcntl.h>
#include <termios.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <unistd.h> /* To use read function */

#define BAUDRATE B38400
#define _POSIX_SOURCE 1 /* POSIX compliant source */
#define FALSE 0
#define TRUE 1

#define FLAG 0x7E
#define A 0x03
#define C 0x03

enum State {start, flagRCV, aRCV, cRCV, bccOK, stop};

int changeState(enum State* state, unsigned char readChar, unsigned char* ua);

int main(int argc, char** argv)
{
    int fd, res;
    struct termios oldtio,newtio;

    unsigned char UA[5];
    enum State actualState;
    actualState = start;

    if ( (argc < 2) ||
  	     ((strcmp("/dev/ttyS0", argv[1])!=0) &&
  	      (strcmp("/dev/ttyS1", argv[1])!=0))){
      printf("Usage:\tnserial SerialPort\n\tex: nserial /dev/ttyS1\n");
      exit(1);
    }


  /*
    Open serial port device for reading and writing and not as controlling tty
    because we don't want to get killed if linenoise sends CTRL-C.
  */


    fd = open(argv[1], O_RDWR | O_NOCTTY );
    if (fd <0) {perror(argv[1]); exit(-1); }

    if ( tcgetattr(fd,&oldtio) == -1) { /* save current port settings */
      perror("tcgetattr");
      exit(-1);
    }

    bzero(&newtio, sizeof(newtio));
    newtio.c_cflag = BAUDRATE | CS8 | CLOCAL | CREAD;
    newtio.c_iflag = IGNPAR;
    newtio.c_oflag = 0;

    /* set input mode (non-canonical, no echo,...) */
    newtio.c_lflag = 0;

    newtio.c_cc[VTIME]    = 0;   /* inter-character timer unused */
    newtio.c_cc[VMIN]     = 1;   /* blocking read until 1 chars received */

    tcflush(fd, TCIOFLUSH);

    if ( tcsetattr(fd,TCSANOW,&newtio) == -1) {
      perror("tcsetattr");
      exit(-1);
    }

    printf("New termios structure set\n");

    unsigned char readChar;
    while (actualState!=stop) {       /* loop for input */
      res = read(fd,&readChar,1);   /* returns after 1 chars have been input */

      if (res == -1) {
        perror("Error on reading");
        exit(-1);
      }
      if(changeState(&actualState, readChar, &UA)!=0){
        perror("Error on changing state.");
        exit(-1);
      }

      printf("read byte: 0x%x\n", readChar);
      printf("changed to state = %d\n",actualState);

    }
    printf("UA received successfully.\n");
    printf("Retrieving UA.\n");

    res = write(fd,UA,sizeof(UA));
    if(res == -1){
      perror("Error on Writing");
      exit(1);
    }
    sleep(1);


    tcsetattr(fd,TCSANOW,&oldtio);
    close(fd);
    return 0;
}

int changeState(enum State* state, unsigned char readChar, unsigned char* UA){

  switch (*state) {

    case start:{
      if(readChar == FLAG){
        UA[*state] = readChar;
        (*state)++;
      }
      return 0;
    }

    case flagRCV:{
      if(readChar == A){
        UA[*state] = readChar;
        (*state)++;
      }
      else if (readChar!=FLAG)
        *state = start;

      return 0;
    }

    case aRCV:{
      if(readChar == C){
        UA[*state] = readChar;
        (*state)++;
      }
      else if (readChar==FLAG)
        (*state)--;
      else
        *state = start;

      return 0;
    }

    case cRCV:{
      if(readChar == UA[1]^UA[2]){
        UA[*state] = readChar;
        (*state)++;
      }
      else if (readChar==FLAG)
        *state = flagRCV;
      else
        *state = start;

      return 0;
    }

    case bccOK:{
      if(readChar == FLAG){
        UA[*state] = readChar;
        (*state)++;
      }
      else
        *state = start;
      return 0;
    }

    default:
      return -1;

  }

  return -1;
}
