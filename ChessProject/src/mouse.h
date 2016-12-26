
#include <minix/drivers.h>

typedef struct {
    int x, y;
    int xSign, ySign;
    int xOvf, yOvf;
    int deltaX, deltaY;

    unsigned long packet[3];

    int leftButton;
    int middleButton;
    int rightButton;

	int current_click;
	int previous_click;

	int color;
	int size;

} Mouse;

Mouse* newMouse();
Mouse* getMouse();

void drawMouse();
void deleteMouse();

int mouseInside(int x1, int y1, int x2, int y2);

int subscribeMouse();
int unsubscribeMouse();



