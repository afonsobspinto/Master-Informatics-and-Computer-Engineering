#include "utils.h"
#include "url.h"

int main(int argc, char* argv[]) {
  if (argc != 2){
        printUsage(argv[0]);
        return -1;
    }

    // URL MODULE
    URL url;
    initURL(&url);

    if(parseURL(argv[1], &url) < 0){
        return errorMessage("Error parsing URL");
    }
    return 0;
}
