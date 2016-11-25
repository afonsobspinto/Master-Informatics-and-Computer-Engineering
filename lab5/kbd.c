#include "macros.h"
#include "timer.h"
#include "i8254.h"

#include <minix/syslib.h>
#include <minix/drivers.h>
#include <minix/com.h>
#include <stdio.h>
#include <minix/sysutil.h>


int wait_for_esc()
{
	int kbd_hook = KBD_IRQ;

	if(kbd_subscribe_int(&kbd_hook)<0)
		return 1;

	int r, ipc_status;
	message msg;
	int ciclo = 1;

	while(ciclo)
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

					if(key == ESC_break)
						ciclo = 0;
				}
				break;
			default:
				break; // no other notifications expected: do nothing
			}
		}
	}

	if(kbd_unsubscribe_int(kbd_hook) != 0)
		return 1;

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
