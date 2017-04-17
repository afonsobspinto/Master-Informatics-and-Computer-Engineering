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
#include <unistd.h>
#include "signal.h"
#include "action.h"
#include "args.h"
#include "parser.h"

extern int child_counter;
//struct sigaction oldsigaction;

void parser(const char *path, const struct Args* args)
{
	DIR *dirp;
	struct dirent *direntp;
	struct stat statBuf;
	char *str;
	int status;
	pid_t pid;

	dirp = opendir(path);
	if (dirp == NULL) {
		perror("opendir");
		exit(-4);
	}

	while ((direntp = readdir(dirp))) {
		if (!strcmp(direntp->d_name, ".") || !strcmp(direntp->d_name, "..")) {
			continue;
		}

		//sleep(5); //To test signal handler
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
			performAction(args, abs_path);
		}

		if (S_ISDIR(statBuf.st_mode)) {

			if((pid =fork())<0){
				fprintf(stderr,"fork error\n");
			}

			else if(pid){
				child_counter++;

			}
			else if (pid == 0) {

//				sigaction(SIGTSTP, &oldsigaction,0);
//				signal(SIGINT, SIG_IGN);
				child_counter = 0;
				parser(abs_path, args);
				while(child_counter--){
					wait(0);
				}
				exit(0);
			}
		}

		free(abs_path);
	}

	return;
}


bool isValidFile(const struct stat* statBuf, const struct dirent *direntp, const struct Args* args){

	if(strcmp(direntp->d_name,  args->name)==0)
		return true;

	if(strcmp(args->type, "")!=0){
		if(strcmp(args->type, "f")==0 && (S_ISREG(statBuf->st_mode)))
			return true;
		else if(strcmp(args->type, "d")==0 && (S_ISDIR(statBuf->st_mode)))
			return true;

		else if(strcmp(args->type, "l")==0 && (S_ISLNK(statBuf->st_mode)))
			return true;
		else
			return false;
	}
	if(args->perm != 0){
		if(((statBuf->st_mode & (S_IRWXU | S_IRWXG | S_IRWXO)) == args->perm))
			return true;
	}
	return false;
}


