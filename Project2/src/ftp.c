
#include <stdlib.h>
#include <string.h>
#include <stdio.h>
#include <unistd.h>
#include <arpa/inet.h>
#include "ftp.h"
#include "utils.h"

int downloadLayer(const Url url)
{
	Ftp ftp;

	printf("-------- FTP DOWNLOADING ---------\n\n");

	if (openConnection(&ftp, url.ip, url.port) < 0)
	{
		error = CONNECT;
		return -1;
	}

	if (ftpLogin(&ftp, url.user, url.password))
	{
		error = LOGIN;
		return -1;
	}

	if (ftpCWD(&ftp, url.path))
	{
		error = CWD;
		return -1;
	}

	if (ftpPassiveMode(&ftp) < 0)
	{
		error = PASSIVE_MODE;
		return -1;
	}

	if (ftpRetrieve(&ftp, url.filename) < 0)
	{
		error = RETRIEVE;
		return -1;
	}

	if (ftpDownload(&ftp, url.filename) < 0)
	{
		error = DOWNLOAD;
		return -1;
	}

	if (ftpDisconnect(&ftp) < 0)
	{
		error = DISCONNECT;
		return -1;
	}

	printf("----------------------------------\n\n");

	return 0;
}

int connectSocket(const char *ip, int port)
{
	int sockfd;
	struct sockaddr_in server_addr;

	/*server address handling*/

	bzero((char *)&server_addr, sizeof(server_addr));
	server_addr.sin_family = AF_INET;
	server_addr.sin_addr.s_addr = inet_addr(ip);
	server_addr.sin_port = htons(port);

	/*open an TCP socket*/
	if ((sockfd = socket(AF_INET, SOCK_STREAM, 0)) < 0)
	{
		return -1;
	}

	/*connect to the server*/
	if (connect(sockfd, (struct sockaddr *)&server_addr, sizeof(server_addr)) < 0)
	{
		return -1;
	}

	return sockfd;
}

int openConnection(Ftp *ftp, const char *ip, int port)
{
	int sockfd;

	if ((sockfd = connectSocket(ip, port)) < 0)
	{
		return -1;
	}

	ftp->sockfd = sockfd;
	ftp->datafd = 0;

	char answer[MAX_SIZE];
	if (recvSocket(ftp, answer, sizeof(answer)))
	{
		return -1;
	}

	return sockfd;
}

int ftpLogin(Ftp *ftp, const char *user, const char *password)
{
	char command[MAX_SIZE];
	char answer[MAX_SIZE];

	/* User Command */
	sprintf(command, "USER %s\r\n", user);
	if (sendSocket(ftp, command))
	{
		return -1;
	}

	if (recvSocket(ftp, answer, sizeof(answer)) < 0)
	{
		return -1;
	}

	if (ftpValidateCode(answer, FTP_USER) < 0)
	{
		return -1;
	}

	/* Cleaning buffers */
	memset(command, 0, sizeof(command));
	memset(answer, 0, sizeof(answer));

	/* Password Command */
	sprintf(command, "PASS %s\r\n", password);
	if (sendSocket(ftp, command))
	{
		return -1;
	}

	if (recvSocket(ftp, answer, sizeof(answer)) < 0)
	{
		return -1;
	}

	return ftpValidateCode(answer, FTP_PASSWORD);
}

int ftpCWD(Ftp *ftp, const char *path)
{
	char command[MAX_SIZE];
	char answer[MAX_SIZE];

	sprintf(command, "CWD %s\r\n", path);
	if (sendSocket(ftp, command))
	{
		return -1;
	}

	if (recvSocket(ftp, answer, sizeof(answer)))
	{
		return -1;
	}

	if (ftpValidateCode(answer, FTP_CWD) < 0)
	{
		return -1;
	}

	return 0;
}

