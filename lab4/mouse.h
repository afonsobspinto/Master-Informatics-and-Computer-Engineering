#include "kbc.h"
#include "i8042.h"
#include <minix/drivers.h>

typedef struct
{
	unsigned char bytes[3];
	int x_ovfl;
	int y_ovfl;
	int left;
	int middle;
	int right;
	int x_delta;
	int y_delta;
} mouse_struct;

typedef struct
{
	unsigned char bytes[3];
	int remote_mode;
	int enable;
	int scaling;
	int left;
	int middle;
	int right;
	unsigned char resolution;
	unsigned char sample_rate;
} mouse_status;


int mouse_subscribe_int(unsigned *hook_id);

int mouse_unsubscribe_int(unsigned hook_id);

int mouse_write(unsigned char cmd);

int mouse_read(unsigned char* read);

int mouse_set_stream_mode();

int mouse_enable_stream_mode();

int mouse_disable_stream_mode();

int mouse_get_packet(mouse_struct *info);

int mouse_get_status(mouse_status *status);

int mouse_int_handler();

int mouse_sync();
