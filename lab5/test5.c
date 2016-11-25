#include <minix/syslib.h>
#include <minix/drivers.h>
#include <minix/com.h>
#include <stdio.h>
#include <minix/sysutil.h>

#include <machine/int86.h>
#include <stdint.h>
#include "lmlib.h"

#include "test5.h"
#include "video_gr.h"
#include "timer.h"
#include "vbe.h"
#include "macros.h"
#include "read_xpm.h"
#include "sprite.h"

void *test_init(unsigned short mode, unsigned short delay) {
	
	char *video_mem = vg_init(mode);

	if(video_mem == 0)
	{
		printf("vg_init() failed\n");
		vg_exit();
		return 0;
	}

	wait(delay);
	vg_exit();

	vbe_mode_info_t vmode_info_p;

	if(vbe_get_mode_info(mode, &vmode_info_p) != 0)
	{
		printf("vbe_get_mode_info() failed \n");
		return 0;
	}

	printf(" Physical address of VRAM : 0x%X \n\n", vmode_info_p.PhysBasePtr);

	return video_mem;
}


int test_square(unsigned short x, unsigned short y, unsigned short size, unsigned long color) {

}

int test_line(unsigned short xi, unsigned short yi, unsigned short xf, unsigned short yf, unsigned long color) {

}

int test_xpm(unsigned short xi, unsigned short yi, char *xpm[]) {
	
	Sprite image;

	image.map = read_xpm(xpm, &image.width, &image.height);
	image.x = xi;
	image.y = yi;

	vg_init(GRAF_1024x768);

	if(draw_image(&image) != 0)
	{
		vg_exit();
		printf("\n\t Unable to load image \n\n");
		return 1;
	}

	wait_for_esc();
	vg_exit();

	return 0;
	
}	

int test_move(unsigned short xi, unsigned short yi, char *xpm[], unsigned short hor, short delta, unsigned short time) {

	Sprite image;
	
	
	image.map = read_xpm(xpm, &image.width, &image.height);
	image.x = xi;
	image.y = yi;

	if(hor != 0)
	{
		image.xspeed = delta/(time * 60.0);
		image.yspeed = 0;
		image.xfinal = image.x + delta;
		image.yfinal = -1;

	}
	else
	{
		image.yspeed = delta/(time * 60.0);
		image.xspeed = 0;
		image.yfinal = image.y + delta;
		image.xfinal = -1;
	}

	vg_init(GRAF_1024x768);

	if(move_image(&image) != 0)
	{
		vg_exit();
		printf("\n\t Unable to load image \n\n");
		return 1;

	}

	wait_for_esc();
	vg_exit();

	return 0;
}					

int test_controller()
{
	return test_controller_config();
}
