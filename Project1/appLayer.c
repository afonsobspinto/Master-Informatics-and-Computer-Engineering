
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

int appLayer(ApplicationLayer* applicationLayer, LinkLayer* linkLayer, FileData* file){

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
    sendData(applicationLayer, linkLayer, file);
  else if(applicationLayer->status == RECEIVER)
    receiveData(applicationLayer, linkLayer, file);
    /*
    Rejeitar Duplicados -> Ver numero de sequencia
    Adicionar Sleep/Funcao Alarme para causar delay no T_Prop
    Induzir erros no BCC com recurso a à função probability
    Comparar tamanho final com tamanho inicial
    Update das estatisticas
    */


  llclose(applicationLayer, linkLayer);

  return 0;
}



int sendData(ApplicationLayer* applicationLayer, LinkLayer* linkLayer, FileData* file){

  FILE* fp;

  getFileName(file->name);

  fp = fopen(file->name, "rb");
  if (!fp) {perror("sendData: open"); return -1; }

  file->size = getFileSize(fp);
  if(file->size < 0) {perror("sendData: getFileSize"); return -1; }


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


  printf("File successfully transferred.\n");
  return 0;
}


int sendControlPackage(int controlField, FileData* file, ApplicationLayer* applicationLayer, LinkLayer* linkLayer){

  char* fileSize = malloc(MAX_SIZE);
  memcpy(fileSize, &file->size, sizeof(file->size));

  int packageSize = 5 + strlen(fileSize) + strlen(file->name);
  int pos = 0;

  unsigned char controlPackage[packageSize];
  controlPackage[pos++] = controlField;
	controlPackage[pos++] = T_FILE_SIZE;
  controlPackage[pos++] = strlen(fileSize);

  for(int i = 0; i < strlen(fileSize); i++){
      controlPackage[pos++] = fileSize[i];
  }

  controlPackage[pos++] = T_FILE_NAME;
  controlPackage[pos++] = strlen(file->name);

  int i;
  for (i = 0; i < strlen(file->name); i++)
    controlPackage[pos++] = file->name[i];

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

int receiveData(ApplicationLayer* applicationLayer, LinkLayer* linkLayer, FileData* file ){

  FILE* outFile;
  int controlStart;
  int fileRead = 0, N = -1;

  if(!receiveControlPackage(&controlStart, file, applicationLayer, linkLayer)){
    perror("receiveData: start");
    return -1;
  }

  if(controlStart != CTRL_PACKET_START) {
    perror("receiveData: controlStart");
    return -1;
  }

  outFile = fopen(file->name, "wb");

  if(!outFile){
    perror("receiveData: open");
    return -1;
  }

  while(fileRead < file->size){
    int lastN = N;
    char* dataBuffer = NULL;
    int length = 0;

    if(!receiveDataPackage(&N, &dataBuffer, &length, applicationLayer, linkLayer)){
      perror("receiveData: read file");
      free(dataBuffer);
      return -1;
    }

    if(N != 0 && lastN + 1 != N){
      perror("receiveData: wrong sequence");
      free(dataBuffer);
      return -1;
    }

    fwrite(dataBuffer, sizeof(char), length, outFile);
    free(dataBuffer);

    fileRead += length;
  }

  if(fclose(outFile) != 0){
    perror("receiveData: closing file");
    return -1;
  }

  int controlPackageTypeReceived = -1;
  if(!receiveControlPackage(&controlPackageTypeReceived, file, applicationLayer, linkLayer)){
    perror("receiveData: end control package");
    return -1;
  }

  if(controlPackageTypeReceived != CTRL_PACKET_END){
    perror("receiveData: control is not end");
    return -1;
  }

  // if(!llclose(applicationLayer, linkLayer)){
  //   perror("receiveData: llclose");
  //   return -1;
  // } TODO: @Coconette já faço isto no appLayer

  printf("File successfully received.\n");
  return 0;
}


int receiveControlPackage(int* controlPackageType, FileData* file, ApplicationLayer* applicationLayer, LinkLayer* linkLayer){

  unsigned char* package;
  unsigned int totalSize = llread(applicationLayer, linkLayer, &package);

  if(totalSize < 0){
    perror("receiveControlPackage: llread");
    return -1;
  }

  *controlPackageType = package[0];

  unsigned int i = 0, numParams = 2, pos = 1, numOcts = 0;
  for(i= 0; i < numParams; i++){
    int paramType = package[pos++];

    switch(paramType){
      case T_FILE_SIZE:
        numOcts = (unsigned int) package[pos++];
        char* length = malloc(numOcts);
        memcpy(length, &package[pos], numOcts);

        file->size = atoi(length);
        free(length);
        break;

      case T_FILE_NAME:
        numOcts = (unsigned char) package[pos++];
        memcpy(file->name, &package[pos], numOcts);
        break;
    }
  }
  return 0;

}

int receiveDataPackage(int* N, char** buf, int* length, ApplicationLayer* applicationLayer, LinkLayer* linkLayer){
  unsigned char* package;

  unsigned int size = llread(applicationLayer, linkLayer, &package);

  if(size < 0){
    perror("receiveDataPackage: llread");
    return -1;
  }

  int C = package[0];
  *N = (unsigned char) package[1];
  int L2 = package[2];
  int L3 = package[3];

  if(C != CTRL_PACKET_DATA){
    perror("receiveDataPackage: not data package");
    return -1;
  }

  *length = 256 * L2 + L3;
  *buf = malloc(*length);

  memcpy(*buf, &package[4], *length);

  free(package);

  return 0;
}


void showStats(LinkLayer* linkLayer, FileData* file, double timeElapsed){

	printf("\n");
	printf("----------- STATISTICS -----------\n");
  printf("Filename: %s\n", file->name);
  printf("File Size: %d\n", file->size);
  printf("Time Elapsed: %f\n", timeElapsed);
	printf("Sent RR: %d\n", linkLayer->stats->numSentRR);
	printf("Received RR: %d\n", linkLayer->stats->numReceivedRR);
	printf("Sent REJ: %d\n", linkLayer->stats->numSentREJ);
	printf("Received REJ: %d\n", linkLayer->stats->numReceivedREJ);
	printf("----------------------------------\n");
	printf("\n");


}
