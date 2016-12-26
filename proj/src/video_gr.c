#include <minix/syslib.h>
#include <minix/drivers.h>
#include <machine/int86.h>
#include <sys/mman.h>
#include <sys/types.h>
#include <sys/mman.h>

#include "vbe.h"
#include "macros.h"
#include "video_gr.h"
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
static char *buffer;
static char *mbuffer;


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
	vbe_mode_info_t vmode_info_p;
	struct mem_range mr;

	if(vbe_get_mode_info(mode, &vmode_info_p) != 0)
	{
		printf("\vbe_get_mode_info() failed \n");
		return 0;
	}


	v_res = vmode_info_p.YResolution;
	h_res = vmode_info_p.XResolution;

	bits_per_pixel = vmode_info_p.BitsPerPixel;

	registos.u.b.ah = VBE_FUNCT;
	registos.u.b.al = SET_VBE_MODE;
	registos.u.w.bx = 1<<14|mode;
	registos.u.b.intno = VIDEOCARD;

	if( sys_int86(&registos) != OK )
	{
		printf("sys_int86() failed \n");
		return 0;
	}

	//vmode_info_p = malloc(sizeof(vbe_mode_info_t));


	int r;

	unsigned int vram_base;  /* VRAM's physical addresss */
	unsigned int vram_size;  /* VRAM's size, but you can use
	                            the frame-buffer size, instead */

	vram_base = (vmode_info_p.PhysBasePtr);
	vram_size = (h_res * v_res * bits_per_pixel/8);
	/* Allow memory mapping */

	mr.mr_base = (phys_bytes)vram_base;
	mr.mr_limit = mr.mr_base + vram_size;

	if( OK != (r = sys_privctl(SELF, SYS_PRIV_ADD_MEM, &mr)))
	   panic("sys_privctl (ADD_MEM) failed: %d\n", r);

	/* Map memory */

	video_mem = vm_map_phys(SELF, (void *)mr.mr_base, vram_size);
	buffer = (char*) malloc(h_res * v_res *(bits_per_pixel)/8);
	mbuffer = (char*) malloc(h_res * v_res *(bits_per_pixel)/8);

	if(video_mem == MAP_FAILED)
		panic("couldn't map video memory");


	//free(vmode_info_p);

	return video_mem;
}

unsigned getHorResolution(){
	return h_res;
}

unsigned getVerResolution(){
	return v_res;
}

void call_drawBitmap(Bitmap* bmp, int x, int y, Alignment alignment){
	drawBitmap(buffer,bmp,x,y,alignment);
}

void copy2VideoMem(){
	memcpy(video_mem,buffer,h_res * v_res * bits_per_pixel / 8);
}

void copy2VideoMem3(){
	memcpy(video_mem,mbuffer,h_res * v_res * bits_per_pixel / 8);
}

void copy2Mbuffer(){

	memcpy(mbuffer,buffer,h_res * v_res * bits_per_pixel / 8);
}

void draw_pixel(unsigned short x, unsigned short y, unsigned long color, int buff)
{
    char *tmp;

    if(buff == THIRD_BUFFER){
    	tmp = mbuffer;
    }

    else if(buff == SECOND_BUFFER){
    	tmp = buffer;
    }

    else{
    	tmp = video_mem;
    }


    if(x > 0 && x < h_res && y > 0 && y < v_res){

        tmp += (x + y*h_res)*bits_per_pixel/8;

        *tmp=(0xFF & color);
        tmp++;
        *tmp=(0xFF & (color >> 8));
    }


}

void fill_screen(unsigned long color)
{
	char *pixel;
	for (pixel = video_mem; pixel < video_mem + h_res * v_res * bits_per_pixel / 8; ++pixel)
	{
		*pixel = color;
	}
}

void draw_rectangle(unsigned short x1, unsigned short x2, unsigned short y1, unsigned short y2, unsigned long color){

	int i, j;

		for(i = y1; i <= y2; i++)
		{
			for(j = x1; j <= x2; j++){
					draw_pixel(j, i, color, 2);
			}
		}
}

