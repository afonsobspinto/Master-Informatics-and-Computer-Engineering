
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


int appLayer(LinkLayer* linkLayer){

  if (openSerialPort(linkLayer) == -1) {
    printf("appLayer: openSerialPort \n");
    return -1;
  }

  if (setNewTermiosStructure(linkLayer) == -1) {
    printf("appLayer: setNewTermiosStructure \n");
    return -1;
  }

  if(llopen(linkLayer)<0)
    return -1;

  printf("Connection Established!\n");
    if(linkLayer->mode == TRANSMITTER){
      if(sendData(linkLayer)<0)
        return -1;
    }
    else if(linkLayer->mode == RECEIVER){
      if(receiveData(linkLayer)<0)
        return -1;
    }


  return llclose(linkLayer);
}



int sendData(LinkLayer* linkLayer){


  // Preparing Start Control Packet

  ControlPacket startControlPacket;
  startControlPacket.controlField = CTRL_PACKET_START;
  startControlPacket.numParams = 2;


   // Preparing Size Info

  ControlPacketTLV startControlPacketTLV_size;
  startControlPacketTLV_size.type = T_FILE_SIZE;

  int numDigits = nDigits(linkLayer->fileSize);
  char fileSize[numDigits * sizeof(char)];

  if (sprintf(fileSize, "%u", linkLayer->fileSize) < 0){
    perror("sendData error"); return -1;}

  startControlPacketTLV_size.length = strlen(fileSize) + 1; // A terminating null character is automatically appended after the content.
  startControlPacketTLV_size.value = fileSize;

  if(DEBUG_MODE)
    printf("Start Control Packet Size: %s\n", fileSize);

     // Preparing Name Info

  ControlPacketTLV startControlPacketTLV_name;
  startControlPacketTLV_name.type = T_FILE_NAME;
  char fileName[strlen(linkLayer->fileName)+1];
  strcpy(fileName, linkLayer->fileName);
  startControlPacketTLV_name.length = strlen(fileName)+1;
  startControlPacketTLV_name.value = fileName;

  if(DEBUG_MODE)
    printf("Start Control Packet Name: %s\n", fileName);



  ControlPacketTLV startControlPacketParams[] = {startControlPacketTLV_size, startControlPacketTLV_name};
  startControlPacket.params = startControlPacketParams;

  if(sendControlPackage(linkLayer, &startControlPacket) < 0)
    return -1;

  if(DEBUG_MODE)
  printf("Control Packet Sent: %s\n", fileName);

  sleep(2);
  tcflush(linkLayer->fileDescriptor, TCIOFLUSH);

  FILE* fp;

  fp = fopen(linkLayer->fileName, "rb");
  if (!fp) {printf("sendData: open error \n"); return -1; }

  char* dataBuffer = malloc(MAX_SIZE);
  int readBytes = 0;
  int i = 0;

  while ((readBytes = fread(dataBuffer, sizeof(char), MAX_SIZE, fp)) > 0) {
    if ((sendDataPackage(dataBuffer, (i++) % 255, readBytes, linkLayer)) < 0) {
      printf("sendData: sendDataPackage error \n");
      free(dataBuffer);
      return -1;
    }

    dataBuffer = memset(dataBuffer, 0, MAX_SIZE);
    linkLayer->sequenceNumber = !linkLayer->sequenceNumber;

  }

  free(dataBuffer);
  if (fclose(fp) != 0)
    {printf("sendData: fclose error \n"); return -1; }

  ControlPacket endControlPacket;
  endControlPacket = startControlPacket;
  endControlPacket.controlField = CTRL_PACKET_END;

  sleep(2);
  tcflush(linkLayer->fileDescriptor, TCIOFLUSH);

  if(sendControlPackage(linkLayer, &endControlPacket) < 0)
    {printf("sendData: sendControlPackage error \n"); return -1; }



  printf("File successfully transferred!\n");
  printf("File Name: %s\n", linkLayer->fileName);
  printf("File Size: %d\n", linkLayer->fileSize);
  return 0;
}


