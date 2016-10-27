#include "timer.h"
#include "i8042.h"
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
			"\t service run %s -args \"scan <decimal no.> \"\n"
			"\t service run %s -args \"leds <decimal no.> <array of decimal numbers>\"\n"
			"\t service run %s -args \"timed_scan <decimal no.>\"\n",
			argv[0], argv[0], argv[0]);
}

static int proc_args(int argc, char **argv)
{
	unsigned long temp;

	if (strncmp(argv[1], "scan", strlen("scan")) == 0) {
		if (argc != 3) { //argc = numero de argumentos (existem sempre 2 default -> nome da função e outra cena que nao me lembro);
			printf("scan: wrong no. of arguments for kbd_test_scan()\n");
			return 1;
		}
			temp = parse_ulong(argv[2], 10);						/* Parses string to unsigned long */
			if (temp == ULONG_MAX)
				return 1;
 		printf("scan::kbd_test_scan(%lu)\n", temp);
			return kbd_test_scan(temp);
	}


	else if (strncmp(argv[1], "leds", strlen("leds")) == 0) {
		if (argc < 3) {
			printf("leds: wrong no. of arguments for kbd_test_leds()\n");
			return 1;
		}	//argv[2] = n;
		temp = parse_ulong(argv[2], 10);						/* Parses string to unsigned long */
		if (temp == ULONG_MAX)
			return 1;

		temp_array = malloc(temp*sizeof(unsigned short)); // allocate memory; temp = n em unsigned long;

		for (unsigned int i=0; i < temp; i++){
			value = parse_ulong(argv[i+3], 10) // Reads Array elements
			if(value == ULONG_MAX)
				return 1;
			else
				temp_array.at(i)=value;
		}

		return kbd_test_leds(temp, temp_array);
	}

	else if (strncmp(argv[1], "timed_scan", strlen("timed_scan")) == 0) {
		if (argc != 3) {
			printf("timed_scan: wrong no of arguments for kbd_test_timed_scan()\n");
			return 1;
		}
		temp = parse_ulong(argv[2], 10);						/* Parses string to unsigned long */
		if (temp == ULONG_MAX)
			return 1;
		printf("timed_scan::kbd_test_timed_scan(%lu)\n", temp);
		return kbd_test_timed_scan(temp);
	}
	else {
		printf("timed_scan: %s - no valid function!\n", argv[1]);
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
