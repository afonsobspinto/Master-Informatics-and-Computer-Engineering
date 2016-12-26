#include "macros.h"
#include "kbd.h"
#include "i8254.h"

#include <minix/syslib.h>
#include <minix/drivers.h>
#include <minix/com.h>
#include <stdio.h>
#include <minix/sysutil.h>

int kbd_subscribe_int(unsigned* kbd_hook)
{
	if (sys_irqsetpolicy(KBC_IRQ, IRQ_REENABLE | IRQ_EXCLUSIVE, kbd_hook) < 0)
		return -1;
	return KBC_IRQ;
}

int kbd_unsubscribe_int(unsigned kbd_hook)
{
	if (sys_irqrmpolicy(&kbd_hook) < 0)
		return -1;
	return 0;
}
