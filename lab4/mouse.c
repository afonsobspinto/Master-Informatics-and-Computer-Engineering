#include "mouse.h"
#include "mouse_cmds.h"

static unsigned char packet[3];
static unsigned char byteCounter;

int mouse_subscribe_int(unsigned* mouse_hook_id)
{
	if (sys_irqsetpolicy(MOUSE_IRQ, IRQ_REENABLE | IRQ_EXCLUSIVE, mouse_hook_id) == OK)
	{
		packet[0]=0;
		packet[1]=0;
		packet[2]=0;
		byteCounter = 0;
		return *mouse_hook_id;
	}
	return -1;
}

int mouse_unsubscribe_int(unsigned mouse_hook_id)
{
	return kbc_unsubscribe_int(mouse_hook_id);
}

int mouse_get_packet(mouse_struct *info)
{
	if (mouse_sync() && byteCounter == 0)
	{
		//Byte 1
		info->bytes[0] = packet[0];

		//Byte 2
		info->bytes[1] = packet[1];

		//Byte 3
		info->bytes[2] = packet[2];

		// X Overflow
		info->x_ovfl = (packet[0] & BIT(MOUSE_X_OVFL));

		// Y Overflow
		info->y_ovfl = (packet[0] & BIT(MOUSE_Y_OVFL));

		// Left Button
		info->left = (packet[0] & BIT(MOUSE_L_B));

		// Middle Button
		info->middle = (packet[0] & BIT(MOUSE_M_B));

		// Right Button
		info->right = (packet[0] & BIT(MOUSE_R_B));


		if (info->x_ovfl)
				{
					if (packet[0] & BIT(MOUSE_X_SIGN))
						info->x_delta = (1 << 8) - 1;
					else
						info->x_delta = (-1 << 8) + 1;
				}
				else{
					if(packet[0]&BIT(MOUSE_X_SIGN))
						info->x_delta = ((-1<<8)|packet[1]);
					else
						info->x_delta = packet[1];
				}

				if (info->y_ovfl)
				{
					if (packet[0] & BIT(MOUSE_Y_SIGN))
						info->y_delta = (1 << 8) - 1;
					else
						info->y_delta = (-1 << 8) + 1;
				}
				else{
					if(packet[0]& BIT(MOUSE_Y_SIGN))
						info->y_delta = ((-1<<8)|packet[2]);
					else
						info->y_delta = packet[2];
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

int mouse_get_status(mouse_status *status)
{
	if (mouse_write(MOUSE_STATUS_REQUEST))
		return 1;

	//Byte 1
	mouse_read(&status->bytes[0]);

	//Byte 2
	mouse_read(&status->bytes[1]);

	//Byte 3
	mouse_read(&status->bytes[2]);

	//Mode
	status->remote_mode = status->bytes[0] & BIT(MOUSE_STATUS_REMOTE_BIT);

	//Enable
	status->enable = status->bytes[0] & BIT(MOUSE_STATUS_ENABLED_BIT);

	//Scaling
	status->scaling = status->bytes[0] & BIT(MOUSE_STATUS_SCALING_BIT);

	//Left Button
	status->left = status->bytes[0] & BIT(MOUSE_STATUS_LEFT);

	//Middle Button
	status->middle = status->bytes[0] & BIT(MOUSE_STATUS_MIDDLE);

	//Right Button
	status->right = status->bytes[0] & BIT(MOUSE_STATUS_RIGHT);

	//Resolution
	status->resolution = status->bytes[1];

	//Sample_Rate
	status->sample_rate = status->bytes[2];

	return 0;
}

int mouse_write(unsigned char cmd)
{
	unsigned char read;

	while(1)
	{
		if (kbc_write_to_mouse())
			return 1;
		if (kbc_send_data(cmd))
			return 1;
		if (kbc_read(&read))
			return 1;
		if (read == MOUSE_ACK)
			return 0;
	}
}

int mouse_read(unsigned char* read)
{
	size_t i, j;
	unsigned long status;
	while(1)
	{
		if (kbc_read_status(&status))
			return 1;
		if (sys_inb(KBC_OUT_BUF, (unsigned long *)read) != OK)
			return 1;
		if (status & BIT(KBC_AUX_BIT))
			break;
	}
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

int mouse_set_stream_mode()
{
	if(mouse_write(MOUSE_SET_STREAM_MODE))
		return 1;

	return 0;
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

int mouse_disable_stream_mode()
{
	if(mouse_write(MOUSE_DISABLE_DATA_PACKETS))
		return 1;

	packet[0]=0;
	packet[1]=0;
	packet[2]=0;
	byteCounter = 0;

	return 0;
}



