#include <minix/drivers.h>
#include "pixmap.h"
#include "test5.h"

static int proc_args(int argc, char *argv[]);
static unsigned short parse_char(char *str, int base);
static unsigned short parse_ushort(char *str, int base);
static unsigned long parse_ulong(char *str, int base);
static long parse_long(char *str, int base);
static void print_usage(char *argv[]);

int main(int argc, char **argv) {

  sef_startup();

  if ( argc == 1 ) {
      print_usage(argv);
      return 0;
  } else {
	  proc_args(argc, argv);
  }
  return 0;

}

static void print_usage(char *argv[]) {
	printf("Usage: one of the following:\n"
			"\t service run %s -args \"init <mode> <delay>\" \n"
			"\t service run %s -args \"square <x> <y> <size> <color>\" \n"
			"\t service run %s -args \"line <xi> <yi> <xf> <yf> <color>\" \n"
			"\t service run %s -args \"xpm <xi> <yi> <xpm_id>\" \n"
			"\t service run %s -args \"move <xi> <yi> <xpm_id> <hor> <delta> <time>\" \n"
			"\t service run %s -args \"controller\" \n" ,
			argv[0], argv[0], argv[0], argv[0], argv[0], argv[0]);
}

static int proc_args(int argc, char *argv[]) {

	unsigned n;
	unsigned short mode, delay, square, x, y, size, color, xi, yi, xf, yf, xpm_id, hor, delta, time;

	/* check the function to test: if the first characters match, accept it */
	if (strncmp(argv[1], "init", strlen("init")) == 0) {
		if( argc != 4 ) {
			printf("video graphics: wrong no of arguments for test of test_init() \n");
			return 1;
		}
		if( (mode = parse_ushort(argv[2], 16)) == USHRT_MAX )
			return 1;

		if( (delay = parse_ushort(argv[3], 10)) == USHRT_MAX )
			return 1;

		printf("video graphics: test_init(%d, %d)\n", mode, delay);

		test_init(mode, delay);

		return 0;

	} else if (strncmp(argv[1], "square", strlen("square")) == 0) {
		if( argc != 6 ) {
			printf("video graphics: wrong no of arguments for test of test_square() \n");
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

		printf("video graphics:: test_square(%d, %d, %d, %d)\n", x, y, size, color);

		return test_square(x, y, size, color);

	} else if (strncmp(argv[1], "line", strlen("line")) == 0) {
		if( argc != 7 ) {
			printf("video graphics: wrong no of arguments for test of test_line() \n");
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

		printf("video graphics: test_line(%d, %d, %d, %d, %d)\n",
				xi, yi, xf, yf, color);
		return test_line(xi, yi, xf, yf, color);

	} else if (strncmp(argv[1], "xpm", strlen("xpm")) == 0) {

		if( argc != 5 ) {
			printf("video graphics: wrong no of arguments for test of test_xpm() \n");
			return 1;
		}
		if( (xi = parse_ushort(argv[2], 10)) == USHRT_MAX )
			return 1;

		if( (yi = parse_ushort(argv[3], 10)) == USHRT_MAX )
			return 1;

		if( (xpm_id = parse_ushort(argv[4], 10)) == USHRT_MAX )
			return 1;

		if(pixmap_get(xpm_id) == 0)
		{
			printf("video graphics: pixmap not found\n");
			return 1;
		}

		printf("video graphics:: test_xpm(%d, %d, pixmaps[%d])\n",
				xi, yi, xpm_id);

		return test_xpm(xi, yi, pixmap_get(xpm_id));

	} else if (strncmp(argv[1], "move", strlen("move")) == 0) {

		if( argc < 8 ) {
			printf("video graphics: wrong no of arguments for test of test_move() \n");
			return 1;
		}

		if( (xi = parse_ushort(argv[2], 10)) == USHRT_MAX )
			return 1;

		if( (yi = parse_ushort(argv[3], 10)) == USHRT_MAX )
			return 1;

		if( (xpm_id = parse_ushort(argv[4], 10)) == USHRT_MAX )
			return 1;

		if(pixmap_get(xpm_id) == NULL)
		{
			printf("video graphics: pixmap not found\n");
			return 1;
		}

		if( (hor = parse_ushort(argv[5], 10)) == USHRT_MAX )
			return 1;

		if( (delta = parse_ushort(argv[6], 10)) == USHRT_MAX )
			return 1;

		if( (time = parse_ushort(argv[7], 10)) == USHRT_MAX )
			return 1;

		printf("video graphics:: test_move(%d, %d, pixmaps[%d], %d, %d, %d)\n", xi, yi, xpm_id, hor, delta, time);

		return test_move(xi, yi, pixmap_get(xpm_id), hor, delta, time);

	} else if (strncmp(argv[1], "controller", strlen("controller")) == 0) {
		if( argc != 2 ) {
			printf("video graphics: wrong no of arguments for test of test_controller() \n");
			return 1;
		}

		printf("video graphics:: test_controller()\n");

		return test_controller();

	} else {

		printf("video graphics: non valid function \"%s\" to test\n", argv[1]);

		return 1;
	}
}

static unsigned short parse_char(char *str, int base) {
	char *endptr;
	unsigned long val;

	val = strtoul(str, &endptr, base);

	if ((errno == ERANGE && val == CHAR_MAX ) || (errno != 0 && val == 0)) {
		perror("strtol");
		return CHAR_MAX;
	}

	if (endptr == str) {
		printf("video graphics: parse_char: no digits were found in %s \n", str);
		return CHAR_MAX;
	}

	/* Successful conversion */
	return val;
}

static unsigned short parse_ushort(char *str, int base) {
	char *endptr;
	unsigned long val;

	val = strtoul(str, &endptr, base);

	if ((errno == ERANGE && val == USHRT_MAX )
			|| (errno != 0 && val == 0)) {
		perror("strtol");
		return USHRT_MAX;
	}

	if (endptr == str) {
		printf("video graphics: parse_ushort: no digits were found in %s \n", str);
		return USHRT_MAX;
	}

	/* Successful conversion */
	return val;
}

static unsigned long parse_ulong(char *str, int base) {
	char *endptr;
	unsigned long val;

	val = strtoul(str, &endptr, base);

	if ((errno == ERANGE && val == ULONG_MAX ) || (errno != 0 && val == 0)) {
		perror("strtol");
		return ULONG_MAX;
	}

	if (endptr == str) {
		printf("video graphics: parse_ulong: no digits were found in %s \n", str);
		return SHRT_MAX;
	}

	/* Successful conversion */
	return val;
}

static long parse_long(char *str, int base) {
	char *endptr;
	unsigned long val;

	val = strtol(str, &endptr, base);

	if ((errno == ERANGE && (val == LONG_MAX || val == LONG_MIN)) || (errno != 0 && val == 0)) {
		perror("strtol");
		return LONG_MAX;
	}

	if (endptr == str) {
		printf("video graphics: parse_long: no digits were found in %s \n", str);
		return LONG_MAX;
	}

	/* Successful conversion */
	return val;
}
