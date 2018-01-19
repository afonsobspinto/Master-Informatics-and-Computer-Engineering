
#include <libgen.h>
#include <stdlib.h> 
#include <regex.h>
#include <string.h>
#include <stdio.h>
#include <netdb.h>
#include <arpa/inet.h>
#include "utils.h"


int printUsage(const char* programName){
    printf("Usage: %s ftp://[<user>:<password>@]<host>/<url-path>\n", programName);
    return -1;
}

int errorMessage(const char* errorMessage){
    fprintf(stderr, "%s: %s\n", errorMessage, errorStr[error]);
    return -1;
}

int validateEmail(const char* emailStr){
    const char* pattern = "[A-Za-z]+[A-Za-z0-9._]+@[A-Za-z]+[A-Za-z0-9.]+.[A-Za-z]{2,4}";
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
    
	printf ("Anonymous Mode. \nPlease enter your email as password: \n");
    scanf ("%s", buf);
	if(validateEmail(buf) < 0){
		printf("Invalid email\n");
		return getEmail(email);
	}
	int i;
	for(i = 0; i < 50; ++i)
        email[i] = buf[i];
    
	return 0;
}