int sendControlPackage(LinkLayer* linkLayer, ControlPacket* controlPacket){

  if(DEBUG_MODE)
    printf("Sending Control Packet...\n");

  unsigned int dataBufferSize = 1 + 2 * controlPacket->numParams; // C + T1 L1 + T2 L2
  unsigned int i;
  for (i = 0; i < controlPacket->numParams; i++){
    dataBufferSize += controlPacket->params[i].length;
  }

  char dataBuffer[dataBufferSize];
  dataBuffer[0] = controlPacket->controlField;

  unsigned int j;

  for (i = 0, j = 1; i < controlPacket->numParams; i++){
    dataBuffer[j++] = controlPacket->params[i].type; // Ti Field
    dataBuffer[j++] = controlPacket->params[i].length; // Li FIeld
    memcpy(&dataBuffer[j], controlPacket->params[i].value, controlPacket->params[i].length);  // Vi Field
    j+= controlPacket->params[i].length;
  }

  if(llwrite(linkLayer, dataBuffer, dataBufferSize) < 0)
    return -1;

  if(DEBUG_MODE)
    printf("Control Packet Sent. \n");
return 0;
}


int sendDataPackage(char* buffer, int N, int length, LinkLayer* linkLayer){

  unsigned char C = CTRL_PACKET_DATA;
  unsigned char L2 = length / 256;  //K = 256 * L2+ L1
  unsigned char L1 = length % 256;

  int packageSize = 4 + length; // 4 <-> C, N, L2, L1

  unsigned char* package = (unsigned char*) malloc(packageSize);

  package[0] = C;
  package[1] = N;
  package[2] = L2;
  package[3] = L1;

  memcpy(&package[4], buffer, length);

  if (DEBUG_MODE)
  printf("sendDataPackage: Start sending Data Packet: \n");

  if(llwrite(linkLayer, package, packageSize) < 0)
    {printf("sendDataPackage: llwrite error \n"); free(package); return -1; }

  free(package);

  return 0;

}

int receiveData(LinkLayer* linkLayer){

  if(DEBUG_MODE)
     printf("Reading Start Control Packet...\n");

   char dataBuffer[MAX_SIZE];
   unsigned int dataBufferSize;

   if((dataBufferSize = llread(linkLayer)) < 0)
     return -1;

   unsigned int i = 0;

   char* fileName;
   unsigned int fileSize;

   ControlPacket startControlPacket;
   startControlPacket.controlField = linkLayer->frame[i++];
   ControlPacketTLV startControlPacketParams[MAX_SIZE];

   unsigned int j;
   for (j= 0; i < dataBufferSize; j++){
     startControlPacketParams[j].type = linkLayer->frame[i++];
     startControlPacketParams[j].length = linkLayer->frame[i++];
     startControlPacketParams[j].value = malloc(startControlPacketParams[j].length);

     memcpy(startControlPacketParams[j].value, &linkLayer->frame[i], startControlPacketParams[j].length);

     if(startControlPacketParams[j].type == T_FILE_NAME){
       fileName = malloc(startControlPacketParams[j].length);
       memcpy(fileName, startControlPacketParams[j].value, startControlPacketParams[j].length);
       if(DEBUG_MODE)
         printf("Start Control Packet Name: %s\n", fileName);
     }
     else if(startControlPacketParams[j].type == T_FILE_SIZE){
       fileSize = strtoul(startControlPacketParams[j].value, NULL, 10);

       if(DEBUG_MODE)
         printf("Start Control Packet Size: %d\n", fileSize);
     }

     i+= startControlPacketParams[j].length;
   }

   startControlPacket.numParams = j;
   startControlPacket.params = startControlPacketParams;


  FILE* outFile;
  int controlStart;
  int ret;

  printf("File Size: %d\n", linkLayer->fileSize);
  printf("File Name: %s\n", linkLayer->fileName);

  outFile = fopen(linkLayer->fileName, "wb");

  if(!outFile){
    printf("receiveData: Open Error \n");
    return -1;
  }

  if (DEBUG_MODE)
  printf("receiveData: file created \n");


  int fileRead = 0;
  int N = -1;

  while(1){

    int lastN = N;
    char* dataBuffer = NULL;
    int length = 0;

    if (DEBUG_MODE)
      printf("receiveData: Start looking for Data Package: \n");
    ret = receiveDataPackage(&N, &dataBuffer, &length, linkLayer);

    if(ret)
      break;

    if (DEBUG_MODE)
    printf("receiveData: Package received \n");

    if (N != 0 && lastN + 1 != N) {
      if (DEBUG_MODE)
        printf("receiveData: Found Duplicated \n");
      ret = -1;
    }

    if(ret < 0){
      (linkLayer->sequenceNumber == 0) ? write(linkLayer->fileDescriptor, REJ0, 5): write(linkLayer->fileDescriptor, REJ1, 5);
      if (DEBUG_MODE){
        (linkLayer->sequenceNumber == 0) ? printf("receiveData: Package rejected com REJ0 \n"): printf("receiveData: Package rejected com REJ1 \n");
      }
      linkLayer->numSentREJ++;
      continue;
    }

    fwrite(dataBuffer, sizeof(char), length, outFile);
    free(dataBuffer);

    fileRead += length;

    (linkLayer->sequenceNumber == 0) ? write(linkLayer->fileDescriptor, RR0, 5): write(linkLayer->fileDescriptor, RR1, 5);
    if (DEBUG_MODE){
      (linkLayer->sequenceNumber == 0) ? printf("receiveData: Package accepted com RR0 \n"): printf("receiveData: Package accepted com RR1 \n");
    }
    linkLayer->numSentRR++;

    linkLayer->sequenceNumber = !linkLayer->sequenceNumber;
  }

  if(fclose(outFile) != 0){
    printf("receiveData: Closing File Error \n");
    return -1;
  }

  printf("File successfully transferred!\n");
  printf("File Name: %s\n", linkLayer->fileName);
  printf("File Size: %d\n", linkLayer->fileSize);
  return 0;
}

