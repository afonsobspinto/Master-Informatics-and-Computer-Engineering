/** @defgroup kbc kbc
 * @{
 *
 * Functions for using the keyboard and mouse
 */

#include <minix/drivers.h>

int kbc_read(unsigned char* st);

int kbc_read_status(unsigned long* status);

int kbc_write_to_mouse();

int kbc_send_data(unsigned char cmd);

int kbc_unsubscribe_int();

