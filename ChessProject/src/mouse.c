#include "mouse.h"
#include "mouse_cmds.h"
#include "macros.h"
#include "video_gr.h"
#include "kbd.h"
#include "chess.h"
#include "utilities.h"
#include "ChessProject.h"
#include "game.h"


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

	m->x = 0;
	m->y = 0;
	m->size = 40;
	m->color = WHITE;
	m->state = NO_PIECE;
	m->menu_flag = 0;

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

int updateMouse(){

	mouse_struct info;
	MENU_STATE* menuState = getMenuState();
	GAME_STATE gameState = getGameState();
	MOVE_STATE *moveState = getMoveState();


	if(mouse_get_packet(&info)) {
		int new_x = mouse->x + info.x_delta;
		int new_y = mouse->y - info.y_delta;


		if(new_x > 0 && new_x < getHorResolution() &&
				new_y > 0 && new_y < getVerResolution()){
			mouse->x = new_x;
			mouse->y = new_y;
		}

		// MENU
		if (*menuState == MENU){

			if(mouseInside(XFONT-WIDTHLOCAL/2, YLOCAL-FONT_HEIGTH/2, XFONT+WIDTHLOCAL/2, YLOCAL+FONT_HEIGTH/2)){
				drawMenu(2,1,1);
				mouse->menu_flag = 1;
				if(info.left)
					return 1;
			}

//			else if(mouseInside(XFONT-WIDTHSERIAL/2, YSERIAL-FONT_HEIGTH/2, XFONT+WIDTHSERIAL/2, YSERIAL+FONT_HEIGTH/2)){
//				drawMenu(1,2,1);
//				mouse->menu_flag = 1;
//				if(info.left)
//					return 2;
//			}

			else if(mouseInside(XFONT-WIDTHEXIT/2, YEXIT-FONT_HEIGTH/2, XFONT+WIDTHEXIT/2, YEXIT+FONT_HEIGTH/2)){
				drawMenu(1,1,2);
				mouse->menu_flag = 1;
				if(info.left)
					return 3;
			}

			else if (mouse->menu_flag == 1){
				mouse->menu_flag = 0;
				drawMenu(1,1,1);
			}
		}


		// MULTIPLAYER LOCAL
		if (*menuState == MULTIPLAYER_LOCAL && gameState != PAUSED)
			if(info.left){
				if(mouse->state == NO_PIECE){
					if(isPieceSelected(1)==1){
						mouse->state = PIECE_1_SELECTED;
						*moveState=NOMOVE;
					}

				}
				else{
					if(isPieceSelected(0)==1){

						int move = makeMove(mouse->piece, mouse->next_piece, 0);
						//Normal Move
						if(move == 1 || move == PROMOTION ){
							mouse->state = NO_PIECE;
							*moveState = NORMALMOVE;
							return 1;
						}
						//CASTLING
						else if(move == WHITE_SHORT_CASTLING ||
								move == WHITE_LONG_CASTLING ||
								move == BLACK_SHORT_CASTLING ||
								move == BLACK_LONG_CASTLING){
							mouse->state = NO_PIECE;
							*moveState = CASTLING;
							return 1;
						}
						else if(move == W_EN_PASSANT ||
								move == B_EN_PASSANT){
							mouse->state = NO_PIECE;
							*moveState = ENPASSANT;
							return 1;
						}

						else if(move == CHECKMATE){
							return CHECKMATE;
						}

						else if(move == STALEMATE)
							return STALEMATE;


						mouse->state = NO_PIECE;

					}


				}

			}
	}

	return 0;

}

void deleteMouse(){
	free(getMouse());
}


int isPieceSelected (int flag){

	unsigned int i = 0;
	for(; i < ROWS ; i++){
		unsigned int u = 0;
		for (; u < COLS ; u++){
			Piece P = getMatrixAt(i,u);

			int xpos = P.xpos;
			int ypos = P.ypos;

			GAME_STATE gameState = getGameState();

			if(flag == 1){
				if(P.state == 1){

					if(gameState == WHITE2PLAY){
						if(P.color == 'w'){
							if(mouseInside(xpos-SQUARE_SIZE, ypos-SQUARE_SIZE, xpos+SQUARE_SIZE, ypos+SQUARE_SIZE)){
								mouse->piece = P;

								return 1;
							}
						}
					}
					else if(gameState == BLACK2PLAY){
						if(P.color == 'b'){
							if(mouseInside(xpos-SQUARE_SIZE, ypos-SQUARE_SIZE, xpos+SQUARE_SIZE, ypos+SQUARE_SIZE)){
								mouse->piece = P;

								return 1;
							}
						}
					}
				}
			}
			else
			{
				if(mouseInside(xpos-SQUARE_SIZE, ypos-SQUARE_SIZE, xpos+SQUARE_SIZE, ypos+SQUARE_SIZE)){
					mouse->next_piece = P;

					return 1;
				}
			}
		}
	}

	return 0;
}

int mouseInside(int x1, int y1, int x2, int y2){
	return x1<= getMouse()->x - CORRECTION && getMouse()->x - CORRECTION <=x2
			&& y1<= getMouse()->y - CORRECTION && getMouse()->y - CORRECTION <= y2;
}

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
		info->x_ovf = (packet[0] & BIT(MOUSE_X_OVFL));

		// Y Overflow
		info->y_ovf = (packet[0] & BIT(MOUSE_Y_OVFL));

		// Left Button
		info->left = (packet[0] & BIT(MOUSE_L_B));

		// Middle Button
		info->middle = (packet[0] & BIT(MOUSE_M_B));

		// Right Button
		info->right = (packet[0] & BIT(MOUSE_R_B));


		if (info->x_ovf)
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

				if (info->y_ovf)
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

