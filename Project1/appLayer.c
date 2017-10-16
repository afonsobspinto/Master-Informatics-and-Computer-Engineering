#include "dataLinkLayer.h"
#include "appLayer.h"



int appLayer(char* serialPort, enum USAGE usage){

  if (openSerialPort(serialPort) == -1) {
    perror("Error Opening Serial Port \n");
    exit(-1);
}


}
