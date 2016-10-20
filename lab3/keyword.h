#ifndef __KEYWORD_H
#define __KEYWORD_H


/**
 * @brief Subscribes and enables Keyword interrupts
 *
 * @return Returns bit order in interrupt mask; negative value on failure
 */
int keyword_subscribe_int(void );

/**
 * @brief Unsubscribes Keyword interrupts
 *
 * @return Return 0 upon success and non-zero otherwise
 */
int keyword_unsubscribe_int();

#endif /* __KEYWORD_H */
