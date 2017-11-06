#include <stdio.h>      /* printf, NULL */
#include <stdlib.h>     /* srand, rand */
#include <time.h>       /* time */
#include <string.h>
#include <unistd.h>

#include "dataLinkLayer.h"
#include "interaction.h"
#include "utilities.h"
#include "appLayer.h"

const int DEBUG_MODE = 1;

int main(int argc, char *argv[]) {
  srand(time(NULL));

  LinkLayer* linkLayer = malloc(sizeof(LinkLayer));
  linkLayerInit(linkLayer);

  if(argc == 1)
    userInteraction(linkLayer);

  else if(argc == 2){
    if ((strcmp("0", argv[1]) == 0)) {
      linkLayer->mode = TRANSMITTER;
    }
    else if ((strcmp("1", argv[1]) == 0)) {
      linkLayer->mode = RECEIVER;
    }
    else{
      return printUsage(argv[0]);
    }
  }

  else
    return printUsage(argv[0]);

  showConnectionInfo(linkLayer);

  return appLayer(linkLayer);
}
