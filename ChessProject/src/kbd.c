#include "macros.h"
#include "kbd.h"
#include "i8254.h"

#include <minix/syslib.h>
#include <minix/drivers.h>
#include <minix/com.h>
#include <stdio.h>
#include <minix/sysutil.h>

#define DELAY_US 20000

int kbc_subscribe_int(unsigned* kbc_hook)
{
	if (sys_irqsetpolicy(KBC_IRQ, IRQ_REENABLE | IRQ_EXCLUSIVE, kbc_hook) < 0)
		return -1;
	return KBC_IRQ;
}

int kbc_read_status(unsigned long* status)
{
	return sys_inb(KBC_STAT_REG, status);
}

int kbc_unsubscribe_int(unsigned hook_id)
{
	if (sys_irqrmpolicy(&hook_id) == OK)
		return 0;
	return 1;
}

int kbc_send_data(unsigned char cmd)
{
	if (sys_outb(KBC_IN_BUF, cmd) != OK)
		return 1;
	return 0;
}

int kbc_write_to_mouse()
{
	if(sys_outb(KBC_CTRL_REG, KBC_WRITE_BYTE_TO_MOUSE) != OK)
		return 1;
	return 0;
}

int kbc_read(unsigned char* st)
{
	if (sys_inb(KBC_OUT_BUF, (long unsigned int *) st) != OK)
		return 1;

	//tickdelay(micros_to_ticks(DELAY_US));

	return 0;
}
