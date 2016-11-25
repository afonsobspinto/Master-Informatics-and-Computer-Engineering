#include "pixmap.h"
#include <stdlib.h>
#include "video_gr.h"

char **pixmap_get(unsigned short id)
{
	switch(id)
	{
	case 0:
		return pic1;
	case 1:
		return pic2;
	case 2:
		return cross;
	case 3:
		return pic3;
	case 4:
		return penguin;
	default:
		return NULL;
	}
}

