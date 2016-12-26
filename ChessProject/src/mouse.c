#include "mouse.h"
#include "mouse_cmds.h"
#include "macros.h"
#include "video_gr.h"
#include "kbd.h"


static unsigned char packet[3];
static unsigned char byteCounter = 0;

Mouse* mouse = NULL;

Mouse* getMouse(){
	if(!mouse)
		mouse = newMouse();

	return mouse;
}

Mouse* newMouse(){

	Mouse* m = (Mouse*) malloc (sizeof(Mouse));
	m->x = 400;
	m->y = 300;
	m->size = 40;
	m->color = WHITE;
	m->packet[0]=0;
	m->packet[1]=0;
	m->packet[2]=0;

	return m;
}


void drawMouse(){

	copy2Mbuffer();

	int i, j;

	unsigned short half_size = mouse->size/2;

	for( i = mouse->x - half_size/2; i < mouse->x + half_size/2; i ++){
		draw_pixel(i,mouse->y,mouse->color,3);
	}

	for(j = mouse->y - half_size/2; j < mouse->y + half_size/2; j++){
		draw_pixel(mouse->x,j,mouse->color,3);
	}

	copy2VideoMem3();
}

void deleteMouse(){
	free(getMouse());
}


int mouseInside(int x1, int y1, int x2, int y2){
	return x1<= getMouse()->x && getMouse()->x <=x2
			&& y1<= getMouse()->y && getMouse()->y <= y2;
}

int mouse_subscribe_int(unsigned* hook_id)
{
	unsigned char hook_bit = (unsigned char)*hook_id;

	if (sys_irqsetpolicy(MOUSE_IRQ, IRQ_REENABLE | IRQ_EXCLUSIVE, (int *)hook_id) == OK)
	{
		memset(packet, 0, sizeof(packet));	// Clean the array to make sure bit 3 is off in all bytes
		byteCounter = 0;
		return hook_bit;
	}
	return -1;
}

int mouse_unsubscribe_int(unsigned hook_id)
{
	return kbc_unsubscribe_int(hook_id);
}


int mouse_set_stream_mode()
{
	if(mouse_write(MOUSE_SET_STREAM_MODE))
	{
		return 1;
	}
	return 0;
}

int mouse_write( unsigned char cmd)
{

	unsigned char read;

	if (kbc_write_to_mouse())
		return 1;
	if (kbc_send_data(cmd))
		return 1;
	if (kbc_read(&read))
		return 1;
	if (read == MOUSE_ACK)
		return 0;


	return 1;
}


int mouse_enable_stream_mode()
{
	if(mouse_write(MOUSE_ENABLE_DATA_PACKETS))
		return 1;

	packet[0]=0;
	packet[1]=0;
	packet[2]=0;
	byteCounter = 0;

	return 0;
}

int mouse_disable_stream_mode(){
	if(mouse_write(MOUSE_DISABLE_DATA_PACKETS))
		return 1;

	packet[0]=0;
	packet[1]=0;
	packet[2]=0;
	byteCounter = 0;

	return 0;
}


int mouse_int_handler()
{
	unsigned char read;

	if (kbc_read(&read))
		return 1;

	packet[byteCounter] = read;
	byteCounter = (byteCounter + 1) % 3;

	return 0;

}

int mouse_get_packet()
{
	if (mouse_sync() && byteCounter == 0)
	{
		//Byte 1
		mouse->packet[0] = packet[0];

		//Byte 2
		mouse->packet[1] = packet[1];

		//Byte 3
		mouse->packet[2] = packet[2];

		// X Overflow
		mouse->xOvf = (packet[0] & BIT(MOUSE_X_OVFL));

		// Y Overflow
		mouse->yOvf = (packet[0] & BIT(MOUSE_Y_OVFL));

		// Left Button
		mouse->leftButton = (packet[0] & BIT(MOUSE_L_B));

		// Middle Button
		mouse->middleButton = (packet[0] & BIT(MOUSE_M_B));

		// Right Button
		mouse->rightButton = (packet[0] & BIT(MOUSE_R_B));


		if (mouse->xOvf)
		{
			if (packet[0] & BIT(MOUSE_X_SIGN))
				mouse->deltaX = (1 << 8) - 1;
			else
				mouse->deltaX = (-1 << 8) + 1;
		}
		else{
			if(packet[0]&BIT(MOUSE_X_SIGN))
				mouse->deltaX = ((-1<<8)|packet[1]);
			else
				mouse->deltaX = packet[1];
		}

		if (mouse->yOvf)
		{
			if (packet[0] & BIT(MOUSE_Y_SIGN))
				mouse->deltaY = (1 << 8) - 1;
			else
				mouse->deltaY = (-1 << 8) + 1;
		}
		else{
			if(packet[0]& BIT(MOUSE_Y_SIGN))
				mouse->deltaY = ((-1<<8)|packet[2]);
			else
				mouse->deltaY = packet[2];
		}
		return 1;
	}
	return 0;
}

int mouse_sync()
{
	if ((packet[0]) & BIT(3))
		return 1;

	unsigned int i, j;

	for (i = 1; i < 3; ++i)
	{
		if ((packet[i]) & BIT(3))
		{
			for (j = 0; j < 3; ++j)
			{
				packet[j] = packet[(i + j) % 3];
				byteCounter -= i;
				return 1;
			}
		}
	}
	return 0;
}



void display_packet()
{
	printf("B1=0x%X\t", mouse->packet[0]);

	printf("B2=0x%X\t", mouse->packet[1]);

	printf("B3=0x%X\t", mouse->packet[2]);

	printf("LB=%d\t", mouse->leftButton);

	printf("MB=%d\t", mouse->middleButton);

	printf("RB=%d\t", mouse->rightButton);

	printf("XOV=%d\t", mouse->xOvf);

	printf("YOV=%d\t", mouse->yOvf);

	printf("X=%d\t", mouse->deltaX);

	printf("Y=%d", mouse->deltaY);

	printf("\n");
	return;
}
