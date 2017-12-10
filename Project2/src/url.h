#pragma once

typedef struct {
	char* user; 
	char* password;
	char* host; 
	char* ip; 
	char* path;
	char* filename;
	unsigned int port;
} Url;

void initURL(Url* url);
int parseURL(const char* urlStr, Url* url);
int processURL(const char* urlStr, Url* url);
int getIpByHost(Url* url);
void showURL(Url* url);
