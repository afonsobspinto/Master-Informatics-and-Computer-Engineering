
/**
 *  @author Joao Cardoso (jcard@fe.up.pt) ????
 *  Added by pfs@fe.up.pt
 */

#ifndef _ASPRITE_H_
#define _ASPRITE_H_

#include <stdarg.h>
#include "sprite.h"

/** @defgroup animsprite AnimSprite
 * @{
 *
 * Animated Sprite related functions
 */

/** An Animated Sprite is a "sub-classing" of Sprites
 *  where each Sprite is manipulated using Sprite functions
 */
typedef struct {
	Sprite *sp;		///< pointer to first Sprite, the one with overall properties
	int aspeed;		///< animation speed 
	int cur_aspeed; ///< current animation speed 
	int num_fig; 	///< number of pixmaps 
	int cur_fig; 	///< current pixmap 
	char **map;     ///< pointer to array of each AnimSprite pixmaps
} AnimSprite;

/** Create an Animated Sprite from multiple pixmaps
*   At least one pixmap must be specified.
*/
AnimSprite * create_asprite(char *base, char *pic1[], ...);

/** Animate an Animated Sprite
*/
int animate_asprite(AnimSprite *fig, char *base);

/** Destroy an Animated Sprite from video memoty and
* release all resources allocated.
*/
void destroy_asprite(AnimSprite *fig, char *base);

/** @} end of sprite */

#endif
