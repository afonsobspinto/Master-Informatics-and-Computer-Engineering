
#include <minix/drivers.h>

typedef struct{
	unsigned char bytes[3];
	int y_ovf;
	int x_ovf;
	int y_sign;
	int x_sign;
	int middle;
	int right;
	int left;
	short x_delta;
	short y_delta;
} mouse_struct;

typedef struct  {
	int x;
	int y;
	int current_click;
	int previous_click;
	int size;
	int color;
}Mouse;

Mouse* newMouse();
Mouse* getMouse();

void drawMouse();
void updateMouse();
void deleteMouse();

int isPieceSelected ();
int mouseInside(int x1, int y1, int x2, int y2);

void display_packet(mouse_struct info);

int mouse_subscribe_int(unsigned *hook_id);
int mouse_unsubscribe_int(unsigned hook_id);
int mouse_write(unsigned char cmd);
int mouse_read(unsigned char* read);
int mouse_set_stream_mode();
int mouse_enable_stream_mode();
int mouse_disable_stream_mode();
int mouse_get_packet(mouse_struct *info);
int mouse_int_handler();
int mouse_sync();
