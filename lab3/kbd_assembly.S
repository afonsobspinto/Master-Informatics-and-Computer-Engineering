#include "I8042.h"

.global _kbd_handler_ass

.text

_kbd_handler_ass:
	xor %eax, %eax
	in $OUT_BUF, %eax
	ret
