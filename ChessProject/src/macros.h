#ifndef _MACROS_KBD
#define _MACROS_KBD



#define BREAK_CODE 						BIT(7)

#define SET_RESET_CMD 					0xED

// KBC registers
#define KBC_STAT_REG					0x64
#define KBC_CTRL_REG					0x64
#define KBC_IN_BUF						0x60
#define KBC_OUT_BUF						0x60


// KBC Commands
#define KBC_IRQ				         	1
#define KBC_READ_COMMAND_BYTE		    0x20
#define KBC_WRITE_COMMAND_BYTE	        0x60
#define KBC_CHECK_KBC				    0xAA
#define KBC_CHECK_KEYBOARD_ITF	        0xAB
#define KBC_DIS_KBD_ITF		           	0xAD
#define KBC_EN_KBD_ITF		            0xAE
#define KBC_WRITE_BYTE_TO_MOUSE			0xD4
#define KBC_IRQ				         	1
#define KBC_OUT_BUF					 	0x60
#define KBC_IN_BUF 						0x60
#define KBC_CMD_REG 					0x64

// KBC Status Register
#define KBC_PARITY_BIT	                7
#define KBC_TIMEOUT_BIT		            6
#define KBC_AUX_BIT				        5
#define KBC_INH_BIT						4
#define KBC_A2_BIT						3
#define KBC_SYS_BIT					    2
#define KBC_IBF_BIT					    1
#define KBC_OBF_BIT						0

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

#define MODE 					0x114


#endif
