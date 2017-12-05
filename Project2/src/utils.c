#include <stdio.h>

void printUsage(const char* programName){
    printf("Usage: %s ftp://[<user>:<password>@]<host>/<url-path>\n", programName);
}
