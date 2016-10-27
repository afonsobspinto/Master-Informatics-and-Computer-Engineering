#ifndef _LCOM_I8042_H_
#define _LCOM_I8042_H_

/** @defgroup i8042
 * @{
 *
 * Constants for programming the i8042 Keyboard. Needs to be completed.
 */

#define DELAY_US    20000 // Wait time in microseconds

#define TWO_BYTES_SCANCODE		0xE0
#define OUT_BUF					0x60
#define ESC_BREAK			0x81
#define KBC_IRQ					1
#define BIT(n) (0x01<<(n))

#endif /* _LCOM_I8042_H */
