#ifndef URL_H
#define URL_H

#define FTP_PORT 21

typedef struct {
	char* user; 
	char* password;
	char* host; 
	char* ip; 
	char* path;
	unsigned int port;
} URL;

void initURL(URL* url);
int parseURL(const char* urlStr, URL* url);
int processURL(const char* urlStr, URL* url);
int getIpByHost(URL* url);

void showURL(URL* url);


#endif
