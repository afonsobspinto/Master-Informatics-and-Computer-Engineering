#include <minix/syslib.h>
#include <minix/drivers.h>
#include <machine/int86.h>
#include <sys/mman.h>
#include <sys/types.h>
#include <sys/mman.h>

#include "vbe.h"
#include "macros.h"
#include "video_gr.h"
#include "sprite.h"
#include "timer.h"
#include "i8254.h"


/* Constants for VBE 0x105 mode */

/* The physical address may vary from VM to VM.
 * At one time it was 0xD0000000
 *  #define VRAM_PHYS_ADDR    0xD0000000 
 * Currently on lab B107 is 0xF0000000
 * Better run my version of lab5 as follows:
 *     service run `pwd`/lab5 -args "mode 0x105"
 */

/* Private global variables */

#define VRAM_PHYS_ADDR	0xF0000000
#define H_RES           1024
#define V_RES		  	768
#define BITS_PER_PIXEL	8

static char *video_mem;		/* Process address to which VRAM is mapped */

static unsigned h_res;		/* Horizontal screen resolution in pixels */
static unsigned v_res;		/* Vertical screen resolution in pixels */
static unsigned bits_per_pixel; /* Number of VRAM bits per pixel */

int vg_exit() {
  struct reg86u registos;

  registos.u.b.intno = 0x10; /* BIOS video services */

  registos.u.b.ah = 0x00;    /* Set Video Mode function */
  registos.u.b.al = 0x03;    /* 80x25 text mode*/

  if( sys_int86(&registos) != OK ) {
      printf("\tvg_exit(): sys_int86() failed \n");
      return 1;
  } else
      return 0;
}

void *vg_init(unsigned short mode)
{

	struct reg86u registos;

	registos.u.b.intno = VIDEOCARD;
	registos.u.b.ah = VBE_FUNCT;
	registos.u.b.al = SET_VBE_MODE;
	registos.u.w.bx = 1<<14|mode;

	if( sys_int86(&registos) != OK )
	{
		printf("sys_int86() failed \n");
		return 0;
	}


	vbe_mode_info_t *vmode_info_p;

	vmode_info_p = malloc(sizeof(vbe_mode_info_t));

	if(vbe_get_mode_info(mode, vmode_info_p) != 0)
	{
		printf("\vbe_get_mode_info() failed \n");
		return 0;
	}

	int r;
	struct mem_range mr;
	unsigned int vram_base;  /* VRAM's physical addresss */
	unsigned int vram_size;  /* VRAM's size, but you can use
	                            the frame-buffer size, instead */

	vram_base = (vmode_info_p->PhysBasePtr);
	vram_size = (vmode_info_p->XResolution * vmode_info_p->YResolution * vmode_info_p->BitsPerPixel);
	/* Allow memory mapping */

	mr.mr_base = (phys_bytes)vram_base;
	mr.mr_limit = mr.mr_base + vram_size;

	if( OK != (r = sys_privctl(SELF, SYS_PRIV_ADD_MEM, &mr)))
	   panic("sys_privctl (ADD_MEM) failed: %d\n", r);

	/* Map memory */

	video_mem = vm_map_phys(SELF, (void *)mr.mr_base, vram_size);

	if(video_mem == MAP_FAILED)
		panic("couldn't map video memory");


	v_res = vmode_info_p->YResolution;
	h_res = vmode_info_p->XResolution;
	bits_per_pixel = vmode_info_p->BitsPerPixel;

	free(vmode_info_p);
	return video_mem;
}

int draw_square(unsigned short x, unsigned short y, unsigned short size, unsigned long color)
{

}

int draw_pixel(unsigned short x, unsigned short y, unsigned long color)
{
	if(x < h_res && y < v_res){
		char *vptr;
		vptr = video_mem;
		vptr += (y * h_res + x);
		if((*vptr) != color){
			*vptr = color;
		}
		return 0;
	}
	return 1;
}

int draw_line(unsigned short xi, unsigned short yi, unsigned short xf, unsigned short yf, unsigned long color)
{

}

int draw_image(Sprite *image)
{

	int i, j;
	unsigned int ret = 0;
	char *pix = image->map;

	if( image->x < h_res && image->y < v_res){
		for(i = image->y; i < image->height+image->y; i++)
			{
				for(j = image->x; j < image->width+image->x; j++)
				{
					if(0 != draw_pixel(j, i, *pix))
						ret = 1;
					pix += bits_per_pixel/8;
				}
			}
	}
	return ret;
}

void fill_screen(unsigned long color)
{
	int i, j;

	for(i = 0; i < v_res; i++)
	{
		for(j = 0; j < h_res; j++)
			draw_pixel(j, i, color);
	}
}

int delete_image(Sprite *image)
{
	int i, j;
	if(image->x < h_res && image->y < v_res){
		for(i = image->y; i < image->height+image->y; i++)
		{
			for(j = image->x; j < image->width+image->x; j++)
				draw_pixel(j, i, (char)0);
		}
		return 0;
	}
return 1;
}

int move_image(Sprite *image)
{

	return 0;
}

int test_controller_config()
{
	vbe_info_t *vbe_ptr;
	vbe_ptr = malloc(sizeof(vbe_info_t));

	int16_t *modes = vbe_get_controler_info(vbe_ptr);


	if((vbe_ptr->capabilities[0] & BIT(0)) == 0)
		printf("DAC is fixed width, with 6 bits per primary color\n");
	else
		printf("DAC width is switchable to 8 bits per primary color\n");

	if((vbe_ptr->capabilities[0] & BIT(1)) == 0)
		printf("Controller is VGA compatible\n");
	else
		printf("Controller is not VGA compatible\n");

	if((vbe_ptr->capabilities[0] & BIT(2)) == 0)
		printf("Normal RAMDAC operation\n\n");
	else
		printf("When programming large blocks of information to the RAMDAC, use the blank bit in Function 09h\n\n");


	int16_t *mode_ptr;
	int i = 1;

	printf("List of VBE modes:\n");

	for(mode_ptr=modes; (unsigned short)*mode_ptr != 0xFFFF; mode_ptr +=2)
	{
		printf(" %u -> 0x%X\n", i, *mode_ptr);
		i++;
	}

	unsigned short vram_size = vbe_ptr->totalMemory;
	printf("VRAM memory : %u KB (%u 64KB units)\n\n", vram_size, vram_size/64);

	free(vbe_ptr);

	return 0;
}
