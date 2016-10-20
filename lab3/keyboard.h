#ifndef __keyboard_H
#define __keyboard_H


/**
 * @brief Subscribes and enables keyboard interrupts
 *
 * @return Returns bit order in interrupt mask; negative value on failure
 */
int keyboard_subscribe_int(void );

/**
 * @brief Unsubscribes keyboard interrupts
 *
 * @return Return 0 upon success and non-zero otherwise
 */
int keyboard_unsubscribe_int();

#endif /* __keyboard_H */
