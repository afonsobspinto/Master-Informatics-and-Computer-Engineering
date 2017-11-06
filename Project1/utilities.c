#include <sys/stat.h>
#include <stdio.h>
#include <fcntl.h>
#include <termios.h>
#include <math.h>
#include <stdlib.h>
#include "utilities.h"

const int validBaudRates[19] = {B0,B50,B75,B110,B134,B150,B200,B300,B600,B1200,B1800,B2400,B4800,B9600,B19200,B38400,B57600,B115200,B230400};
const char* validBaudRatesChar[19] = {"B0","B50","B75","B110","B134","B150","B200","B300","B600","B1200","B1800","B2400","B4800","B9600","B19200","B38400","B57600","B115200","B230400"};

int printUsage(const char *programName)
{
	printf("Usage:\n"
			"\t%s\n"
			"\t\tOR\n"
			"\t%s <Mode> (0-> Transmitter, 1-> Reader)\n", programName, programName);

			return -1;
}

void showConnectionInfo(LinkLayer* linkLayer) {
	printf("----------- CONNECTION INFO -----------\n");
	printf("# Mode: "); (linkLayer->mode) ? printf("Read\n") : printf("Write\n");
	printf("# Port: %s\n",linkLayer->port);
	printf("# Baud Rate: %s\n",getBaudRateString(linkLayer->baudRate));
	printf("# Timeout: %d\n",linkLayer->timeout);
	printf("# Tries: %d\n",linkLayer->numTransmissions);
	printf("# Frame Size: %d\n",linkLayer->dataSize);
	printf("# Induce Error Probability: %d %% \n",linkLayer->induceError);
	printf("# Increse Propagation Time: "); (linkLayer->increaseTProg) ? printf("Yes\n") : printf("No\n");
	if(!linkLayer->mode){ //Write
		printf("# File Name: %s\n",linkLayer->fileName);
		printf("# File Size: %d bytes\n",linkLayer->fileSize);
		}
  printf("----------------------------------\n");
	printf("\n");
}

unsigned int getFileSize(char* fileName){
	struct stat st;
	stat(fileName, &st);
	return st.st_size;
}

char* getBaudRateString(int baudRate){
	unsigned int i;
	for(i = 0; i < BAUDRATE_VALUES;  i++){
		if(validBaudRates[i] == baudRate)
			return (char *) validBaudRatesChar[i];
	}

	return "Oops! Something went wrong.";
}

void clearBuffer(FILE* fp)
{
   int c;
   while ( (c = fgetc(fp)) != EOF && c != '\n');
}

unsigned int nDigits(int integer){
	if(integer == 0)
		return 1;
	return floor(log10(abs(integer))) + 1;
}


void showStats(LinkLayer* linkLayer){

	printf("\n");
	printf("----------- STATISTICS -----------\n");
  printf("Filename: %s\n", linkLayer->fileName);
  printf("File Size: %d\n", linkLayer->fileSize);
	printf("Time Elapsed: %f\n", linkLayer->timeElapsed);
	printf("Sent RR: %d\n", linkLayer->numSentRR);
	printf("Received RR: %d\n", linkLayer->numReceivedRR * 2); //lol
	printf("Sent REJ: %d\n", linkLayer->numSentREJ);
	printf("Received REJ: %d\n", linkLayer->numReceivedREJ);
	printf("----------------------------------\n");
	printf("\n");


}
