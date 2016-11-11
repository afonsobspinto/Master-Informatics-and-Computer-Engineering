#include "test4.h"
#include "mouse_cmds.h"
#include "timer.h"


int test_packet(unsigned short cnt){

	unsigned hook_id = MOUSE_IRQ;

	mouse_subscribe_int(&hook_id);
	mouse_set_stream_mode();
	mouse_enable_stream_mode();

	int r, ipc_status;
	message msg;
	unsigned char packet[3];

	while(cnt > 0)
	{
		// Message requested
		if ((r = driver_receive(ANY, &msg, &ipc_status)) != 0) {
			printf("driver_receive failed with: %d", r);
			continue;
		}
		if (is_ipc_notify(ipc_status)) { // Notification received
			switch (_ENDPOINT_P(msg.m_source)) // Notification interrupted
			{
			case HARDWARE:
				if (msg.NOTIFY_ARG & BIT(MOUSE_IRQ)) {
					if (test_packet_int_handler(&cnt))
						return 1;
				}
			default:
				break; // no other notifications expected: do nothing
			}
		}
	}

	mouse_disable_stream_mode();
	mouse_unsubscribe_int(hook_id);

	return 0;
}

int test_packet_int_handler(unsigned short* cnt)
{
	if(mouse_int_handler())
		return 1;

	mouse_struct info;

	if(mouse_get_packet(&info))
	{
		--*cnt;
		display_packet(info);
	}
	return 0;
}

int test_async(unsigned short *idle_time) {


	unsigned hook_id = MOUSE_IRQ;
	unsigned char timer_hook_bit = timer_subscribe_int();


	mouse_subscribe_int(&hook_id);
	mouse_set_stream_mode();
	mouse_enable_stream_mode();

	int r, ipc_status;
	message msg;
	unsigned char packet[3];

	unsigned timer_counter = 0;

	while(timer_counter < 60 * (*idle_time))
	{
		// Message requested
		if ((r = driver_receive(ANY, &msg, &ipc_status)) != 0) {
			printf("driver_receive failed with: %d", r);
			continue;
		}
		if (is_ipc_notify(ipc_status)) { // Notification received
			switch (_ENDPOINT_P(msg.m_source)) // Notification interrupted
			{
			case HARDWARE:
				if (msg.NOTIFY_ARG & BIT(MOUSE_IRQ)) {
					timer_counter = 0;
					if (test_async_mouse_int_handler())
						return 1;
				}
				else if (msg.NOTIFY_ARG & BIT(timer_hook_bit)) {
					++timer_counter;
				}
				break;
			default:
				break; // no other notifications expected: do nothing
			}
		}
	}

	mouse_disable_stream_mode();
	mouse_unsubscribe_int(hook_id);
	timer_unsubscribe_int();

	printf("Timeout.\n");

	return 0;
}

int test_async_mouse_int_handler()
{
	if(mouse_int_handler())
		return 1;

	mouse_struct info;

	if(mouse_get_packet(&info))
		display_packet(info);
	return 0;
}

int test_config(void) {
	unsigned hook_id = MOUSE_IRQ;

	mouse_subscribe_int(&hook_id);
	mouse_disable_stream_mode();

	mouse_status status;
	if (mouse_get_status(&status))
		return 1;

	display_config(&status);

	return 0;
}

int test_gesture(unsigned short length) {

	unsigned hook_id = MOUSE_IRQ;

		mouse_subscribe_int(&hook_id);
		mouse_set_stream_mode();
		mouse_enable_stream_mode();

		int r, ipc_status;
		message msg;
		unsigned char packet[3];

		while(abs(length) > 0)
		{
			// Message requested
			if ((r = driver_receive(ANY, &msg, &ipc_status)) != 0) {
				printf("driver_receive failed with: %d", r);
				continue;
			}
			if (is_ipc_notify(ipc_status)) { // Notification received
				switch (_ENDPOINT_P(msg.m_source)) // Notification interrupted
				{
				case HARDWARE:
					if (msg.NOTIFY_ARG & BIT(MOUSE_IRQ)) {
						if (test_gesture_int_handler(&length))
							return 1;
					}
				default:
					break; // no other notifications expected: do nothing
				}
			}
		}

		mouse_disable_stream_mode();
		mouse_unsubscribe_int(hook_id);

		printf("Positive slope w/ Right Button Pressed");
		return 0;
}

int test_gesture_int_handler(unsigned short *length)
{
	printf("length: %d \n", *length);
	if(mouse_int_handler())
			return 1;

		mouse_struct info;


		if(mouse_get_packet(&info))
		{

			if(info.right){
				if(length > 0 && info.y_delta > 0 && info.x_delta >0){
					*length-=info.y_delta;
					printf("length: %d \n", *length);
				}

				else if( length < 0 && info.y_delta < 0 && info.x_delta < 0){
					*length+=info.y_delta;
					printf("length: %d \n", *length);
				}
			}
			display_packet(info);
		}
		return 0;

}

void display_packet(mouse_struct info)
{
	printf("B1=0x%X\t", info.bytes[0]);

	printf("B2=0x%X\t", info.bytes[1]);

	printf("B3=0x%X\t", info.bytes[2]);

	printf("LB=%d\t", info.left);

	printf("MB=%d\t", info.middle);

	printf("RB=%d\t", info.right);

	printf("XOV=%d\t", info.x_ovfl);

	printf("YOV=%d\t", info.y_ovfl);

	printf("X=%d\t", info.x_delta);

	printf("Y=%d", info.y_delta);

	printf("\n");
	return;
}

void display_config(mouse_status *status)
{
	printf("Mouse configuration : \n");

	printf("Byte 1: 0x%02X\n", status->bytes[0]);
	printf("Byte 2: 0x%02X\n", status->bytes[1]);
	printf("Byte 3: 0x%02X\n", status->bytes[2]);

	if(status->remote_mode)
		printf("Remote (Polled) Mode.\n");
	else
		printf("Stream Mode \n");

	if(status->enable)
		printf("Data Reporting Enable \n");
	else
		printf("Data Reporting Disable \n");

	if(status->scaling)
		printf("Scaling 2:1 \n");
	else
		printf("Scaling 1:1 \n");

	if(status->left)
		printf("Left Button Pressed.\n");
	else
		printf("Left Button Released.\n");

	if(status->middle)
		printf("Middle Button Pressed.\n");
	else
		printf("Middle Button Released.\n");

	if(status->right)
		printf("Right Button Pressed.\n");
	else
		printf("Right Button Released.\n");

	printf("Resolution: %d \n", status->resolution);
	printf("Sample Rate: %d \n", status->sample_rate);

}
