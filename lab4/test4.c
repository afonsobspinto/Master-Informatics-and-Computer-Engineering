#include <minix/syslib.h>
#include <minix/drivers.h>
#include "test4.h"



void print_packet(unsigned char packet[])
{
	printf("  B1=%X", packet[0]);
	printf("  B2=%X", packet[1]);
	printf("  B3=%X", packet[2]);
	printf("  LB=%d", (BIT(0) & packet[0]));
	printf("  MB=%d", (BIT(2) & packet[0]));
	printf("  RB=%d", (BIT(1) & packet[0]));
	printf("  XOV=%d", (BIT(6) & packet[0]));
	printf("  YOV=%d", (BIT(7) & packet[0]));
	printf("  X=%d", packet[1]);
	printf("  Y=%d", packet[2]);
}

int test_packet(unsigned short cnt){

	int r, ipc_status;
	message msg;
	unsigned char packet[3];
	unsigned char reply;
	unsigned short int byteCounter = 0;
	int irq_set=mouse_subscribe_int();

	printf("%x \n", irq_set);

	while( 1 ) {
		printf("X1\n");
		if ( (r = driver_receive(ANY, &msg, &ipc_status)) != 0 ) {
			printf("driver_receive failed with: %d", r);
			continue;
		}

		if (is_ipc_notify(ipc_status)) {
			printf("X2\n");
			switch (_ENDPOINT_P(msg.m_source)) {
			case HARDWARE:
				if (msg.NOTIFY_ARG & irq_set) {
					printf("X3\n");
					if (cnt==0){
						printf("X4\n");
						mouse_unsubscribe_int();
						return 0;
					}
					reply = read_mouse_byte(packet, byteCounter);
					if (reply == 0)
						continue;
					else{
						printf("X5\n");
						byteCounter++;
						if(byteCounter == 3)
						{
							printf ("X6\n");
							print_packet(packet);
							byteCounter = 0;
							cnt--;
						}
					}
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

	printf ("Bye\n");
	return 1;
}

int test_async(unsigned short idle_time) {
	/* To be completed ... */
}

int test_config(void) {
	/* To be completed ... */
}

int test_gesture(short length) {
	/* To be completed ... */
}
