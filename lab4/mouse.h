#ifndef __MOUSE_H
#define __MOUSE_H

#include "I8042.h"

/**
 * @brief Subscribes and enables mouse interrupt
 *
 * @return Returns bit order in interrupt mask; negative value on failure
 */
int mouse_subscribe_int(void);

/**
 * @brief Unsubscribes mouse interrupts
 *
 * @return Return 0 upon success and non-zero otherwise
 */

int mouse_unsubscribe_int();

int read_mouse_byte(unsigned char packet[], unsigned short int byteCounter);

#endif /* __MOUSE_H */
