/*
 ============================================================================
 Name        : Hello.c
 Author      : 
 Version     :
 Copyright   : Your copyright notice
 Description : Hello World in C, Ansi-style
 ============================================================================
 */

#include <stdio.h>
#include <stdlib.h>

int main(int argc, char *argv[]) {
	puts("!!!Hello World!!!"); /* prints !!!Hello World!!! */

	if (argc != 2)
	{
		fprintf( stderr, "Usage: %s dir_name\n", argv[0]);
		exit(1);
	}

	parser(argc, argv[1]);
	return 0;
}
