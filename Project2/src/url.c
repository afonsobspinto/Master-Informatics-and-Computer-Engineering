#include <stdlib.h> 
#include <regex.h>
#include <string.h>
#include <stdio.h>

#include "url.h"


void initURL(URL* url){
    url->user = calloc(MAX_SIZE, sizeof(char));
    url->password = calloc(MAX_SIZE, sizeof(char));
    url->host = calloc(MAX_SIZE, sizeof(char));
    url->path = calloc(MAX_SIZE, sizeof(char));
    url->port = FTP_PORT;
}

/* URL examples
ftp://anonymous:1@speedtest.tele2.net/1MB.zip
ftp://speedtest.tele2.net/5MB.zip
ftp://ftp.fe.up.pt/welcome.msg 
*/


int parseURL(const char* urlStr, URL* url){
    const char* pattern = "ftp://(([A-Za-z0-9])*:([A-Za-z0-9])*@)?([A-Za-z0-9.~-])+/([A-Za-z0-9.~-])+";
    regex_t* regex = (regex_t*) malloc(strlen(urlStr));

    if(regcomp(regex, pattern, REG_EXTENDED) != 0){
        return -1;
    }
    if(regexec(regex, urlStr, 0, NULL, REG_EXTENDED) != 0){
        return -1;
    }

    free(regex);

    return processURL(urlStr, url);
}

// URL syntax ftp://[<user>:<password>@]<host>/<url-path>

int processURL(const char* urlStr, URL* url){
    int anonymousMode;
    char* token = (char*) malloc(strlen(urlStr));
    char* tempUrl = (char*) malloc(strlen(urlStr));

    strcpy(token, urlStr);
    strcpy(tempUrl, urlStr + 6);

    token = strtok(token+6, ":");

    anonymousMode = (strcmp(token, tempUrl) == 0) ? 1 : 0;

    if(anonymousMode){
        token = strtok(token, "/");
    }
    else{
        strcpy(url->user, token);
        token = strtok(NULL, "@");    
        strcpy(url->password, token);
        token = strtok(NULL, "/");
    }
    
    strcpy(url->host, token);

    token = strtok(NULL, "");
    
    strcpy(url->path, token);

    showURL(url);

    return 0;
}

void showURL(URL* url){
    printf("User: %s\n",url->user);
    printf("Password: %s\n",url->password);
    printf("Host: %s\n",url->host);
    printf("Path: %s\n",url->path);
    printf("Port: %d\n",url->port);
}