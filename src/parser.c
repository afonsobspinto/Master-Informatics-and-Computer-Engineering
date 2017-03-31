#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <dirent.h>
#include <sys/stat.h>
#include <errno.h>

int parser(int argc, char *argv[])
{
	DIR *dirp;
	struct dirent *direntp;
	struct stat stat_buf;
	char *str;
	if (argc != 2)
	{
		fprintf( stderr, "Usage: %s dir_name\n", argv[0]);
		exit(1);
	}
	if ((dirp = opendir( argv[1])) == NULL)
	{
		perror(argv[1]);
		exit(2);
	}
	while ((direntp = readdir( dirp)) != NULL)
	{
		lstat(direntp->d_name, &stat_buf);
		if (S_ISREG(stat_buf.st_mode)) str = "regular";
		else if (S_ISDIR(stat_buf.st_mode)) str = "directory";
		else str = "other";
		printf("%-25s - %s\n", direntp->d_name, str);
	}
	closedir(dirp);
	exit(0);
}
