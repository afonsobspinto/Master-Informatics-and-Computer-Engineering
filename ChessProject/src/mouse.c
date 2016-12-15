#include "mouse.h"
#include "mouse_cmds.h"

#define defaultSize 3

static int mouse_hook_id;

Mouse* mouse = NULL;
Mouse mousePreviousState;

Mouse* newMouse();

Mouse* getMouse(){
	if(!mouse){
		enableMouse();
		mouse = newMouse();
	}

	return mouse;
}

int enableMouse(){
 return 0;
}

Mouse* newMouse(){
	Mouse* mouse = (Mouse*) malloc (sizeof(Mouse));
	mouse->x = 0;
	mouse->y=0;
}

void drawCrosshair(Mouse* mouse){
//	int x = mouse->x;
//	int y = mouse->y;
//	int size = mouse->size;
//
//	drawDirectLine(x-size, y-1, x+size,y-1, mouse->color1 );
//	drawDirectLine(x-size, y+1, x+size,y+1, mouse->color1 );
//	drawDirectLine(x-1, y-size, x-1,y+size, mouse->color1 );
//	drawDirectLine(x+1, y-size, x+1,y+size, mouse->color1 );
//
//	drawDirectLine(x-size, y, x+size,y, mouse->color2 );
//	drawDirectLine(x, y-size, x,y+size, mouse->color2 );
}

void drawMouse(){
	drawCrosshair(getMouse());
	getMouse()->draw=0;
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
		{
			getMouse()->packet[0]=0;
			getMouse()->packet[1]=0;
			getMouse()->packet[2]=0;
			getMouse()->byteBeingRead=0;
			return mouse_hook_id;
		}
		return -1;
}

int unsubscribeMouse(){
	if (sys_irqrmpolicy(&mouse_hook_id) == OK)
		return 0;
	return 1;
}
