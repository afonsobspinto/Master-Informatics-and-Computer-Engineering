#include <limits.h>
#include <string.h>
#include <errno.h>
#include "test4.h"

static int proc_args(int argc, char *argv[]);
static unsigned long parse_ulong(char *str, int base);
static long parse_long(char *str, int base);
static void print_usage(char *argv[]);

int main(int argc, char **argv) {

	sef_startup();

	if ( argc == 1 ) {
		print_usage(argv);
		return 0;
	}
	return proc_args(argc, argv);
}

static void print_usage(char *argv[]) {
	printf("Usage: one of the following:\n"
			"\t service run %s -args \"packet <packet>\" \n"
			"\t service run %s -args \"async <time>\" \n"
			"\t service run %s -args \"config\" \n"
			"\t service run %s -args \"gesture <length>\" \n" ,
			argv[0], argv[0], argv[0], argv[0]);
}

static int proc_args(int argc, char *argv[]) {

	unsigned long packet, time;
	long length;

	if (strncmp(argv[1], "test_packet", strlen("test_packet")) == 0) {

		if( argc != 3 ) {
			printf("mouse: wrong no of arguments for test_packet() \n");
			return 1;
		}

		if( (packet = parse_ulong(argv[2], 10)) == ULONG_MAX )
			return 1;

		printf("mouse:: test_packet(%lu)\n", packet);

		return test_packet(packet);
	}

	else if (strncmp(argv[1], "test_async", strlen("test_async")) == 0) {

		if( argc != 3 ) {
			printf("mouse: wrong no of arguments for test_async() \n");
			return 1;
		}

		if( (time = parse_ulong(argv[2], 10)) == ULONG_MAX )
			return 1;

		printf("mouse:: test_async(%lu)\n", time);

		return test_async(time);
	}

	else if (strncmp(argv[1], "test_config", strlen("test_config")) == 0) {

		if( argc != 2 ) {
			printf("mouse: wrong no of arguments for test_config() \n");
			return 1;
		}

		printf("mouse:: test_config()\n");

		return test_config();
	}

	else if (strncmp(argv[1], "test_gesture", strlen("test_gesture")) == 0) {

		if( argc != 3 ) {
			printf("mouse: wrong no of arguments for test_gesture() \n");
			return 1;
		}

		if( (length = parse_long(argv[2], 10)) == LONG_MAX )
			return 1;

		printf("mouse:: test_gesture(%ld)\n", length);

		return test_gesture(length);
	}

	else {
		printf("mouse: non valid function \"%s\" to test\n", argv[1]);
		return 1;
	}
}

static unsigned long parse_ulong(char *str, int base) {
	char *endptr;
	unsigned long val;

	val = strtoul(str, &endptr, base);

	if ((errno == ERANGE && val == ULONG_MAX )|| (errno != 0 && val == 0)) {
		perror("strtol");
		return ULONG_MAX;
	}

	if (endptr == str) {
		printf("mouse: parse_ulong: no digits were found in %s \n", str);
		return ULONG_MAX;
	}

	return val;
}
