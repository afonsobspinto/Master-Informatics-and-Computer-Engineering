
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

int appLayer(ApplicationLayer* applicationLayer, LinkLayer* linkLayer){

  if (openSerialPort(applicationLayer, linkLayer) == -1) {
    perror("appLayer: openSerialPort \n");
    exit(-1);
  }

  if (setNewTermiosStructure(applicationLayer, linkLayer) == -1) {
    perror("appLayer: setNewTermiosStructure \n");
    exit(-1);
  }

  llopen(applicationLayer, linkLayer);

  if(applicationLayer->status == TRANSMITTER)
    sendData(applicationLayer, linkLayer);
  // else
  //   receiveData()

  return 0;
}



int sendData(ApplicationLayer* applicationLayer, LinkLayer* linkLayer){

  FileData file;
  FILE* fp;

  getFileName(file.name);

  fp = fopen(file.name, "rb");
  if (!fp) {perror("sendData: open"); return -1; }

  file.size = getFileSize(fp);
  if(file.size < 0) {perror("sendData: getFileSize"); return -1; }


  if((sendControlPackage(CTRL_PACKET_START, file, applicationLayer, linkLayer)) < 0)
    {perror("sendData: sendControlPackage"); return -1; }

  char* dataBuffer = malloc(MAX_SIZE);
  int readBytes = 0;
  int i = 0;

  while ((readBytes = fread(dataBuffer, sizeof(char), MAX_SIZE, fp)) > 0) {
    if ((sendDataPackage((i++) % 255, dataBuffer, readBytes, applicationLayer, linkLayer)) < 0) {
      perror("sendData: sendDataPackage");
      free(dataBuffer);
      return -1;
    }

    dataBuffer = memset(dataBuffer, 0, MAX_SIZE);
    linkLayer->sequenceNumber = !linkLayer->sequenceNumber;
  }

  free(dataBuffer);
  if (fclose(fp) != 0)
    {perror("sendData: fclose"); return -1; }

  if(sendControlPackage(CTRL_PACKET_END, file, applicationLayer, linkLayer) < 0)
    {perror("sendData: sendControlPackage"); return -1; }

  // if (!llclose())
  //   return 0;

  printf("File successfully transferred.\n");
  return 0;
}


int sendControlPackage(int controlField, FileData file, ApplicationLayer* applicationLayer, LinkLayer* linkLayer){

  char* fileSize = malloc(MAX_SIZE);
  memcpy(fileSize, &file.size, sizeof(file.size));

  int packageSize = 5 + strlen(fileSize) + strlen(file.name);
  int pos = 0;

  unsigned char controlPackage[packageSize];
  controlPackage[pos++] = controlField;
	controlPackage[pos++] = T_FILE_SIZE;
  controlPackage[pos++] = strlen(fileSize);

  for(int i = 0; i < strlen(fileSize); i++){
      controlPackage[pos++] = fileSize[i];
  }

  controlPackage[pos++] = T_FILE_NAME;
  controlPackage[pos++] = strlen(file.name);

  int i;
  for (i = 0; i < strlen(file.name); i++)
    controlPackage[pos++] = file.name[i];

  if(llwrite(applicationLayer, linkLayer, controlPackage, packageSize) < 0)
    {perror("sendControlPackage: llwrite"); return -1; }

  return 0;

}


int sendDataPackage(int N, char* buffer, int length, ApplicationLayer* applicationLayer, LinkLayer* linkLayer){

  unsigned char C = CTRL_PACKET_DATA;
  unsigned char L2 = length / 256;  //K = 256 * L2+ L1
  unsigned char L1 = length % 256;

  int packageSize = 4 + length;

  unsigned char* package = (unsigned char*) malloc(packageSize);

  package[0] = C;
  package[1] = N;
  package[2] = L2;
  package[3] = L1;

  memcpy(&package[4], buffer, length);

  if(llwrite(applicationLayer, linkLayer, package, packageSize) < 0)
    {perror("sendDataPackage: llwrite"); free(package); return -1; }

  free(package);

  return 0;

}
