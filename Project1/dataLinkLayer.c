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
#include "appLayer.h"

int fd;

int openSerialPort(char* serialPort) {

  /*
  Open serial port device for reading and writing and not as controlling tty
  because we don't want to get killed if linenoise sends CTRL-C.
  */

  fd = open(serialPort, O_RDWR | O_NOCTTY );
  if (fd <0) {perror(serialPort); return -1; }

  return fd;
}
