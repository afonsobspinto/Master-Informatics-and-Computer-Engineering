#include "mouse.h"
#include "mouse_cmds.h"

static int mouse_hook_id;

Mouse* mouse = NULL;

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
	mouse->x = 400;
	mouse->y = 300;

	printf("%d\n", mouse->x);
	printf("%d\n", mouse->y);

	return mouse;
}


void drawMouse(){

	unsigned int color = 30;
	unsigned int size = 40;

	int i, j;

	mouse = getMouse();

	unsigned short half_size = size/2;

	for( i = mouse->x - half_size/2; i < mouse->x + half_size/2; i ++){
		draw_pixel(i,mouse->y,color);
	}

	for(j = mouse->y - half_size/2; j < mouse->y + half_size/2; j++){
		draw_pixel(mouse->x,j,color);
	}

}

void deleteMouse(){
	free(getMouse());
}

int mouseInside(int x1, int y1, int x2, int y2){
	return x1<= getMouse()->x && getMouse()->x <=x2
			&& y1<= getMouse()->y && getMouse()->y <= y2;
}

int subscribeMouse(){
//	if (sys_irqsetpolicy(MOUSE_IRQ, IRQ_REENABLE | IRQ_EXCLUSIVE, mouse_hook_id) == OK)
//		{
//			getMouse()->packet[0]=0;
//			getMouse()->packet[1]=0;
//			getMouse()->packet[2]=0;
//		//	getMouse()->byteBeingRead=0;
//			return mouse_hook_id;
//		}
//		return -1;
}

int unsubscribeMouse(){
	if (sys_irqrmpolicy(&mouse_hook_id) == OK)
		return 0;
	return 1;
}
