#include "timer.h"
#include "i8254.h"
#include "macros.h"
#include "kbd.h"
#include "utilities.h"
#include <minix/syslib.h>
#include <minix/drivers.h>


int hook_id = 0;


int timer_subscribe_int(void  ) {
	 if (sys_irqsetpolicy(TIMER0_IRQ,IRQ_REENABLE, &hook_id) == OK) // This function should be used to subscribe a notification on every interrupt in the input irq_line
		if (sys_irqenable(&hook_id) == OK)
		 return BIT(0);

	return -1;
}

int timer_unsubscribe_int() {

	if (sys_irqdisable(&hook_id)==OK)
		if (sys_irqrmpolicy(&hook_id)==OK) // This function unsubscribes a previous subscription of the interrupt notification associated with the specified hook_id
			return 0;

	return -1;
}


