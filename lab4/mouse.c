#include <minix/syslib.h>
#include <minix/drivers.h>
#include "mouse.h"
#include "i8042.h"


int mouse_hook_id;


int mouse_subscribe_int(void ) {

	 if (sys_irqsetpolicy(MOUSE_IRQ,IRQ_REENABLE, &mouse_hook_id) == OK)
		if (sys_irqenable(&mouse_hook_id) == OK)
		 return BIT(0);

	return -1;
}

int mouse_unsubscribe_int() {

	if (sys_irqdisable(&mouse_hook_id)==OK)
		if (sys_irqrmpolicy(&mouse_hook_id)==OK)
			return 0;

	return -1;
}

int get_mouse_packet(unsigned char *packet[])
{
	printf ("X2\n");
	unsigned char byte;
	unsigned short int byteCounter = 0;

	if(sys_inb(OUT_BUF, &byte) != 0){
		printf("Error reading from OUT_BUF\n");
		return 0;
	}

	printf ("Byte: %x\n", byte);
	while (byteCounter < 3){
		if(BIT(3) & byte == 1){
				packet[byteCounter] = byte;
				byteCounter++;
				printf ("ByteCounter: %x\n", byteCounter);
			}
	}

	if(byteCounter==0)
		return 0;
	return 1;
}
