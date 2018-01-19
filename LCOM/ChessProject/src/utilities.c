#include "utilities.h"

#include <stdio.h>

int fileExists(const char* filename){
	FILE* file = fopen(filename, "r");

	if(file){
		fclose(file);
		return 1;
	}
	return 0;
}
