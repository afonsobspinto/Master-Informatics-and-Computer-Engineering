#ifndef FTP_H
#define FTP_H 

#include <stdlib.h>
#include "url.h"

int downloadLayer(const URL* url);

int connectSocket(const char* ip, int port);

int recvSocket(int sockfd, char* message, size_t size);

int sendSocket(int sockfd, const char* message);

int ftpLogin(int sockfd, const char* user, const char* password);

#endif // !FTP_H