
#include <libgen.h>
#include <stdlib.h> 
#include <regex.h>
#include <string.h>
#include <stdio.h>
#include <netdb.h>
#include <arpa/inet.h>
#include "url.h"
#include "utils.h"

void initURL(Url* url) {
    url->user = calloc(MAX_SIZE, sizeof(char));
    url->password = calloc(MAX_SIZE, sizeof(char));
    url->host = calloc(MAX_SIZE, sizeof(char));
    url->path = calloc(MAX_SIZE, sizeof(char));
	url->filename = calloc(MAX_SIZE, sizeof(char));
    url->port = FTP_PORT;
}


int parseURL(const char* urlStr, Url* url) {
	
	const char* pattern = "ftp://(([A-Za-z0-9])*:([A-Za-z0-9])*@)?([A-Za-z0-9.~-])+/([A-Za-z0-9.~-])+";
    regex_t* regex = (regex_t*) malloc(strlen(urlStr));

    if(regcomp(regex, pattern, REG_EXTENDED) != 0){
        error = REGCOMP;
        return -1;
    }
    if(regexec(regex, urlStr, 0, NULL, REG_EXTENDED) != 0){
        error = REGEXEC;
        return -1;
    }

    free(regex);

    return processURL(urlStr, url);
}

int validateEmail(const char* emailStr){
    const char* pattern = "[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}";
    regex_t* regex = (regex_t*) malloc(strlen(emailStr));

    if(regcomp(regex, pattern, REG_EXTENDED) != 0){
        error = REGCOMP;
        return -1;
    }
    if(regexec(regex, emailStr, 0, NULL, REG_EXTENDED) != 0){
        error = REGEXEC;
        return -1;
    }

    free(regex);

    return 0;
}

int getEmail(char* email){
    char buf[50];
    
	printf ("Enter your email: \n");
    scanf ("%s", buf);
	if(validateEmail(buf) < 0){
		printf("Invalid email\n");
		return 0;
	}
	for(int i = 0; i < 50; ++i)
        email[i] = buf[i];
    
	return 1;
}

int processURL(const char* urlStr, Url* url){
	int anonymousMode;
    char* token = (char*) malloc(strlen(urlStr));
    char* tempUrl = (char*) malloc(strlen(urlStr));
	char email[MAX_SIZE] = {0};

    strcpy(token, urlStr);
    strcpy(tempUrl, urlStr + 6);

    if(!(token = strtok(token+6, ":"))){
        error = TOKEN;
        return -1;
    }

    anonymousMode = (strcmp(token, tempUrl) == 0) ? 1 : 0;

    if(anonymousMode){
        url->user = "anonymous";
		getEmail(email);
        url->password = email; //TODO: Change this to email
        if(!(token = strtok(token, "/"))){
            error = TOKEN;
            return -1;
        }
    }
    else{
        strcpy(url->user, token);
        if(!(token = strtok(NULL, "@"))){
            error = TOKEN;
            return -1;
        } 
        strcpy(url->password, token);
        if(!(token = strtok(NULL, "/"))){
            error = TOKEN;
            return -1;
        }
    }
    
    strcpy(url->host, token);

    if(!(token = strtok(NULL, ""))){
        error = TOKEN;
        return -1;
    }
    
	size_t length = strlen(token);
	char tempPath[length];
	strcpy(tempPath, token);

    strcpy(url->path, dirname(token));
	strcpy(url->filename, basename(tempPath));

    getIpByHost(url);

    showURL(url);
  
    return 0;
}

int getIpByHost(Url* url) {
    struct hostent* h;
    if ((h = gethostbyname(url->host)) == NULL) {
		return -1;
    }
    
    url->ip = inet_ntoa(*((struct in_addr *) h->h_addr_list[0]));

    return 0;
}

void showURL(Url* url){
    printf("\n----------- URL PARSED -----------\n");
    printf("User: %s\n",url->user);
    printf("Password: %s\n",url->password);
    printf("Host: %s\n",url->host);
    printf("Ip: %s\n", url->ip);
    printf("Path: %s\n",url->path);
	printf("Filename: %s\n",url->filename);
    printf("Port: %d\n",url->port);
    printf("----------------------------------\n\n");
}
