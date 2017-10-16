#ifndef DATALINKLAYER_H
#define DATALINKLAYER_H

#include <termios.h>

#define BAUDRATE B38400

int fd;
struct termios oldtio, newtio;

int openSerialPort(char* serialPort);
int setNewTermiosStructure();



#endif
