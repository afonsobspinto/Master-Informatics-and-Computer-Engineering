#include "keyboard.h"

int kbd_test_scan(unsigned short ass) {

	int irqset = keyword_subscribe_int);


	int ipc_status;
	message msg;
	int r;
	int irq_set=keyboard_subscribe_int();
	unsigned long byte1;
	unsigned long byte2 = 0x0000;

	printf("%x \n", irq_set);

	while(byte1 != ESC_BREAK) { /* You may want to use a different condition */
		/* Get a request message. */
		if ( (r = driver_receive(ANY, &msg, &ipc_status)) != 0 ) {
			printf("driver_receive failed with: %d", r);
			continue;
		}
		if (is_ipc_notify(ipc_status)) { /* received notification */
			switch (_ENDPOINT_P(msg.m_source)) {
			case HARDWARE: /* hardware interrupt notification */
				if (msg.NOTIFY_ARG & irq_set) { /* subscribed interrupt */

					sys_inb(OUT_BUF, &byte1);

					if (byte1 == TWO_BYTES_SCANCODE){
						byte2 = (byte1 << 8);
					}
					if (byte & BIT(7)) // Checks if MSB is 1
						printf("Break");
					else
						printf("Make");
					if (byte1 < 16 && byte2 == 0)
						printf("code: 0x0%x\n\n", byte1);
					else
						printf("code: 0x%x\n\n", byte2 | byte1);

					if (byte2)
						byte2 = 0x0000;
				}
			default:
				break; /* no other notifications expected: do nothing */
			}
		} else { /* received a standard message, not a notification */
			/* no standard messages expected: do nothing */
		}
	}

	keyboard_unsubscribe_int();

	return 0;
}

int kbd_test_leds(unsigned short n, unsigned short *leds) {
    /* To be completed */
}
int kbd_test_timed_scan(unsigned short n) {
    /* To be completed */
}
