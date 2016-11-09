#include "keyboard.h"
#include <minix/syslib.h>
#include <minix/drivers.h>
#include "I8042.h"
#include "timer.h"
#include "i8254.h"


int counter_kb = 0;

int kbd_test_scan(unsigned short ass) {


	int ipc_status;
	message msg;
	int r;
	int irq_set=keyboard_subscribe_int();
	unsigned long byte1;

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
					if (ass == 0){
						if (sys_inb(OUT_BUF, &byte1)!=OK)
							return -1;
					}
					else
						byte1 = kbd_handler_ass();

					kbd_scan_handler(byte1);
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

int kbd_test_leds(unsigned short *leds){
//	int r, ipc_status;
//	message msg;
//
//	unsigned int i = 0;
//	while (i < n)
//	{
//		if ((r = driver_receive(ANY, &msg, &ipc_status)) != 0)
//		{
//			printf("driver_receive failed with: %d", r);
//			continue;
//		}
//		if (is_ipc_notify(ipc_status))
//		{
//			if (_ENDPOINT_P(msg.m_source) == HARDWARE)
//			{
//				if (msg.NOTIFY_ARG & timer_subscribe_int())
//				{
//					kbd_leds_handler(*(leds + i));
//					++i;
//				}
//			}
//		}
	return -1;
	}
//
//	timer_unsubscribe_int();
//
//	return 0;
//}
//
//


int kbd_test_timed_scan(unsigned short n) {

	int ipc_status;
	message msg;
	int r;
	unsigned long byte1;


	int irq_set=timer_subscribe_int();
	int kb_irq_set=keyboard_subscribe_int();

	while( (counter_kb < n) && (byte1 != ESC_BREAK) ) { /* You may want to use a different condition */
		/* Get a request message. */
		if ( (r = driver_receive(ANY, &msg, &ipc_status)) != 0 ) {
			printf("driver_receive failed with: %d", r);
			continue;
		}
		if (is_ipc_notify(ipc_status)) { /* received notification */
			 switch (_ENDPOINT_P(msg.m_source)) {
			 case HARDWARE: /* hardware interrupt notification */
				 if (msg.NOTIFY_ARG & irq_set) { /* subscribed interrupt */
					 counter_kb++;
				 }
				 if (msg.NOTIFY_ARG & kb_irq_set) {
					 counter_kb = 0;

					 if (sys_inb(OUT_BUF, &byte1)!=OK)
						 return -1;


					 kbd_scan_handler(byte1);
				 }
				 break;
			 default:
				 break; /* no other notifications expected: do nothing */
			 }
		} else { /* received a standard message, not a notification */
			/* no standard messages expected: do nothing */
		}
	}

	timer_unsubscribe_int();
	keyboard_unsubscribe_int();

	return 0;
}

