#include "url.h"
#include "ftp.h"
#include "utils.h"

ERROR error = UNEXPECTED;
const char* errorStr[] = {"Regcomp", "Regexec", "Token", "GetIP", "Connect", "Receive", "Login", "CWD", "PassiveMode", "Retrive", "Download", "Disconnect", "Unexpected"};


int main(int argc, char** argv) {
  if (argc != 2){
        printUsage(argv[0]);
        return -1;
    }

    // Url MODULE
    Url url;
    initURL(&url);


    if(parseURL(argv[1], &url) < 0){
        return errorMessage("Error parsing Url");
    }

	// Ftp MODULE
    if(downloadLayer(url) < 0){
        return errorMessage("Error downloading");
    }
	
	return 0;
}
