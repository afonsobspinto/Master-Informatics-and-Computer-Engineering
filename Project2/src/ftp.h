#ifndef FTP_H
#define FTP_H 

#include <stdlib.h>
#include "url.h"

int downloadLayer(const URL* url);

int connectSocket(const char* ip, int port);

int recvSocket(int sockfd, char* buffer, size_t length);

#endif // !FTP_H