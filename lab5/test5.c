#include "test5.h"
#include "video_gr.h"
#include "vbe.h"
#include <minix/syslib.h>
#include <minix/drivers.h>


void *test_init(unsigned short mode, unsigned short delay) {


	if (lm_init())
		return NULL;

	char *video_mem;
	video_mem=vg_init(mode);

	vbe_mode_info_t vbe_mode_info;

	if(vbe_get_mode_info(mode, &vbe_mode_info))
		return NULL;

	unsigned char timer_hook_bit;

	if((timer_hook_bit = timer_subscribe_int())<0)
		return NULL;

	int r, ipc_status;
	message msg;

	unsigned timer_counter = 0;

	while(timer_counter < delay * TIMER_DEFAULT_FREQ)
	{
		// Message requested
		if ((r = driver_receive(ANY, &msg, &ipc_status)) != 0) {
			printf("driver_receive failed with: %d", r);
			continue;
		}
		if (is_ipc_notify(ipc_status)) { // Notification received
			switch (_ENDPOINT_P(msg.m_source)) // Notification interrupted
			{
			case HARDWARE:
				if (msg.NOTIFY_ARG & BIT(timer_hook_bit)) {
					++timer_counter;
				}
			default:
				break; // no other notifications expected: do nothing
			}
		}
	}

	if(timer_unsubscribe_int()<0)
		return NULL;
	if(vg_exit())
		return NULL;

	return video_mem;
}


int test_square(unsigned short x, unsigned short y, unsigned short size, unsigned long color) {
	
	/* To be completed */
	
}

int test_line(unsigned short xi, unsigned short yi, 
		           unsigned short xf, unsigned short yf, unsigned long color) {
	
	/* To be completed */
	
}

int test_xpm(unsigned short xi, unsigned short yi, char *xpm[]) {
	
	/* To be completed */
	
}	

int test_move(unsigned short xi, unsigned short yi, char *xpm[], 
				unsigned short hor, short delta, unsigned short time) {
	
	/* To be completed */
	
}					

int test_controller() {
	
	/* To be completed */
}
