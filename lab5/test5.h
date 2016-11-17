#ifndef __TEST5_H
#define __TEST5_H

/** @defgroup lab5 lab5
 * @{
 *
 * Functions for outputing data to screen in graphics mode
 */

/**
 * @brief Tests initialization of video card in graphics mode
 * 
 * Uses the VBE INT 0x10 interface to set the desired
 *  graphics mode, and resets Minix's default text mode after 
 *  a short delay. Before exiting, displays on the console the
 *  physical address of VRAM in the input graphics mode.
 * 
 * @param mode 16-bit VBE mode to set
 * @param delay delay in seconds after which returns to text mode
 * @return Virtual address VRAM was mapped to. NULL, upon failure.
 */
void *test_init(unsigned short mode, unsigned short delay);

/**
 * @brief Tests drawing a square with a given color
 * 
 * Tests drawing a square with the specified size and color, at the specified
 *  coordinates (which specify the upper left corner (ULC)) in video mode 0x105
 * 
 * @param x horizontal coordinate of ULC, starts at 0 (leftmost pixel)
 * @param y vertical coordinate of ULC, starts at 0 (top pixel)
 * @param size of each side in pixels
 * @param color color to set the pixel
 * @return 0 on success, non-zero otherwise
 */
int test_square(unsigned short x, unsigned short y, unsigned short size, unsigned long color);

/**
 * @brief Tests drawing a line segment with specifed end points and color
 * 
 * Tests drawing a line segment with the specified end points and the input color, 
 *  by writing to VRAM in video mode 0x105
 * 
 * @param xi horizontal coordinate of "first" endpoint, starts at 0 (leftmost pixel)  
 * @param yi vertical coordinate of "first" endpoint, starts at 0 (top pixel)
 * @param xf horizontal coordinate of "last" endpoint, starts at 0 (leftmost pixel)  
 * @param yf vertical coordinate of "last" endpoint, starts at 0 (top pixel)  
 * @param color color of the line segment to draw
 * @return 0 upon success, non-zero upon failure
 */
int test_line(unsigned short xi, unsigned short yi, 
		           unsigned short xf, unsigned short yf, unsigned long color);

/**
 * @brief Tests drawing XPM on the screen at specified coordinates
 * 
 * Tests drawing a sprite from an XPM on the screen at specified coordinates
 *  by writing to VRAM in video mode 0x105
 * 
 * @param xi horizontal coordinate of upper-left corner, starts at 0 (leftmost pixel)  
 * @param yi vertical coordinate of upper-left corner, starts at 0 (top pixel)
 * @param xpm array with XPM (assuming indexed color mode)   
 * @return 0 upon success, non-zero upon failure
 */
int test_xpm(unsigned short xi, unsigned short yi, char *xpm[]);

/**
 * @brief Tests moving sprite on the screen along horizontal/vertical axes
 * 
 * Tests moving a XPM on the screen along horizontal/vertical axes, at the specified speed, in video mode 0x105
 * 
 * @param xi horizontal coordinate of upper-left corner, starts at 0 (leftmost pixel)  
 * @param yi vertical coordinate of upper-left corner, starts at 0 (top pixel)
 * @param xpm array with XPM (assuming indexed color mode)   
 * @param hor whether the movement is in the horizontal direction (!= 0) or in the vertical direction (== 0)
 * @param delta movement in along specified direction in pixels
 * @param time duration in seconds of the movement
 * @return 0 upon success, non-zero upon failure
 */
int test_move(unsigned short xi, unsigned short yi, char *xpm[], unsigned short hor, short delta, unsigned short time);


/**
 * @brief Tests retrieving VBE controller information  (VBE function 0x0)
 * 
 * Tests retrieving VBE controller information (VBE function 0x0) and its parsing.
 * Upon its invocation it should provide at least the following information:
 * 	- Capabilities
 * 	- List of mode numbers supported
 * 	- Total memory
 * 
 * @return 0 upon success, non-zero upon failure
 */
int test_controller();

 /** @} end of lab5 */
 
 
#endif /* __TEST5_H */
