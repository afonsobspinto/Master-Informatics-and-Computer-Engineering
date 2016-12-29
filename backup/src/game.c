#include "timer.h"
#include "i8254.h"
#include "macros.h"
#include "kbd.h"
#include "utilities.h"
#include "bitmap.h"
#include "mouse.h"
#include "mouse_cmds.h"
#include "game.h"
#include "ChessProject.h"
#include <minix/syslib.h>
#include <minix/drivers.h>


#define KEY_SPACE 						0x0039
#define KEY_BKSP						0x000E
#define KEY_ESC							0x0001
#define KEY_ENTER						0x001C
#define gameTime  						3


static int counterPlayer1 = 60*gameTime;
static int counterPlayer2 = 60*gameTime;

static GAME_STATE game_state;

MENU_STATE game_management(){

	fillBoard();
	drawBoard();

	game_state = WHITE2PLAY;
	GAME_STATE old_game_state;

	int kbc_hook = KBC_IRQ;

	if(kbc_subscribe_int(&kbc_hook)<0)
		return END;

	int timer_hook= timer_subscribe_int();
	if(timer_hook<0)
		return END;

	unsigned hook_id = MOUSE_IRQ;

	if (mouse_subscribe_int(&hook_id)==-1)
		return END;
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

	int click;

	while((counterPlayer1 > 0) && (counterPlayer2 > 0) && (key != KEY_ESC)
			&& (game_state != BLACKWINS) && (game_state != WHITEWINS))
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

					if(game_state == BLACK2PLAY || game_state == WHITE2PLAY){
						if(key == KEY_BKSP){
							if(unmakeMove()==1)
								turnGameState();
						}
						else if (key == KEY_SPACE){
							old_game_state = game_state;
							game_state = PAUSED;
							drawPaused();
						}
					}
					else if(game_state == PAUSED){
						if(key == KEY_SPACE){
							game_state = old_game_state;
							fill_buffer(BLACK);
							drawBoard();
						}

					}
				}
				if (msg.NOTIFY_ARG & timer_hook) {
					if(game_state == WHITE2PLAY){
						decrement(&counterPlayer1_tics);
						drawMouse();
						if(counterPlayer1_tics%60==0){
							width_temp = counterPlayer1 * width / totalsegundos;
							xPlayer1 = x1 +width_temp;
							draw_rectangle(x1, x1 + width, yPlayer1, yPlayer1+heigth, BLACK);
							if(counterPlayer1 > totalsegundos/4)
								draw_rectangle(x1, xPlayer1, yPlayer1, yPlayer1+heigth, BLUE);
							else
								draw_rectangle(x1, xPlayer1, yPlayer1, yPlayer1+heigth, RED);
							if(counterPlayer2 > totalsegundos/4)
								draw_rectangle(x1, xPlayer2, yPlayer2, yPlayer2+heigth,BLUE);
							else
								draw_rectangle(x1, xPlayer2, yPlayer2, yPlayer2+heigth,RED);
							decrement(&counterPlayer1);
						}
					}
					else if(game_state == BLACK2PLAY){
						decrement(&counterPlayer2_tics);
						drawMouse();
						if(counterPlayer2_tics%60==0){
							width_temp = counterPlayer2 * width / totalsegundos;
							xPlayer2 = x1 +width_temp;
							draw_rectangle(x1, x1 + width, yPlayer2, yPlayer2+heigth, BLACK);
							if(counterPlayer2 > totalsegundos/4)
								draw_rectangle(x1, xPlayer2, yPlayer2, yPlayer2+heigth, BLUE);
							else
								draw_rectangle(x1, xPlayer2, yPlayer2, yPlayer2+heigth, RED);
							if(counterPlayer1 > totalsegundos/4)
								draw_rectangle(x1, xPlayer1, yPlayer1, yPlayer1+heigth, BLUE);
							else
								draw_rectangle(x1, xPlayer1, yPlayer1, yPlayer1+heigth, RED);
							decrement(&counterPlayer2);

						}

					}
					else
						continue;
				}

				if (msg.NOTIFY_ARG & BIT(MOUSE_IRQ)){
					mouse_int_handler();
					click = updateMouse();
					if(click==1)
						turnGameState();
					else if(click==2){
						winnerState();
					}
				}

				break;
			default:
				break; // no other notifications expected: do nothing
			}
		}
	}


	if(kbc_unsubscribe_int(kbc_hook) != 0)
		return END;

	if(timer_unsubscribe_int()==-1)
		return END;

	mouse_disable_stream_mode();

	if(mouse_unsubscribe_int(hook_id)==-1)
		return END;


	unsigned char st;
	kbc_read(&st);



	drawWinner();
	waitForEnter();

	reset();

	return MENU;

}

