#include <stdio.h>
#include <sys/types.h>
#include <sys/stat.h>
#include <unistd.h>
#include "utilities.h"

int getFileName(char *filename){

  printf("Enter file path : ");
  scanf("%s", filename);

  return 0;
}

int getFileSize(FILE *fd){
  struct stat s;
  if (fstat(fileno(fd), &s) == -1) {
    return (-1);
  }
  return (s.st_size);
}
