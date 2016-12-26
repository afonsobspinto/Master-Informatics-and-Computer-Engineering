#include "mouse.h"
#include "mouse_cmds.h"
#include "macros.h"
#include "video_gr.h"

static int mouse_hook_id;

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

int subscribeMouse(){
	if (sys_irqsetpolicy(MOUSE_IRQ, IRQ_REENABLE | IRQ_EXCLUSIVE, mouse_hook_id) == OK)
			return mouse_hook_id;
		return -1;
}

int unsubscribeMouse(){
	if (sys_irqrmpolicy(&mouse_hook_id) == OK)
		return 0;
	return 1;
}