int ftpPassiveMode(Ftp *ftp)
{
	char command[MAX_SIZE] = "PASV\r\n";
	char answer[MAX_SIZE];

	if (sendSocket(ftp, command))
	{
		return -1;
	}

	if (recvSocket(ftp, answer, sizeof(answer)) < 0)
	{
		return -1;
	}

	if (ftpValidateCode(answer, FTP_PASSIVE_MODE) < 0)
	{
		return -1;
	}

	int tempIP[4];
	int tempPort[2];

	if (sscanf(answer, "227 Entering Passive Mode (%d, %d, %d, %d, %d, %d)",
			   &tempIP[0], &tempIP[1], &tempIP[2], &tempIP[3], &tempPort[0], &tempPort[1]) < 6)
	{
		return -1;
	}

	char ip[3 * 4 + 3];
	unsigned int port;

	if ((sprintf(ip, "%d.%d.%d.%d", tempIP[0], tempIP[1], tempIP[2], tempIP[3])) < 0)
	{
		return -1;
	}
	port = tempPort[0] * 256 + tempPort[1];

	if ((ftp->datafd = connectSocket(ip, port)) < 0)
	{
		return -1;
	}

	return 0;
}

int ftpRetrieve(Ftp *ftp, const char *filename)
{
	char command[MAX_SIZE];
	char answer[MAX_SIZE];

	sprintf(command, "RETR %s\r\n", filename);
	if (sendSocket(ftp, command))
	{
		return -1;
	}

	if (recvSocket(ftp, answer, sizeof(answer)))
	{
		return -1;
	}

	if (ftpValidateCode(answer, FTP_RETRIEVE) < 0)
	{
		return -1;
	}

	return 0;
}

int ftpDownload(Ftp *ftp, const char *filename)
{
	FILE *file;

	if ((file = fopen(filename, "wb")) == NULL)
	{
		return -1;
	}

	int numBytes = 0;
	char buf[MAX_SIZE];

	do
	{
		if ((numBytes = recv(ftp->datafd, buf, sizeof(buf), 0)) < 0)
		{
			return -1;
		}
		if (fwrite(buf, 1, numBytes, file) != numBytes)
		{
			return -1;
		}
	} while (numBytes == MAX_SIZE);

	if (fclose(file) != 0)
	{
		return -1;
	}

	if (close(ftp->datafd) < 0)
	{
		return -1;
	}

	char answer[MAX_SIZE];

	if (recvSocket(ftp, answer, sizeof(answer)))
	{
		return -1;
	}

	if (ftpValidateCode(answer, FTP_DATA_CONNECTION) < 0)
	{
		return -1;
	}

	return 0;
}

int ftpDisconnect(Ftp *ftp)
{
	char command[MAX_SIZE];
	char answer[MAX_SIZE];

	sprintf(command, "QUIT\r\n");
	if (sendSocket(ftp, command))
	{
		return -1;
	}

	if (recvSocket(ftp, answer, sizeof(answer)))
	{
		return -1;
	}

	if (ftpValidateCode(answer, FTP_CLOSE) < 0)
	{
		return -1;
	}

	if (close(ftp->sockfd) < 0)
	{
		return -1;
	}

	return 0;
}

int sendSocket(Ftp *ftp, const char *command)
{
	if (write(ftp->sockfd, command, strlen(command)) != strlen(command))
	{
		return -1;
	}

	return 0;
}

int recvSocket(Ftp *ftp, char *str, size_t size) //TODO: Change this to use recv - but feup ftp server Problem
{
	FILE *fp = fdopen(ftp->sockfd, "r");

	do
	{
		memset(str, 0, size);
		str = fgets(str, size, fp);
		printf("%s", str);
	} while (!('1' <= str[0] && str[0] <= '5') || str[3] != ' ');

	printf("\n");
	return 0;
}

int ftpValidateCode(const char *answer, int expected)
{

	if (atoi(answer) == expected)
	{
		return 0;
	}

	return -1;
}
