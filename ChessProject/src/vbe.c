#include <minix/syslib.h>
#include <minix/drivers.h>
#include <machine/int86.h>

#include "vbe.h"
#include "lmlib.h"
#include "macros.h"

#define LINEAR_MODEL_BIT 14

#define PB2BASE(x) (((x) >> 4) & 0x0F000)
#define PB2OFF(x) ((x) & 0x0FFFF)

int vbe_get_mode_info(unsigned short mode, vbe_mode_info_t *vmi_ptr) {

	struct reg86u registos;
	mmap_t buf;

	if(lm_init() == 0){
		lm_alloc(sizeof(vbe_mode_info_t), &buf);

		registos.u.b.intno = VIDEOCARD;
		registos.u.b.ah = VBE_FUNCT;
		registos.u.b.al = VBE_MODE_INFO;
		registos.u.w.es = PB2BASE(buf.phys);
		registos.u.w.di = PB2OFF(buf.phys);
		registos.u.w.cx = mode;

		if( sys_int86(&registos) != OK )
		{
			return 1;
		}

//		vbe_mode_info_t *temp;
//
//		temp = buf.virtual;
//		*vmi_ptr = *temp;

		memcpy(vmi_ptr,buf.virtual,sizeof(vbe_mode_info_t));

		lm_free(&buf);

		return 0;
	}
	else
		return 1;
	}


int16_t *vbe_get_controler_info(vbe_info_t *vbe_ptr)
{
	struct reg86u registos;
	mmap_t buf;

	registos.u.b.intno = VIDEOCARD;
	registos.u.b.ah = VBE_FUNCT;
	registos.u.b.al = VBE_INFO;

	if(lm_init() != 0)
		return 0;

	lm_alloc(sizeof(vbe_info_t), &buf);

	registos.u.w.es = PB2BASE(buf.phys);
	registos.u.w.di = PB2OFF(buf.phys);

	if( sys_int86(&registos) == OK )
	{
		*vbe_ptr = *((vbe_info_t *)buf.virtual);

		void *modes_ptr = (void *)(((vbe_ptr->videoModePtr & 0xFFFF0000) >> 12) +
				(vbe_ptr->videoModePtr & 0x0FFFF) +
				((uint32_t)buf.virtual & 0xF0000000));

		int16_t *modes = modes_ptr;

		lm_free(&buf);

		return modes;

	}
	else{
		return 0;
	}
}
