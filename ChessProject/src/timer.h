#ifndef __TIMER_H
#define __TIMER_H

/** @defgroup timer timer
 * @{
 *
 * Functions for using the i8254 timers
 */


/**
 * @brief Subscribes and enables Timer 0 interrupts
 *
 * @return Returns bit order in interrupt mask; negative value on failure
 */
int timer_subscribe_int(unsigned int* hook_id);

/**
 * @brief Unsubscribes Timer 0 interrupts
 *
 * @return Return 0 upon success and non-zero otherwise
 */
int timer_unsubscribe_int(unsigned int hook_id);


#endif /* __TIMER_H */
