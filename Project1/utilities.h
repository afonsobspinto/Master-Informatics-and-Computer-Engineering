#ifndef UTILITIES_H
#define UTILITIES_H

#include <stdio.h>
#include "dataLinkLayer.h"

#define BAUDRATE_VALUES 19

extern const int validBaudRates[BAUDRATE_VALUES];
extern const char* validBaudRatesChar[BAUDRATE_VALUES];


int printUsage(const char *programName);
void showConnectionInfo(LinkLayer* linkLayer);
unsigned int getFileSize(char* fileName);
char* getBaudRateString(int baudRate);
void clearBuffer(FILE* fp);
unsigned int nDigits(int integer);

#endif
