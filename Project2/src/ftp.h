#include <stddef.h>
#include "url.h"

typedef struct 
{
    int sockfd;
    int datafd; 
} Ftp;



int downloadLayer(const Url url);
int openConnection(Ftp* ftp, const char* ip, int port);
int connectSocket(const char* ip, int port);
int ftpLogin(Ftp* ftp, const char* user, const char* password);
int ftpCWD(Ftp* ftp, const char* path);
int ftpPassiveMode(Ftp* ftp);
int ftpRetrieve(Ftp* ftp, const char* filename);
int ftpDisconnect(Ftp* ftp);
int socketDownload(Ftp* ftp, const char* filename);
int sendSocket(Ftp* ftp, const char *command);
int recvSocket(Ftp* ftp, char* command, size_t size);
int ftpValidateCode(const char* answer, int expected);

