#include "timer.h"
#include "i8254.h"
#include <minix/syslib.h>
#include <minix/drivers.h>

unsigned int counter = 0;

int timer_subscribe_int(unsigned* hook_id ) {
	 if (sys_irqsetpolicy(TIMER0_IRQ,IRQ_REENABLE, hook_id) == OK) // This function should be used to subscribe a notification on every interrupt in the input irq_line
		if (sys_irqenable((int *)&hook_id) == OK)
		 return BIT(0);

	return -1;
}

int timer_unsubscribe_int(unsigned hook_id) {

	if (sys_irqdisable(&hook_id)==OK)
		if (sys_irqrmpolicy(&hook_id)==OK) // This function unsubscribes a previous subscription of the interrupt notification associated with the specified hook_id
			return 0;

	return -1;
}

void timer_int_handler() {
	counter += 1;
}

int timer_test_int(unsigned long time) {


	unsigned int hook_id;

	int ipc_status;
	message msg;
	int r;
	int freq = 60;

	int irq_set=timer_subscribe_int(&hook_id);

	printf("%x \n", irq_set);

	while( counter < time * 60 ) { /* You may want to use a different condition */
		/* Get a request message. */
		if ( (r = driver_receive(ANY, &msg, &ipc_status)) != 0 ) {
			printf("driver_receive failed with: %d", r);
			continue;
		}
		if (is_ipc_notify(ipc_status)) { /* received notification */
			 switch (_ENDPOINT_P(msg.m_source)) {
			 case HARDWARE: /* hardware interrupt notification */
				 if (msg.NOTIFY_ARG & irq_set) { /* subscribed interrupt */
					 timer_int_handler();
					 if ((counter % freq ==0))
						 printf("Notification %d \n", counter/60);
				 }
				 break;
			 default:
				 break; /* no other notifications expected: do nothing */
			 }
		} else { /* received a standard message, not a notification */
			/* no standard messages expected: do nothing */
		}
	}
	timer_unsubscribe_int(hook_id);

	return 0;
}

//int wait(unsigned int delay)
//{
//	unsigned int cnt = delay;
//	unsigned int hook_id;
//
//	if(timer_subscribe_int(&hook_id)<0)
//		return 1;
//
//	int r, ipc_status;
//	message msg;
//	unsigned long irq_set = BIT(0);
//
//	while(cnt > 0)
//	{
//		// Message requested
//		if ((r = driver_receive(ANY, &msg, &ipc_status)) != 0) {
//			printf("driver_receive failed with: %d", r);
//			continue;
//		}
//		if (is_ipc_notify(ipc_status)) { // Notification received
//			switch (_ENDPOINT_P(msg.m_source)) // Notification interrupted
//			{
//			case HARDWARE:
//				if (msg.NOTIFY_ARG & irq_set) {
//					cnt--;
//				}
//				break;
//			default:
//				break; // no other notifications expected: do nothing
//			}
//		}
//	}
//
//	timer_unsubscribe_int(hook_id);
//
//	return 0;
//
//}
//
