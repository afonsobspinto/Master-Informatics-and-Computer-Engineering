#include "timer.h"
#include "i8254.h"
#include "macros.h"
#include "kbd.h"
#include "utilities.h"
#include "bitmap.h"
#include "mouse.h"
#include "mouse_cmds.h"
#include <minix/syslib.h>
#include <minix/drivers.h>


#define gameTime  3;

static counterPlayer1 = 60*gameTime;
static counterPlayer2 = 60*gameTime;
static game_state = WHITE2PLAY;

int game_management(){

	fillBoard();
	drawBoard();

	int kbc_hook = KBC_IRQ;

	if(kbc_subscribe_int(&kbc_hook)<0)
		return 1;

	int timer_hook= timer_subscribe_int();
	if(timer_subscribe_int()<0)
		return 1;

	unsigned hook_id = MOUSE_IRQ;

	mouse_subscribe_int(&hook_id);
	mouse_set_stream_mode();
	mouse_enable_stream_mode();

	int r, ipc_status;

	unsigned long key = 0;

	message msg;

	int counterPlayer1_tics = counterPlayer1*60;
	int counterPlayer2_tics = counterPlayer2*60;

	int totalsegundos =  counterPlayer1;

	int x1 = 5;
	int width = 190;
	int heigth = 30;
	int width_temp;

	int xPlayer1 = x1+width;
	int xPlayer2 = xPlayer1;
	int yPlayer1 = 250;
	int yPlayer2 = 450;


	//while(game_state == BLACK2PLAY || game_state == WHITE2PLAY){



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
					if (msg.NOTIFY_ARG & BIT(KBC_IRQ))
					{
						if(sys_inb(KBC_OUT_BUF, &key)!= OK)
							return 1;
					}
					if (msg.NOTIFY_ARG & timer_hook) {
						if(game_state == WHITE2PLAY){
							counterPlayer1_tics-=1;
							drawMouse();
							if(counterPlayer1_tics%60==0){
								width_temp = counterPlayer1 * width / totalsegundos;
								xPlayer1 = x1 +width_temp;
								draw_rectangle(x1, x1 + width, yPlayer1, yPlayer1+heigth, BLACK);
								draw_rectangle(x1, xPlayer1, yPlayer1, yPlayer1+heigth, BLUE);
								draw_rectangle(x1, xPlayer2, yPlayer2, yPlayer2+heigth,BLUE);
								counterPlayer1-=1;
							}
						}
						else if(game_state == BLACK2PLAY){
							counterPlayer2_tics-=1;
							drawMouse();
							if(counterPlayer2_tics%60==0){
								width_temp = counterPlayer2 * width / totalsegundos;
								xPlayer2 = x1 +width_temp;
								draw_rectangle(x1, x1 + width, yPlayer2, yPlayer2+heigth, BLACK);
								draw_rectangle(x1, xPlayer2, yPlayer2, yPlayer2+heigth, BLUE);
								draw_rectangle(x1, xPlayer1, yPlayer1, yPlayer1+heigth, BLUE);
								counterPlayer2-=1;

							}

						}
					}

					if (msg.NOTIFY_ARG & BIT(MOUSE_IRQ)){
						mouse_int_handler();
						if(updateMouse()==1){
							if (game_state == BLACK2PLAY)
								game_state = WHITE2PLAY;
							else if (game_state == WHITE2PLAY)
								game_state = BLACK2PLAY;
						}

					}

					break;
				default:
					break; // no other notifications expected: do nothing
				}
			}
		}
//	}

	if(kbc_unsubscribe_int(kbc_hook) != 0)
		return 1;

	timer_unsubscribe_int();

	mouse_disable_stream_mode();
	mouse_unsubscribe_int(hook_id);
	unsigned char st;
	kbc_read(&st);

	return 0;

}

GAME_STATE getGameState(){
	return game_state;
}

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


	unsigned char st;
	kbc_read(&st);

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