int receiveControlPackage(int* controlPackageType, LinkLayer* linkLayer){

  int totalSize = llread(linkLayer);

  for (int u = 4; u < 30; u++)
  printf("%d: %c\n", u, linkLayer->frame[u]);

  if(totalSize < 0){
    printf("receiveControlPackage: llread error \n");
    return -1;
  }

  int i;
  int numParams = 2;
  int pos = 4;
  int numberOfBytes;

  *controlPackageType = linkLayer->frame[pos++];

  for(i = 0; i < numParams; i++){
    int paramType = linkLayer->frame[pos++];

    switch(paramType){
      case T_FILE_SIZE:
        numberOfBytes = (int) linkLayer->frame[pos++];
        memcpy(&(linkLayer->fileSize), linkLayer->frame + pos, numberOfBytes);
        pos += numberOfBytes;
        break;

      case T_FILE_NAME:
        numberOfBytes = (int) linkLayer->frame[pos++];
        memcpy(&(linkLayer->fileName), linkLayer->frame + pos, numberOfBytes);
        pos += numberOfBytes;
        break;
    }
  }
  return 0;
}

int receiveDataPackage(int* N, char** buf, int* length, LinkLayer* linkLayer){

  int size = llread(linkLayer);

  if(size < 0){
    printf("receiveDataPackage: llread error \n");
    return -1;
  }

  int C = linkLayer->frame[4];
  *N = (int) linkLayer->frame[5];
  int L2 = linkLayer->frame[6];
  int L1 = linkLayer->frame[7];

  if(C == CTRL_PACKET_END){
      printf("receiveDataPackage: end package received \n");
    return 1;
  }

  if(C != CTRL_PACKET_DATA){
      printf("receiveDataPackage: not a data package \n");
    return -1;
  }

  *length = 256 * L2 + L1;
  *buf = malloc(*length);

  if (linkLayer->frame[8 + *length] != getBCC2(&linkLayer->frame[4], *length + 4)) {
    printf("receiveDataPackage: BCC2 error \n");
    return -1;
}

  memcpy(*buf, &linkLayer->frame[8], *length);

  return 0;
}


void showInfo(LinkLayer* linkLayer) {
	printf("----------- CONNECTION INFO -----------\n");
	switch (linkLayer->mode) {
	case TRANSMITTER:
		printf("# Mode: Write\n");
		break;
	case RECEIVER:
		printf("# Mode: Read\n");
		break;
  default:
    exit(-1);
	}

	printf("# Baud Rate: %d\n", linkLayer->baudRate);
	//printf("# Message data max. size: %d\n", ll->messageDataMaxSize);
	printf("# Max No. of Transmissions: %d\n", linkLayer->numTransmissions);
	printf("# Time-out interval: %d\n", linkLayer->timeout);
	printf("# Port: %s\n", linkLayer->port);
	printf("# File: %s\n", linkLayer->fileName);
  printf("----------------------------------\n");
	printf("\n");
}

void showStats(LinkLayer* linkLayer, double timeElapsed){

	printf("\n");
	printf("----------- STATISTICS -----------\n");
  printf("Filename: %s\n", linkLayer->fileName);
  printf("File Size: %d\n", linkLayer->fileSize);
  printf("Time Elapsed: %f\n", timeElapsed);
	printf("Sent RR: %d\n", linkLayer->numSentRR);
	printf("Received RR: %d\n", linkLayer->numReceivedRR * 2); //lol
	printf("Sent REJ: %d\n", linkLayer->numSentREJ);
	printf("Received REJ: %d\n", linkLayer->numReceivedREJ);
	printf("----------------------------------\n");
	printf("\n");


}
