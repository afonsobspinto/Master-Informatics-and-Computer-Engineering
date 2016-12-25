#ifndef __VIDEO_GR_H
#define __VIDEO_GR_H

#include "bitmap.h"
/** @defgroup video_gr video_gr
 * @{
 *
 * Functions for outputing data to screen in graphics mode
 */


/**
 * @brief Initializes the video module in graphics mode
 * 
 * Uses the VBE INT 0x10 interface to set the desired
 *  graphics mode, maps VRAM to the process' address space and
 *  initializes static global variables with the resolution of the screen, 
 *  and the number of colors
 * 
 * @param mode 16-bit VBE mode to set
 * @return Virtual address VRAM was mapped to. NULL, upon failure.
 */
void *vg_init(unsigned short mode);

 /**
 * @brief Returns to default Minix 3 text mode (0x03: 25 x 80, 16 colors)
 * 
 * @return 0 upon success, non-zero upon failure
 */
int vg_exit(void);

/**
 * @brief Returns the horizontal resolution of the current video mode
 *
 *@return  horizontal resolution of the current video mode
 */
unsigned getHorResolution();
/**
 * @brief Returns the vertical resolution of the current video mode
 *
 *@return  Vertical resolution of the current video mode
 */
unsigned getVerResolution();

/**
 * @brief Returns a pointer to the buffer
 *
 *@return Pointer to the buffer
 */
char *getGraphicsBuffer();

void call_drawBitmap(Bitmap* bmp, int x, int y, Alignment alignment);

void copy2VideoMem();

void copy2Mbuffer();

void fill_screen(unsigned long color);

void draw_pixel(unsigned short x, unsigned short y, unsigned long color);

void draw_rectangle(unsigned short x1, unsigned short x2, unsigned short y1, unsigned short y2, unsigned long color);



#endif /* __VIDEO_GR_H */
