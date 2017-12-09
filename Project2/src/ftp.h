#ifndef FTP_H
#define FTP_H 

#include <stdlib.h>
#include "url.h"

#define FTP_CODE_NUM_DIGITS 3
#define FTP_PASSWORD 230
#define FTP_USER 331

int downloadLayer(const URL* url);

int connectSocket(const char* ip, int port);

int recvSocket(int sockfd, char* message, size_t size);

int sendSocket(int sockfd, const char* message);

int ftpLogin(int sockfd, const char* user, const char* password);

int ftpValidateCode(const char* answer, int expected);

int ftpPassiveMode(int sockfd);

#endif // !FTP_H