#include <minix/syslib.h>
#include <minix/drivers.h>
#include <minix/com.h>
#include <stdio.h>

#include "test5.h"
#include "pixmap.h"
#include "video_gr.h"
#include "timer.h"

static int proc_args(int argc, char *argv[]);
static unsigned long parse_ulong(char *str, int base);
static long parse_long(char *str, int base);
static void print_usage(char *argv[]);

int main(int argc, char **argv)
{

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

static int proc_args(int argc, char *argv[])
{

  if (strncmp(argv[1], "init", strlen("init")) == 0) {
	  if( argc != 4 ) {
		  printf("vbe: wrong number of arguments for test_init() \n");
		  return 1;
	  }

	  unsigned short mode = parse_ulong(argv[2], 16);
	  unsigned short delay = parse_ulong(argv[3], 10);

	  printf("vbe:: test_init(0x%X, %u)\n", mode, delay);

	  test_init(mode, delay);

	  return 0;
  }
  else if (strncmp(argv[1], "square", strlen("square")) == 0)
  {
	  if( argc != 6 ) {
		  printf("vbe: wrong number of arguments for test_square() \n");
		  return 1;
	  }

	  unsigned short x, y, size, color;
	  x = parse_ulong(argv[2], 10);
	  y = parse_ulong(argv[3], 10);
	  size = parse_ulong(argv[4], 10);
	  color = parse_ulong(argv[5], 10);

	  printf("vbe:: test_square(%u, %u, %u, %u)\n", x, y, size, color);

	  test_square(x, y, size, color);

	  return 0;
  }
  else if (strncmp(argv[1], "line", strlen("line")) == 0)
  {
	  if( argc != 7 ) {
		  printf("vbe: wrong number of arguments for test_line() \n");
		  return 1;
	  }

	  unsigned short xi, yi, xf, yf, color;
	  xi = parse_ulong(argv[2], 10);
	  yi = parse_ulong(argv[3], 10);
	  xf = parse_ulong(argv[4], 10);
	  yf = parse_ulong(argv[5], 10);

	  color = parse_ulong(argv[6], 10);

	  printf("vbe:: test_line(%u, %u, %u, %u, %u)\n", xi, yi, xf, yf, color);

	  test_line(xi, yi, xf, yf, color);

	  return 0;
  }
  else if (strncmp(argv[1], "xpm", strlen("xpm")) == 0)
  {
	  if( argc != 5 ) {
		  printf("vbe: wrong no of arguments for test_xpm() \n");
		  return 1;
	  }

	  unsigned short x;
	  unsigned short y;

	  x = parse_ulong(argv[2], 10);
	  y = parse_ulong(argv[3], 10);

	  char **xpm;

	  if(strncmp(argv[4], "pic1", strlen("pic1")) == 0)
		  xpm = pic1;

	  else if (strncmp(argv[4], "pic2", strlen("pic2")) == 0)
		  xpm = pic2;

	  else if (strncmp(argv[4], "cross", strlen("cross")) == 0)
		  xpm = cross;

	  else if (strncmp(argv[4], "pic3", strlen("pic3")) == 0)
		  xpm = pic3;

	  else if (strncmp(argv[4], "penguin", strlen("penguin")) == 0)
		  xpm = penguin;

	  else{
		  printf("\n Invalid xpm. Options: pic1, pic2, pic3, cross, penguin\n\n");
		  return 0;
	  }

	  printf("vbe:: test_xpm(%u, %u, xpm)\n", x, y);

	  test_xpm(x, y, xpm);

	  return 0;
  }
  else if (strncmp(argv[1], "move", strlen("move")) == 0)
  {
	  if( argc != 8 ) {
		  printf("vbe: wrong number of arguments for test_move() \n");
		  return 1;
	  }

	  unsigned short x;
	  unsigned short y;

	  x = parse_ulong(argv[2], 10);
	  y = parse_ulong(argv[3], 10);

	  char **xpm;

	  if(strncmp(argv[4], "pic1", strlen("pic1")) == 0)
		  xpm = pic1;

	  else if (strncmp(argv[4], "pic2", strlen("pic2")) == 0)
		  xpm = pic2;

	  else if (strncmp(argv[4], "cross", strlen("cross")) == 0)
		  xpm = cross;

	  else if (strncmp(argv[4], "pic3", strlen("pic3")) == 0)
		  xpm = pic3;

	  else if (strncmp(argv[4], "penguin", strlen("penguin")) == 0)
		  xpm = penguin;

	  else
	  {
		  printf("\n Invalid xpm. Options: pic1, pic2, pic3, cross, penguin\n\n");
		  return 0;
	  }

	  unsigned short hor, time;
	  short delta;
	  hor = parse_ulong(argv[5], 10);
	  delta = parse_ulong(argv[6], 10);
	  time = parse_ulong(argv[7], 10);

	  printf("vbe:: test_move(%u, %u, xpm, %u, %d, %u)\n", x, y, hor, delta, time);

	  test_move(x, y, xpm, hor, delta, time);

	  return 0;
  }
  else if (strncmp(argv[1], "test_controller", strlen("test_controller")) == 0)
  {
	  if( argc != 2 ) {
		  printf("vbe: wrong number of arguments for test_controller() \n");
		  return 1;
	  }

	  printf("vbe:: test_controller()\n");

	  test_controller();

	  return 0;
  }
  else {
	  printf("vbe: invalid function \"%s\" to test\n", argv[1]);
	  return 1;
  }
}

static unsigned long parse_ulong(char *str, int base) {
  char *endptr;
  unsigned long val;

  val = strtoul(str, &endptr, base);

  if ((errno == ERANGE && val == ULONG_MAX )
	  || (errno != 0 && val == 0)) {
	  perror("strtol");
	  return ULONG_MAX;
  }

  if (endptr == str) {
	  printf("video_txt: parse_ulong: no digits were found in %s \n", str);
	  return ULONG_MAX;
  }

  /* Successful conversion */
  return val;
}

static long parse_long(char *str, int base) {
  char *endptr;
  unsigned long val;

  val = strtol(str, &endptr, base);

  if ((errno == ERANGE && (val == LONG_MAX || val == LONG_MIN))
	  || (errno != 0 && val == 0)) {
	  perror("strtol");
	  return LONG_MAX;
  }

  if (endptr == str) {
	  printf("video_txt: parse_long: no digits were found in %s \n", str);
	  return LONG_MAX;
  }

  /* Successful conversion */
  return val;
}
