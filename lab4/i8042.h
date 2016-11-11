#ifndef _I8042_H
#define _I8042_H

#define KBD_IRQ				         	1
#define KBD_TIMEOUT				        20000

// KBC registers
#define KBC_STAT_REG					0x64
#define KBC_CTRL_REG					0x64
#define KBC_IN_BUF						0x60
#define KBC_OUT_BUF						0x60

// C@KBD responses
#define KBD_ACK		        	        0xFA
#define KBD_RESEND		                0xFE
#define KBD_ERROR		                0xFC

// Keyboard Commands
#define RESET_KBD				     	0xFF
#define SET_DEF_EN_KBD                  0xF6
#define	DISABLE_KBD				        0xF5
#define CLEAR_BUF_EN_KBD		        0xF4
#define CHANGE_KBD_REPETITION		    0xF3
#define SWITCH_KBD_LEDS			        0xED

// LEDs
#define CAPSLOCK_BIT			        2
#define NUMLOCK_BIT			            1
#define SCROLL_BIT			            0

// KBC Status Register
#define KBC_PARITY_BIT	                7
#define KBC_TIMEOUT_BIT		            6
#define KBC_AUX_BIT				        5
#define KBC_INH_BIT						4
#define KBC_A2_BIT						3
#define KBC_SYS_BIT					    2
#define KBC_IBF_BIT					    1
#define KBC_OBF_BIT						0

// KBC Commands
#define KBC_READ_COMMAND_BYTE		    0x20
#define KBC_WRITE_COMMAND_BYTE	        0x60
#define KBC_CHECK_KBC				    0xAA
#define KBC_CHECK_KEYBOARD_ITF	        0xAB
#define KBC_DIS_KBD_ITF		           	0xAD
#define KBC_EN_KBD_ITF		            0xAE
#define KBC_WRITE_BYTE_TO_MOUSE			0xD4

// KBC Self-test result
#define CHECK_KBC_OK			     	0x55
#define CHECK_KBC_ERROR		            0xFC

// KBC Command Byte
#define CMD_BYTE_DIS_MOUSE_BIT       	5
#define CMD_BYTE_DIS_KEYBOARD_BIT	    4
#define CMD_BYTE_MOUSE_INT_BIT	        1
#define CMD_BYTE_KBD_INT_BIT	        0

#define SCANCODE_FB_BYTE		        0xE0


// Others

#define BIT(n) (0x01<<(n))

#endif
