#include <stdio.h>
#include "utils.h"

int printUsage(const char* programName){
    printf("Usage: %s ftp://[<user>:<password>@]<host>/<url-path>\n", programName);
    return -1;
}

int errorMessage(const char* errorMessage){
    fprintf(stderr, "%s\n", errorMessage);
    return -1;
}
