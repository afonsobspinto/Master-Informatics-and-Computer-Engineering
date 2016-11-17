#include "test5.h"
#include <minix/syslib.h>
#include <minix/drivers.h>


void *test_init(unsigned short mode, unsigned short delay) {

	int r, ipc_status;
	message msg;
	unsigned char timer_hook_bit = timer_subscribe_int();
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

	timer_unsubscribe_int();

	return 0;
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
