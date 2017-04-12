#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <dirent.h>
#include <sys/stat.h>
#include <errno.h>
#include <sys/types.h>
#include <unistd.h>
#include <stdio.h>
#include <stdbool.h>
#include "args.h"
#include "vector.h"
#include "parser.h"


void parser(const char *path, const struct Args* args, vector* files)
{
	DIR *dirp;
	struct dirent *direntp;
	struct stat statBuf;
	char *str;
	pid_t pid;
	int status;


	dirp = opendir(path);
	if (dirp == NULL) {
		perror("opendir");
		exit(2);
	}

	while ((direntp = readdir(dirp))) {
		if (!strcmp(direntp->d_name, ".") || !strcmp(direntp->d_name, "..")) {
			continue;
		}
		char *abs_path = malloc(strlen(path) + strlen(direntp->d_name) + 2);
		if (!abs_path) {
			perror("malloc");
			exit(EXIT_FAILURE);
		}
		strcpy(abs_path, path);
		strcat(abs_path, "/");
		strcat(abs_path, direntp->d_name);

		if (lstat(abs_path, &statBuf) < 0) {
					free(abs_path);
					continue;
				}

		if(isValidFile(&statBuf, direntp, args)){
			printf("true");
			vector_add(files, abs_path);
		}

		if(S_ISREG(statBuf.st_mode)){
			str = "regular";
		}

		else if (S_ISDIR(statBuf.st_mode)) {
			str = "directory";

//			if((pid=fork())<0){
//				fprintf(stderr,"fork error\n");
//			}

			//else if (pid == 0) { //Update Dir & Recall Function
				parser(abs_path, args, files);
			//}
		}

		else{
			str = "other";
		}
		printf("%-25s - %s\n", direntp->d_name, str);
		free(abs_path);
	}
	closedir(dirp);
    while ((pid = wait(&status)) > 0)
    {
        printf("Exit status of %d was %d (%s)\n", (int)pid, status,
               (status > 0) ? "accept" : "reject");
    }
	return;
}


bool isValidFile(const struct stat* statBuf, const struct dirent *direntp, const struct Args* args){
	if((args->name != "") && (direntp->d_name == args->name))
		return true;
	else if(args->type == ""){
		if((args->type == "r") && (S_ISREG(statBuf->st_mode)))
			return true;
		else if((args->type == "d") && (S_ISDIR(statBuf->st_mode)))
			return true;
		else if((args->type == "l") && (S_ISLNK(statBuf->st_mode)))
			return true;
		else
			return false;
	}
	//else if((args->perm != 0))

	return false;
}
