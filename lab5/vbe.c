#include <minix/syslib.h>
#include <minix/drivers.h>
#include <machine/int86.h>

#include "macros.h"
#include "vbe.h"
#include "lmlib.h"

#define LINEAR_MODEL_BIT 14

#define PB2BASE(x) (((x) >> 4) & 0x0F000)
#define PB2OFF(x) ((x) & 0x0FFFF)

int vbe_get_mode_info(unsigned short mode, vbe_mode_info_t *vmi_p) {

	mmap_t map;

	if (lm_alloc(sizeof(vbe_mode_info_t), &map) == NULL)
		return 1;

	struct reg86u reg86;

	reg86.u.b.intno = VBE_INTERRUPT_VIDEO_CARD;
	reg86.u.b.ah = VBE_FUNCTION;
	reg86.u.b.al = VBE_VIDEO_MODE_FUNCTION	;
	reg86.u.w.cx = mode;
	reg86.u.w.es = PB2BASE(map.phys);
	reg86.u.w.di = PB2OFF(map.phys);

	if (sys_int86(&reg86) == OK)
	{
		if (reg86.u.w.ax == VBE_FUNCTION | VBE_VIDEO_MODE_FUNCTION)
		{
			*vmi_p = *((vbe_mode_info_t *)map.virtual);
			lm_free(&map);
			return 0;
		}
	}

	lm_free(&map);

	return 1;
}
