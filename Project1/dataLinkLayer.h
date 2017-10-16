#ifndef DATALINKLAYER_H
#define DATALINKLAYER_H

#include <termios.h>

#define BAUDRATE B38400
#define NUMTRIES 3
#define TIMEOUT 3

int fd;
struct termios oldtio, newtio;

int openSerialPort(char* serialPort);
int setNewTermiosStructure();
int llopenSender(char* serialPort);
int llopenReceiver(char* serialPort);


#endif
