
#include <minix/drivers.h>

typedef struct {
    int x, y;
    int xSign, ySign;
    int deltaX, deltaY;
    double speedMultiplier;

    int byteBeingRead;
    unsigned long packet[3];

    int leftButtonDown;
    int middleButtonDown;
    int rightButtonDown;

    int leftButtonReleased;
    int rightButtonReleased;
    int middleButtonReleased;

    int size;
    int color1, color2;

    int hasBeenUpdated;
    int draw;
} Mouse;

Mouse* getMouse();
void updateMouse();
void drawMouse();
void deleteMouse();

int mouseInside(int x1, int y1, int x2, int y2);

int subscribeMouse();
int unsubscribeMouse();

int enableMouse();
int readMouse(unsigned long*);
int writeToMouse(unsigned char);

