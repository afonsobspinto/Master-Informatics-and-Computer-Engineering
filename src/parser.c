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

int parser(char directory[])
{
	DIR *dirp;
	struct dirent *direntp;
	struct stat stat_buf;
	char *str;
	pid_t pid;

	if ((dirp = opendir(directory)) == NULL)
	{
		perror(directory);
		exit(2);
	}
	while ((direntp = readdir(dirp)) != NULL)
	{


		lstat(direntp->d_name, &stat_buf);
		if (S_ISREG(stat_buf.st_mode)){ // Is this the file I'm looking for?
			str = "regular";
		}
		else if (S_ISDIR(stat_buf.st_mode)){ // Fork Here

			if (strcmp(direntp->d_name, ".") == 0 || strcmp(direntp->d_name, "..") == 0)
				continue;


			str = "directory";
			strcat(directory, "/");
			parser(strcat(directory, direntp->d_name));

//			if((pid=fork())<0){
//				 fprintf(stderr,"fork error\n");
//			}
//			 else if (pid == 0) { //Update Dir & Recall Function
//			 }

		}
		else{
			str = "other";
		}
		printf("%-25s - %s\n", direntp->d_name, str);
	}
	closedir(dirp);


	waitpid(-1,NULL,0); //Make parent wait for all Childs (do it after find the cena)
	exit(0);
}
