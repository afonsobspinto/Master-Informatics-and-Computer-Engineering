#ifndef _MACROS_KBD
#define _MACROS_KBD

#define KBD_IRQ				         	1
#define KBD_OUT_BUF					 	0x60
#define KBD_IN_BUF 						0x60
#define KBC_CMD_REG 					0x64

#define BREAK_CODE 						BIT(7)
#define KEY_SPACE 						0x0039
#define SET_RESET_CMD 					0xED

// KBC Commands
#define KBC_READ_COMMAND_BYTE		    0x20
#define KBC_WRITE_COMMAND_BYTE	        0x60
#define KBC_CHECK_KBC				    0xAA
#define KBC_CHECK_KEYBOARD_ITF	        0xAB
#define KBC_DIS_KBD_ITF		           	0xAD
#define KBC_EN_KBD_ITF		            0xAE
#define KBC_WRITE_BYTE_TO_MOUSE			0xD4

#define TWO_BYTE_SCAN 					0xE0

// C@KBD responses
#define KBD_ACK		        	        0xFA
#define KBD_RESEND		                0xFE
#define KBD_ERROR		                0xFC

#define DELAY_US    20000

// VBE

#define VIDEOCARD 			0x10
#define PCCONFIG 			0x11
#define MEMCONFIG 			0x12
#define KEYBOARD 			0x16

#define VBE_AX				0x4F02
#define VBE_FUNCT 			0x4F
#define VBE_INFO 			0x00
#define VBE_MODE_INFO 		0x01
#define SET_VBE_MODE 		0x02

#define LINEAR_FRAME_BUF 			BIT(14)

#define RESOLUTION 					0x117


#endif
