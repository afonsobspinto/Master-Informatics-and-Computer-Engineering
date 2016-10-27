#include <minix/syslib.h>
#include <minix/drivers.h>

int hook_id = 0;
int counter = 0;

int keyboard_subscribe_int(void ) {

	 if (sys_irqsetpolicy(KBC_IRQ, IRQ_REENABLE | IRQ_EXCLUSIVE ,&hook_id) == OK) // This function should be used to subscribe a notification on every interrupt in the input irq_line
		if (sys_irqenable(&hook_id) == OK)
		 return BIT(0);

	return -1;
}

int keyboard_unsubscribe_int() {

	if (sys_irqdisable(&hook_id)==OK)
			if (sys_irqrmpolicy(&hook_id)==OK) // This function unsubscribes a previous subscription of the interrupt notification associated with the specified hook_id
				return 0;

		return -1;
}
