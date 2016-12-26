#ifndef _MOUSE_CMDS_H
#define _MOUSE_CMDS_H

// Mouse Commands
#define MOUSE_RESET						0xFF
#define MOUSE_RESEND					0xFE
#define MOUSE_SET_DEFAULTS				0xF6
#define MOUSE_DISABLE_DATA_PACKETS		0xF5
#define MOUSE_ENABLE_DATA_PACKETS		0xF4
#define MOUSE_SET_SAMPLE_RATE			0xF3
#define MOUSE_SET_REMOTE_MODE			0xF0
#define MOUSE_READ_DATA					0xEB
#define MOUSE_SET_STREAM_MODE			0xEA
#define MOUSE_STATUS_REQUEST			0xE9
#define MOUSE_SET_RESOLUTION			0xE8
#define MOUSE_SET_SCALING_2_1			0xE7
#define MOUSE_SET_SCALING_1_1			0xE6
#define STAT_REG						0x64

// Mouse responses
#define MOUSE_ACK						0xFA
#define MOUSE_NACK						0xFE
#define MOUSE_ERROR						0xFC

// Data Packet
#define MOUSE_Y_OVFL   			        7
#define MOUSE_X_OVFL			        6
#define MOUSE_Y_SIGN  		            5
#define MOUSE_X_SIGN  		            4
#define MOUSE_1_BIT	                    3
#define MOUSE_M_B                    	2
#define MOUSE_R_B                    	1
#define MOUSE_L_B                    	0

// Status Packet
#define MOUSE_STATUS_REMOTE_BIT			6
#define MOUSE_STATUS_ENABLED_BIT		5
#define MOUSE_STATUS_SCALING_BIT		4
#define MOUSE_STATUS_LEFT		        2
#define MOUSE_STATUS_MIDDLE		        1
#define MOUSE_STATUS_RIGHT		        0

// Sample rates
#define MOUSE_SAMPLE_RATE_1				10
#define MOUSE_SAMPLE_RATE_2				20
#define MOUSE_SAMPLE_RATE_3				40
#define MOUSE_SAMPLE_RATE_4				60
#define MOUSE_SAMPLE_RATE_5				80
#define MOUSE_SAMPLE_RATE_6				100
#define MOUSE_SAMPLE_RATE_7				200


#define MOUSE_IRQ						12		// Mouse IRQ Line

#endif
