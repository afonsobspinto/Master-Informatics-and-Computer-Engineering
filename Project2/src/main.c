#include "utils.h"
#include "url.h"
#include "ftp.h"


ERROR error = UNEXPECTED;
const char* errorStr[] = {"Regcomp", "Regexec", "Token", "GetIP", "Connect", "Login", "PassiveMode", "Unexpected"};

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

    // FTP MODULE
    if(downloadLayer(&url) < 0){
        return errorMessage("Error downloading");
    }
    return 0;
}
