#include "timer.h"
#include "i8254.h"
#include "macros.h"
#include "kbd.h"
#include <minix/syslib.h>
#include <minix/drivers.h>


static counterPlayer1 = 30;
static counterPlayer2 = 30;

int game_management(){

	int kbd_hook = KBD_IRQ;

	if(kbd_subscribe_int(&kbd_hook)<0)
		return 1;


	int timer_hook= timer_subscribe_int();

	if(timer_subscribe_int()<0)
		return 1;

	int r, ipc_status;

	unsigned long key = 0;

	message msg;

	printf("Counter Inicial: %d", counterPlayer1);

	int counterPlayer1_tics = counterPlayer1*60;

	while((counterPlayer1 > 0) && (key != KEY_SPACE))

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
					if(sys_inb(KBD_OUT_BUF, &key)!= OK)
						return 1;
				}

				if (msg.NOTIFY_ARG & timer_hook) {

					counterPlayer1_tics-=1;

					if(counterPlayer1_tics%60==0)
						counterPlayer1-=1;

//					printf("tics: %d \n", counterPlayer1_tics);
					printf("tempo: %d \n", counterPlayer1);
				}

				break;
			default:

				break; // no other notifications expected: do nothing

			}

		}

	}

	if(kbd_unsubscribe_int(kbd_hook) != 0)
		return 1;

	timer_unsubscribe_int();

	return 0;

}


int draw_timer(unsigned int counter, unsigned int color){

	int timer_hook= timer_subscribe_int();

	if(timer_subscribe_int()<0)
		return 1;

	int r, ipc_status;

	message msg;


	int counterPlayer1_tics = counterPlayer1*60;

	int x1 = 20;
	int x2 = 50;
	int y1 = 0;
	int y2 = counterPlayer1;

	while((counterPlayer1 > 0))

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

				if (msg.NOTIFY_ARG & timer_hook) {

					counterPlayer1_tics-=1;

					if(counterPlayer1_tics%60==0){
						counterPlayer1-=1;
						fill_screen(0);
						draw_rectangle(x1, x2, y1, y2, color);
						y1 += 1;
					}

					printf("tempo: %d \n", counterPlayer1);
				}

				break;
			default:

				break; // no other notifications expected: do nothing

			}

		}

	}

	timer_unsubscribe_int();

	return 0;

}