void reset(){


	fill_buffer(BLACK);
	counterPlayer1 = 60*gameTime;
	counterPlayer2 = 60*gameTime;

	Mouse* m = getMouse();
	Piece NoPiece;
	NoPiece.state = 0;

	m->state = NO_PIECE;
	m->menu_flag = 0;
	m->unmake_flag =0;
	m->piece = NoPiece;
	m->next_piece = NoPiece;

	reset_castling();


}

void increment(int *counter){
	asm ("movl %1, %%eax; incl %%eax; movl %%eax,%0;"
			:"=r"(*counter)
			 :"r"(*counter)
			  :"%eax"
	);
}

void decrement(int *counter){

	asm ("movl %1, %%eax; decl %%eax; movl %%eax,%0;"
			:"=r"(*counter)
			 :"r"(*counter)
			  :"%eax"
	);
}

void winnerState(){
	if(game_state == BLACK2PLAY)
		asm ("movl %1, %%eax; movl %%eax,%0;"
				:"=r"(game_state)
				 :"r"(BLACKWINS)
				  :"%eax"
		);
	else if(game_state == WHITE2PLAY)
		asm ("movl %1, %%eax; movl %%eax,%0;"
				:"=r"(game_state)
				 :"r"(WHITEWINS)
				  :"%eax"
		);
}

void turnGameState(){
	if(game_state == BLACK2PLAY)
		asm ("movl %1, %%eax; movl %%eax,%0;"
				:"=r"(game_state)
				 :"r"(WHITE2PLAY)
				  :"%eax"
		);
	else if(game_state == WHITE2PLAY)
		asm ("movl %1, %%eax; movl %%eax,%0;"
				:"=r"(game_state)
				 :"r"(BLACK2PLAY)
				  :"%eax"
		);
}

GAME_STATE getGameState(){
	GAME_STATE out;
	asm ("movl %1, %%eax; movl %%eax,%0;"
			:"=r"(out)
			 :"r"(game_state)
			  :"%eax"
	);
	return out;
}


MENU_STATE menu_management(){


	drawMenu(1,1,1);

	int timer_hook= timer_subscribe_int();
	if(timer_hook<0)
		return END;

	unsigned hook_id = MOUSE_IRQ;

	if (mouse_subscribe_int(&hook_id)==-1)
		return END;

	mouse_set_stream_mode();
	mouse_enable_stream_mode();

	int widthLocal = 300;
	int widthSerial = 320;
	int widthExit = 75;
	int heigth = 45;
	int x = 400;
	int yLocal = 200;
	int ySerial = 380;
	int yExit = 560;


	int r, ipc_status;
	message msg;

	int click;


	while(1)
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
					drawMouse();
				}

				if (msg.NOTIFY_ARG & BIT(MOUSE_IRQ)){
					mouse_int_handler();
					click = updateMouse();
					switch (click){
					case 1:
						return MULTIPLAYER_LOCAL;
					case 2:
						return MULTIPLAYER_SERIAL;
					case 3:
						return END;
					}
				}

				break;
			default:
				break; // no other notifications expected: do nothing
			}
		}
	}

	return END;
}

int waitForEnter(){


    int ipc_status;
    message msg;

    int r;

	int kbc_hook = KBC_IRQ;

	if(kbc_subscribe_int(&kbc_hook)<0)
		return 1;
    unsigned long key;


    while(key != KEY_ENTER) { /* You may want to use a different condition */

            /* Get a request message. */

            if ( (r = driver_receive(ANY, &msg, &ipc_status)) != 0 ) {
                    printf("driver_receive failed with: %d", r);
                    continue;

            }

            if (is_ipc_notify(ipc_status)) { /* received notification */

                    switch (_ENDPOINT_P(msg.m_source)) {
                    case HARDWARE: /* hardware interrupt notification */
                    	if (msg.NOTIFY_ARG & BIT(KBC_IRQ)){ /* subscribed interrupt */
                            	if(sys_inb(KBC_OUT_BUF, &key)!= OK)
                            		return -1;
                            }
                    default:
                            break; /* no other notifications expected: do nothing */
                    }
            } else { /* received a standard message, not a notification */
                    /* no standard messages expected: do nothing */
            }
    }

	if(kbc_unsubscribe_int(kbc_hook) != 0)
		return 1;

	unsigned char st;
	kbc_read(&st);

    return 0;
}
