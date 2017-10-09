/*Non-Canonical Input Processing*/

#include <sys/types.h>
#include <sys/stat.h>
#include <fcntl.h>
#include <termios.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <signal.h>
#include <unistd.h> // for close

#define BAUDRATE B38400
#define MODEMDEVICE "/dev/ttyS1"
#define _POSIX_SOURCE 1 /* POSIX compliant source */
#define FALSE 0
#define TRUE 1

#define FLAG 0x7E
#define A 0x03
#define C 0x03

int flagAlarme=1, conta=1;

void atende()                   // atende alarme
{
	printf("alarme # %d\n", conta);
	flagAlarme=1;
	conta++;
}

enum State {start, flagRCV, aRCV, cRCV, bccOK, stop};

int changeState(enum State* state, unsigned char readChar, unsigned char* ua);

int main(int argc, char** argv)
{
    int fd,res;
	int over = 0;
    struct termios oldtio,newtio;
	(void) signal(SIGALRM, atende);  // instala  rotina que atende interrupcao

    unsigned char SET[5];
    unsigned char UA[5];

    enum State actualState;
    actualState = start;


    if ( (argc < 2) ||
  	     ((strcmp("/dev/ttyS0", argv[1])!=0) &&
  	      (strcmp("/dev/ttyS1", argv[1])!=0) )) {
      printf("Usage:\tnserial SerialPort\n\tex: nserial /dev/ttyS1\n");
      exit(1);
    }

    /**
     Init the SET buffer
     **/

    SET[0] = FLAG;
    SET[1] = A;
    SET[2] = C;
    SET[3] = SET[1]^SET[2];
    SET[4] = FLAG;

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

    newtio.c_cc[VTIME]    = 10;   /* inter-character timer unused */
    newtio.c_cc[VMIN]     = 0;   /* blocking read until 1 chars received */


    tcflush(fd, TCIOFLUSH);

    if ( tcsetattr(fd,TCSANOW,&newtio) == -1) {
      perror("tcsetattr");
      exit(-1);
    }

    printf("New termios structure set\n");

	while (conta < 4 && flagAlarme == 1) {
    //Write to serial port
    res = write(fd,SET,sizeof(SET));
    printf("%d bytes written\n", res);
    if(res == -1){
      perror("Error on Writing");
      exit(1);
    }

      alarm(3);                 // activa alarme de 3s
      flagAlarme=0;
	
   // sleep(1);

    //read from serial port
    unsigned char readChar;
    while(actualState!=stop && flagAlarme==0) {
	
      res = read(fd,&readChar,1);

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
}
    if ( tcsetattr(fd,TCSANOW,&oldtio) == -1) {
      perror("tcsetattr");
      exit(-1);
    }


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
		flagAlarme = 0;
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
