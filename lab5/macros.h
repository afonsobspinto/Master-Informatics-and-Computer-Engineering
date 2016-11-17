#define VBE_SET_VBE_MODE							0x2
#define VBE_SET_LINEAR_FRAME_BUFFER					14
#ifndef _MACROS_H
#define _MACROS_H

// Video Graphics Commands
#define VBE_INTERRUPT_VIDEO_CARD					0x10
#define VBE_FUNCTION								0x4F

#define FUNCTION_CALL_FAILED                        0X01
#define FUNCTION_NOT_SUPPORTED_HW                   0X02
#define FUNCTION_INVALID_VIDEO_MODE                 0X03

#define VBE_SET_LINEAR_FRAME_BUFFER					14

#define VBE_MODE_GRAPHICS_640_480_256							0x101
#define VBE_MODE_GRAPHICS_800_600_256							0x103
#define VBE_MODE_GRAPHICS_1024_786_256							0x105
#define VBE_MODE_GRAPHICS_1280_1024_256							0x107

#define VBE_VIDEO_MODE_FUNCTION						0x00


#define BIT(n)										(0x01<<(n))
#endif
