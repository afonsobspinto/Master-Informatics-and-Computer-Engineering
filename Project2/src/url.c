#include <stdlib.h> 
#include <regex.h>
#include <string.h>
#include <stdio.h>
#include <netdb.h>
#include <sys/socket.h>
#include <netinet/in.h>
#include <arpa/inet.h>

#include "url.h"
#include "utils.h"


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

// URL syntax ftp://[<user>:<password>@]<host>/<url-path>

int processURL(const char* urlStr, URL* url){
    int anonymousMode;
    char* token = (char*) malloc(strlen(urlStr));
    char* tempUrl = (char*) malloc(strlen(urlStr));

    strcpy(token, urlStr);
    strcpy(tempUrl, urlStr + 6);

    if(!(token = strtok(token+6, ":"))){
        error = TOKEN;
        return -1;
    }

    anonymousMode = (strcmp(token, tempUrl) == 0) ? 1 : 0;

    if(anonymousMode){
        url->user = "anonymous";
        url->password = "guest"; //TODO: Change this to email
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
    
    strcpy(url->path, token);

    getIpByHost(url);

    showURL(url);
  
    return 0;
}

int getIpByHost(URL* url){
    struct hostent* h;
    if ((h = gethostbyname(url->host)) == NULL) {
		return -1;
    }
    
    url->ip = inet_ntoa(*((struct in_addr *) h->h_addr_list[0]));

    return 0;
}

void showURL(URL* url){
    printf("User: %s\n",url->user);
    printf("Password: %s\n",url->password);
    printf("Host: %s\n",url->host);
    printf("Ip: %s\n", url->ip);
    printf("Path: %s\n",url->path);
    printf("Port: %d\n",url->port);
}