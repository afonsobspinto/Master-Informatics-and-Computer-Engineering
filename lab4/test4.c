#include <minix/syslib.h>
#include <minix/drivers.h>
#include "test4.h"
#include "timer.h"
#include "mouse.h"
#include "i8042.h"
#include "i8254.h"

void print_packet(unsigned char packet[])
{
	printf("B1=0x%X\t", packet[0]);
	printf("B2=0x%X\t", packet[1]);
	printf("B3=0x%X\t", packet[2]);
	printf("LB=%d\t", (BIT(0) & packet[0]));
	printf("MB=%d\t", (BIT(2) & packet[0]));
	printf("RB=%d\t", (BIT(1) & packet[0]));
	printf("XOV=%d\t", (BIT(6) & packet[0]));
	printf("YOV=%d\t", (BIT(7) & packet[0]));
	printf("X=%d\t", packet[1]);
	printf("Y=%d", packet[2]);
	printf("\n");
}

int test_packet(unsigned short cnt){

	int r, ipc_status;
	message msg;
	unsigned char packet[3];
	unsigned char reply;
	unsigned short int byteCounter = 0;

	int irq_set_mouse=mouse_subscribe_int();

	while( 1 ) {
		printf("X1\n");
		if ( (r = driver_receive(ANY, &msg, &ipc_status)) != 0 ) {
			printf("driver_receive failed with: %d", r);
			continue;
		}
		printf("X2\n");
		if (is_ipc_notify(ipc_status)) {
			switch (_ENDPOINT_P(msg.m_source)) {
			case HARDWARE:
				if(msg.NOTIFY_ARG & irq_set_mouse) {
					printf("CNT: %u\n", cnt);
					if (cnt==0){
						printf("X4\n");
						mouse_unsubscribe_int();
						return 0;
					}
					if(get_mouse_packet(&packet))
						print_packet(packet);
					else
						continue;
				}
			default:
				printf ("X6.5\n");
				break;
			}
			printf ("X7\n");
		}
		else {
			printf ("X8\n");
		}
	}

	mouse_unsubscribe_int();

	return 1;
}

int test_async(unsigned short idle_time) {

	int r, ipc_status;
	message msg;
	unsigned char packet[3];
	unsigned char reply;
	unsigned short int timerCounter = 0;
	unsigned short int byteCounter = 0;

	int irq_set_mouse=mouse_subscribe_int();
	int irq_set_timer=timer_subscribe_int();



	while( timerCounter < idle_time * TIMER_DEFAULT_FREQ ) {
		if ( (r = driver_receive(ANY, &msg, &ipc_status)) != 0 ) {
			printf("driver_receive failed with: %d", r);
			continue;
		}
		if (is_ipc_notify(ipc_status)) {
			switch (_ENDPOINT_P(msg.m_source)) {
			case HARDWARE:
				if(msg.NOTIFY_ARG & irq_set_mouse) {
					timerCounter = 0;
					if(get_mouse_packet(&packet))
						print_packet(packet);
					else
						continue;
					}
				if(msg.NOTIFY_ARG & irq_set_timer) {
					timer_int_handler(&timerCounter);
					printf("TimerCounter: %u\n", timerCounter);
				}
			default:
				printf ("X6.5\n");
				break;
			}
			printf ("X7\n");
		}
		else {
			printf ("X8\n");
		}
	}

	mouse_unsubscribe_int();
	timer_unsubscribe_int();

	printf("Time Limit: %u seconds have passed\n", idle_time);
	return 1;

}


int test_config(void) {
	/* To be completed ... */
}

int test_gesture(short length) {
	/* To be completed ... */
}
