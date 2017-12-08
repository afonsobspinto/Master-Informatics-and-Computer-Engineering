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

    return 0;
}

int connectSocket(const char* ip, int port){
    int sockfd;
    struct sockaddr_in server_addr;
    char message[MAX_SIZE];

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
    if(recvSocket(sockfd, message, sizeof(message)) <= 0){
        return -1;
    }

    return sockfd;
}

int recvSocket(int sockfd, char* message, size_t size){

  int numbytes = 0;

  if ((numbytes = recv(sockfd, message, size - 1, 0)) == -1) {
      return -1;
  }

  message[numbytes] = '\0';
  
  printf("%s\n", message);

  return numbytes;
}

int sendSocket(int sockfd, const char* message){
    
    if (write(sockfd, message, strlen(message)) != strlen(message)){
        return -1;
    }

    return 0;
}

int ftpLogin(int sockfd, const char* user, const char* password){

    char message[MAX_SIZE];
    char answer[MAX_SIZE];

    /* User Command */
    sprintf(message, "USER %s\r\n", user);
    if (sendSocket(sockfd, message)) {
		return -1;
    }
    
    if(recvSocket(sockfd, answer, sizeof(answer)) <= 0){
        return -1;
    }

    if(validateCode(answer, FTP_USER) < 0){
        return -1;
    }    

    /* Cleaning buffers */
    memset(message, 0, sizeof(message));
    memset(answer, 0, sizeof(answer));


    /* Password Command */
    sprintf(message, "PASS %s\r\n", user);
    if (sendSocket(sockfd, message)) {
		return -1;
    }
    
    if(recvSocket(sockfd, answer, sizeof(answer)) <= 0){
        return -1;
    }

    return validateCode(answer, FTP_PASSWORD);
}

int validateCode(const char* answer, int expected){

    if(atoi(answer) == expected){
        return 0;
    }

    return -1;

}