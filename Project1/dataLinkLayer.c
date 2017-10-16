#include "dataLinkLayer.h"

int openSerialPort(char* serialPort) {

  /*
  Open serial port device for reading and writing and not as controlling tty
  because we don't want to get killed if linenoise sends CTRL-C.
  */

  fd = open(serialPort, O_RDWR | O_NOCTTY );
  if (fd <0) {perror(serialPort); return -1; }
  
  return fd;
}
