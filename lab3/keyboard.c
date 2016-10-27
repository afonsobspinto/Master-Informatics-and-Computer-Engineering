#include <minix/syslib.h>
#include <minix/drivers.h>
#include "keyboard.h"

int hook_id_kb = 0;
int counter_kb = 0;

int keyboard_subscribe_int(void ) {

	 if (sys_irqsetpolicy(KBC_IRQ, IRQ_REENABLE | IRQ_EXCLUSIVE ,&hook_id_kb) == OK) // This function should be used to subscribe a notification on every interrupt in the input irq_line
		if (sys_irqenable(&hook_id_kb) == OK)
		 return BIT(0);

	return -1;
}

int keyboard_unsubscribe_int() {

	if (sys_irqdisable(&hook_id_kb)==OK)
			if (sys_irqrmpolicy(&hook_id_kb)==OK) // This function unsubscribes a previous subscription of the interrupt notification associated with the specified hook_id_kb
				return 0;

		return -1;
}

int kbd_scan_handler(unsigned long byte1){

	unsigned int byte2_flag = 0;

	if (byte1 == TWO_BYTES_SCANCODE){
		byte2_flag = 1;
	}
	if (byte1 & BIT(7)) // Checks if MSB is 1
		printf("Break");
	else
		printf("Make");
	if (byte2_flag== 0)
		printf("code: 0x0%x\n\n", byte1);
	else{
		byte1 << (byte1 << 8);
		byte2_flag--;
	}
	return 0;
}
