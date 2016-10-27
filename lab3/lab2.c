#include "timer.h"
#include "i8254.h"
#include <limits.h>
#include <string.h>
#include <errno.h>

static int proc_args(int argc, char **argv);
static unsigned long parse_ulong(char *str, int base);
static void print_usage(char **argv);

int main(int argc, char **argv)
{
	/* DO NOT FORGET TO initialize service */

	sef_startup();

	if (argc == 1) {					/* Prints usage of the program if no arguments are passed */
		print_usage(argv);
		return 0;
	}
	else return proc_args(argc, argv);
}

static void print_usage(char **argv)
{
	printf("Usage: one of the following:\n"
			"\t service run %s -args \"config <decimal no.- timer>\"\n"
			"\t service run %s -args \"square <decimal no. - frequency>\"\n"
			"\t service run %s -args \"int <decimal no. - time>\"\n",
			argv[0], argv[0], argv[0]);
}

static int proc_args(int argc, char **argv)
{
	unsigned long timer, freq, time;
	if (strncmp(argv[1], "config", strlen("config")) == 0) {
		if (argc != 3) {
			printf("timer: wrong no. of arguments for timer_test_config()\n");
			return 1;
		}
		timer = parse_ulong(argv[2], 10);						/* Parses string to unsigned long */
		if (timer == ULONG_MAX)
			return 1;
		printf("timer::timer_test_config(%lu)\n", timer);
		return timer_test_config(timer);
	}
	else if (strncmp(argv[1], "square", strlen("square")) == 0) {
		if (argc != 3) {
			printf("timer: wrong no. of arguments for timer_test_square()\n");
			return 1;
		}
		freq = parse_ulong(argv[2], 10);						/* Parses string to unsigned long */
		if (freq == ULONG_MAX)
			return 1;
		printf("timer::timer_test_square(%lu)\n", freq);
		return timer_test_square(freq);
	}
	else if (strncmp(argv[1], "int", strlen("int")) == 0) {
		if (argc != 3) {
			printf("timer: wrong no of arguments for timer_test_int()\n");
			return 1;
		}
		time = parse_ulong(argv[2], 10);						/* Parses string to unsigned long */
		if (time == ULONG_MAX)
			return 1;
		printf("timer::timer_test_int(%lu)\n", time);
		return timer_test_int(time);
	}
	else {
		printf("timer: %s - no valid function!\n", argv[1]);
		return 1;
	}
}

static unsigned long parse_ulong(char *str, int base)
{
	char *endptr;
	unsigned long val;

	/* Convert string to unsigned long */
	val = strtoul(str, &endptr, base);

	/* Check for conversion errors */
	if ((errno == ERANGE && val == ULONG_MAX) || (errno != 0 && val == 0)) {
		perror("strtoul");
		return ULONG_MAX;
	}

	if (endptr == str) {
		printf("timer: parse_ulong: no digits were found in %s\n", str);
		return ULONG_MAX;
	}

	/* Successful conversion */
	return val;
}
