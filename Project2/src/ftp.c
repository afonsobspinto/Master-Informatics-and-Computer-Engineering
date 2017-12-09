#include "ftp.h"
#include "utils.h"
#include <strings.h>
#include <string.h>
#include <netinet/in.h>
#include <sys/socket.h>
#include <netinet/in.h>
#include <arpa/inet.h>
#include <unistd.h>


#include <stdio.h>

int downloadLayer(const URL* url){

    int sockfd;

    if((sockfd = connectSocket(url->ip, url->port)) < 0){
        error = CONNECT;
        return -1;
    }

    if(ftpLogin(sockfd, url->user, url->password) < 0){
        error = LOGIN;
        return -1;
    }

    if (ftpPassiveMode(sockfd) < 0) {
		error = PASSIVE_MODE;
		return -1;
	}

    return 0;
}

int connectSocket(const char* ip, int port){
    int sockfd;
    struct sockaddr_in server_addr;
    char command[MAX_SIZE];

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
    if(recvSocket(sockfd, command, sizeof(command)) <= 0){
        return -1;
    }

    return sockfd;
}

int recvSocket(int sockfd, char* command, size_t size){

  int numbytes = 0;

  if ((numbytes = recv(sockfd, command, size - 1, 0)) == -1) {
      return -1;
  }

  command[numbytes] = '\0';
  
  printf("%s\n", command);

  return numbytes;
}

int sendSocket(int sockfd, const char* command){
    
    if (write(sockfd, command, strlen(command)) != strlen(command)){
        return -1;
    }

    return 0;
}

int ftpValidateCode(const char* answer, int expected){

    if(atoi(answer) == expected){
        return 0;
    }

    return -1;
}

int ftpLogin(int sockfd, const char* user, const char* password){

    char command[MAX_SIZE];
    char answer[MAX_SIZE];

    /* User Command */
    sprintf(command, "USER %s\r\n", user);
    if (sendSocket(sockfd, command)) {
		return -1;
    }
    
    if(recvSocket(sockfd, answer, sizeof(answer)) <= 0){
        return -1;
    }

    if(ftpValidateCode(answer, FTP_USER) < 0){
        return -1;
    }    

    /* Cleaning buffers */
    memset(command, 0, sizeof(command));
    memset(answer, 0, sizeof(answer));


    /* Password Command */
    sprintf(command, "PASS %s\r\n", user);
    if (sendSocket(sockfd, command)) {
		return -1;
    }
    
    if(recvSocket(sockfd, answer, sizeof(answer)) <= 0){
        return -1;
    }

    return ftpValidateCode(answer, FTP_PASSWORD);
}

int ftpPassiveMode(int sockfd){

    char command[MAX_SIZE] = "PASV\r\n";
    char answer[MAX_SIZE];

    if (sendSocket(sockfd, command)) {
		return -1;
    }

    if(recvSocket(sockfd, answer, sizeof(answer)) <= 0){
        return -1;
    }

    int tempIP[4];
    int tempPort[2];

    if (sscanf(answer, "227 Entering Passive Mode (%d, %d, %d, %d, %d, %d)", 
        &tempIP[0], &tempIP[1], &tempIP[2], &tempIP[3], &tempPort[0], &tempPort[1]) < 6){
            printf("Scanf");
        return -1;
    }

    char ip[3*4 + 3];
    unsigned int port;

    if ((sprintf(ip, "%d.%d.%d.%d", tempIP[0], tempIP[1], tempIP[2], tempIP[3])) < 0){
        printf("sprintf");
        return -1;
    } 
    port = tempPort[0] * 256 + tempPort[1];

    printf("Passive IP: %s\n", ip);
    printf("Passive Port: %d\n", port);

/*     if((sockfd = connectSocket(ip, port)) < 0){
        return -1;
    } */

    return 0;
}
