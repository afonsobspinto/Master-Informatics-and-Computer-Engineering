#ifndef UTILS_H
#define UTILS_H

#define MAX_SIZE 2048

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
int validateEmail(const char* emailStr);
char* getEmail();



#endif
