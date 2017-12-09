#ifndef UTILS_H
#define UTILS_H

#define MAX_SIZE 1024

typedef enum{
    REGCOMP,
    REGEXEC,
    TOKEN,
    GETIP,
    CONNECT,
    LOGIN,
    PASSIVE_MODE,
    UNEXPECTED
}ERROR;

extern ERROR error;

extern const char* errorStr[];

int printUsage(const char* programName);
int errorMessage(const char* errorMessage);



#endif
