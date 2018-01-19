#ifndef __KBD_H
#define __KBD_H

int kbc_subscribe_int(unsigned* kbd_hook);

int kbc_read(unsigned char* st);

int kbc_read_status(unsigned long* status);

int kbc_write_to_mouse();

int kbc_send_data(unsigned char cmd);

int kbc_unsubscribe_int(unsigned hook_id);



#endif /* __KBD_H */
