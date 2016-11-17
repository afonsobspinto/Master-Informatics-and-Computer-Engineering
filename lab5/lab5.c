#include <limits.h>
#include <string.h>
#include <errno.h>
#include "test5.h"

static int proc_args(int argc, char *argv[]);
static unsigned long parse_ushort(char *str, int base);
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
			"\t service run %s -args \"init <mode> <delay>\" \n"
			"\t service run %s -args \"square <x> <y> <size> <color>\" \n"
			"\t service run %s -args \"line <xi> <yi> <xf> <yf> <color>\" \n"
			"\t service run %s -args \"xpm <xi> <yi> <xpm>\" \n" ,
			"\t service run %s -args \"move <xi> <yi> <xpm> <hor> <delta> <time>\" \n" ,
			"\t service run %s -args \"controller\" \n" ,
			argv[0], argv[0], argv[0], argv[0], argv[0], argv[0]);
}

static int proc_args(int argc, char *argv[]) {

	unsigned short mode, delay, x, y, size, color, xi, yi, xf, yf, xpm, hor, delta, time;

	if (strncmp(argv[1], "init", strlen("init")) == 0) {

		if( argc != 4 ) {
			printf("video card: wrong no of arguments for test_init() \n");
			return 1;
		}

		if( (mode = parse_ushort(argv[2], 16)) == USHRT_MAX )
			return 1;

		if( (mode = parse_ushort(argv[3], 10)) == USHRT_MAX )
			return 1;

		printf("video card:: test_init(%lu)\n", mode, delay);

		return test_init(mode, delay);
	}

	else if (strncmp(argv[1], "square", strlen("square")) == 0) {

		if( argc != 6 ) {
			printf("video card: wrong no of arguments for test_square() \n");
			return 1;
		}

		if( (x = parse_ushort(argv[2], 10)) == USHRT_MAX )
			return 1;

		if( (y = parse_ushort(argv[3], 10)) == USHRT_MAX )
			return 1;

		if( (size = parse_ushort(argv[4], 10)) == USHRT_MAX )
			return 1;

		if( (color = parse_ushort(argv[5], 16)) == USHRT_MAX )
			return 1;

		printf("video card:: test_square(%lu,%lu,%lu,%lu)\n", x,y,size,color);

		return test_square(x,y,size,color);
	}

	else if (strncmp(argv[1], "line", strlen("line")) == 0) {

		if( argc != 7 ) {
			printf("video card: wrong no of arguments for test_line() \n");
			return 1;
		}

		if( (xi = parse_ushort(argv[2], 10)) == USHRT_MAX )
			return 1;

		if( (yi = parse_ushort(argv[3], 10)) == USHRT_MAX )
			return 1;

		if( (xf = parse_ushort(argv[4], 10)) == USHRT_MAX )
			return 1;

		if( (yf = parse_ushort(argv[5], 10)) == USHRT_MAX )
			return 1;

		if( (color = parse_ushort(argv[6], 16)) == USHRT_MAX )
			return 1;

		printf("video card:: test_line(%lu, %lu, %lu, %lu)\n",xi,yi,xf,yf,color);

		return test_config(xi,yi,xf,yf,color);
	}

	else if (strncmp(argv[1], "xpm", strlen("xpm")) == 0) {

		if( argc != 5 ) {
			printf("video card: wrong no of arguments for test_xpm() \n");
			return 1;
		}

		if( (xi = parse_ushort(argv[2], 10)) == USHRT_MAX )
			return 1;

		if( (yi = parse_ushort(argv[3], 10)) == USHRT_MAX )
			return 1;

		if( (xpm = parse_ushort(argv[4], 10)) == USHRT_MAX )
			return 1;


		printf("video card:: test_xpm(%ld, %ld, %ld)\n", xi,yi,xpm);

		return test_xpm(xi,yi,xpm);
	}
	else if (strncmp(argv[1], "move", strlen("move")) == 0) {

			if( argc != 8 ) {
				printf("video card: wrong no of arguments for test_move() \n");
				return 1;
			}

			if( (xi = parse_ushort(argv[2], 10)) == USHRT_MAX )
				return 1;

			if( (yi = parse_ushort(argv[3], 10)) == USHRT_MAX )
				return 1;

			if( (xpm = parse_ushort(argv[4], 10)) == USHRT_MAX )
				return 1;

			if( (hor = parse_ushort(argv[5], 10)) == USHRT_MAX )
				return 1;

			if( (delta = parse_ushort(argv[6], 10)) == USHRT_MAX )
				return 1;

			if( (time = parse_ushort(argv[7], 10)) == USHRT_MAX )
				return 1;

			printf("video card:: test_move(%ld, %ld, %ld, %ld,%ld,%ld)\n", xi,yi,xpm, hor,delta,time);

			return test_move(xi,yi,xpm, hor, delta,time);
	}
	else if (strncmp(argv[1], "controller", strlen("controller")) == 0) {

				if( argc != 2 ) {
					printf("video card: wrong no of arguments for test_controller() \n");
					return 1;
				}

				printf("video card:: test_controller()\n");

							return test_controller();
	}
	else {
		printf("video card: non valid function \"%s\" to test\n", argv[1]);
		return 1;
	}
}

static unsigned long parse_ushort(char *str, int base) {
	char *endptr;
	unsigned long val;

	val = strtoul(str, &endptr, base);

	if ((errno == ERANGE && val == USHRT_MAX )|| (errno != 0 && val == 0)) {
		perror("strtol");
		return USHRT_MAX;
	}

	if (endptr == str) {
		printf("video card: parse_ushort: no digits were found in %s \n", str);
		return USHRT_MAX;
	}

	return val;
}
