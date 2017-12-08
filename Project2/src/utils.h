#ifndef UTILS_H
#define UTILS_H

typedef enum{
    REGCOMP,
    REGEXEC,
    TOKEN,
    GETIP,
    UNEXPECTED
}ERROR;

extern ERROR error;

extern const char* errorStr[];

int printUsage(const char* programName);
int errorMessage(const char* errorMessage);



#endif
