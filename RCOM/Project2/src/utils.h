#ifndef UTILS_H
#define UTILS_H

#define MAX_SIZE 1024
#define FTP_CODE_NUM_DIGITS 3
#define FTP_CWD 250
#define FTP_DATA_CONNECTION 226
#define FTP_CLOSE 221
#define FTP_RETRIEVE 150
#define FTP_PASSIVE_MODE 227
#define FTP_PASSWORD 230
#define FTP_USER 331
#define FTP_PORT 21


typedef enum{
    REGCOMP,
    REGEXEC,
    TOKEN,
    GETIP,
    CONNECT,
    RECEIVE,
    LOGIN,
    CWD,
    PASSIVE_MODE,
    RETRIEVE,
    DOWNLOAD,
    DISCONNECT,
    UNEXPECTED
}ERROR;


extern ERROR error;

extern const char* errorStr[];

int printUsage(const char* programName);
int errorMessage(const char* errorMessage);
int validateEmail(const char* emailStr);
int getEmail(char* email);

#endif
