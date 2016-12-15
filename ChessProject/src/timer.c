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

int time_management(unsigned int *counter){
	printf("Start");
}
