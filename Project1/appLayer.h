#ifndef APPLAYER_H
#define APPLAYER_H

enum USAGE { SEND, RECEIVE };


int appLayer(char *SerialPort, enum USAGE usage);


#endif
