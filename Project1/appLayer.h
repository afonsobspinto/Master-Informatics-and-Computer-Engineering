#ifndef APPLAYER_H
#define APPLAYER_H

#include "dataLinkLayer.h"
#include "utilities.h"


typedef enum {CTRL_PACKET_DATA = 1, CTRL_PACKET_START = 2, CTRL_PACKET_END = 3} PacketControlField;
typedef enum {T_FILE_SIZE, T_FILE_NAME} ControlPacketType;

typedef struct {
	ControlPacketType type;
	unsigned char length;
	char* value;
} ControlPacketTLV;


typedef struct {
	PacketControlField controlField;
	unsigned int numParams;
	ControlPacketTLV *params;
} ControlPacket;

typedef struct {
	PacketControlField controlField;
	unsigned char sequenceNumber;
	unsigned int length;
	char* dataBuffer;
} DataPacket;



int appLayer(LinkLayer* linkLayer);

int sendData(LinkLayer* linkLayer);
int receiveData(LinkLayer* linkLayer);
int sendControlPackage(LinkLayer* linkLayer, ControlPacket* controlPacket);
int sendDataPackage(char* buffer, int N, int length, LinkLayer* linkLayer);
int receiveControlPackage(int* controlPackageType, LinkLayer* linkLayer);
int receiveDataPackage(int* N, char** buf, int* length, LinkLayer* linkLayer);

void showInfo(LinkLayer* linkLayer);
void showStats(LinkLayer* linkLayerData, double timeElapsed);


#endif
