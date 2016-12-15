#include "timer.h"
#include "i8254.h"
#include "macros.h"
#include "kbd.h"
#include <minix/syslib.h>
#include <minix/drivers.h>


int timer_subscribe_int(unsigned* hook_id ) {
	 if (sys_irqsetpolicy(TIMER0_IRQ,IRQ_REENABLE, hook_id) == OK) // This function should be used to subscribe a notification on every interrupt in the input irq_line
		if (sys_irqenable(&hook_id) == OK)
		 return BIT(0);

	return -1;
}

int timer_unsubscribe_int(unsigned hook_id) {

	if (sys_irqdisable(&hook_id)==OK)
		if (sys_irqrmpolicy(&hook_id)==OK) // This function unsubscribes a previous subscription of the interrupt notification associated with the specified hook_id
			return 0;

	return -1;
}

int time_management(unsigned int *counter){

	int kbd_hook = KBD_IRQ;
	int timer_hook = TIMER0_IRQ;

	if(kbd_subscribe_int(&kbd_hook)<0)
		return 1;

	if(timer_subscribe_int(timer_hook)<0)
		return 1;

	int r, ipc_status;
	message msg;

	printf("Counter Inicial: %d", *counter);

	while(*counter > 0)
	{
		if ( driver_receive(ANY, &msg, &ipc_status) != 0 ) {
			printf("Driver_receive failed\n");
			continue;
		}
		if (is_ipc_notify(ipc_status)) // Notification received
		{
			switch (_ENDPOINT_P(msg.m_source)) // Notification interrupted
			{
			case HARDWARE:
				if (msg.NOTIFY_ARG & BIT(KBD_IRQ))
				{
					unsigned long key = 0;

					if(sys_inb(KBD_OUT_BUF, &key)!= OK)
						return 1;

					if(key == KEY_SPACE)
						break;
				}
				else if (msg.NOTIFY_ARG & BIT(timer_hook)) {
					*counter-=1;
					printf("%d", *counter);
					}

			default:
				break; // no other notifications expected: do nothing
			}
		}
	}

	if(kbd_unsubscribe_int(kbd_hook) != 0)
		return 1;

	timer_unsubscribe_int(timer_hook);

	return 0;

}



int kbd_subscribe_int(unsigned* kbd_hook)
{
	if (sys_irqsetpolicy(KBD_IRQ, IRQ_REENABLE | IRQ_EXCLUSIVE, kbd_hook) < 0)
		return -1;
	return KBD_IRQ;
}

int kbd_unsubscribe_int(unsigned kbd_hook)
{
	if (sys_irqrmpolicy(&kbd_hook) < 0)
		return -1;
	return 0;
}
