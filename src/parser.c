#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <dirent.h>
#include <sys/stat.h>
#include <errno.h>
#include <sys/types.h>
#include <unistd.h>
#include <sys/wait.h>
#include <stdio.h>

int parser(const char *path)
{
	DIR *dirp;
	struct dirent *direntp;
	struct stat statBuf;
	char *str;
	pid_t pid;

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

		if(S_ISREG(statBuf.st_mode)){
			str = "regular";
		}

		else if (S_ISDIR(statBuf.st_mode)) {
			str = "directory";

			if((pid=fork())<0){
				fprintf(stderr,"fork error\n");
			}

			else if (pid == 0) { //Update Dir & Recall Function
				parser(abs_path);
			}
		}

		else{
			str = "other";
		}
		printf("%-25s - %s\n", direntp->d_name, str);
		free(abs_path);
	}
	closedir(dirp);
	//waitpid(-1,NULL,0); //Make parent wait for all Childs (Guardar PIDs num array)
	exit(0);
}
