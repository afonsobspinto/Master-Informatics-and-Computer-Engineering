#include "ftp.h"
#include "utils.h"
#include <strings.h>
#include <netinet/in.h>
#include <sys/socket.h>
#include <netinet/in.h>
#include <arpa/inet.h>

#include <stdio.h>

int downloadLayer(const URL* url){

    int sockfd;

    if((sockfd = connectSocket(url->ip, url->port)) < 0){
        error = CONNECT;
        return -1;
    }

    return 0;
}

int connectSocket(const char* ip, int port){
    int sockfd;
    struct sockaddr_in server_addr;
    char buffer[MAX_SIZE];

    /*server address handling*/
	bzero((char*)&server_addr,sizeof(server_addr));
	server_addr.sin_family = AF_INET;
	server_addr.sin_addr.s_addr = inet_addr(ip);
    server_addr.sin_port = htons(port);

    /*open an TCP socket*/
	if ((sockfd = socket(AF_INET, SOCK_STREAM, 0)) < 0) {
		return -1;
    }
    
    /*connect to the server*/
	if(connect(sockfd, (struct sockaddr *)&server_addr, sizeof(server_addr)) < 0){
        return -1;
    }

    /*read answer from server*/
    if(recvSocket(sockfd, buffer, sizeof(buffer)) < 0){
        return -1;
    }

    return sockfd;
}

int recvSocket(int sockfd, char* buffer, size_t length){

    int numbytes = 0;
    
    if ((numbytes = recv(sockfd, buffer, length - 1, 0)) == -1) {
       return -1;
    }
    
    buffer[numbytes] = '\0';
    
    return numbytes;
}
