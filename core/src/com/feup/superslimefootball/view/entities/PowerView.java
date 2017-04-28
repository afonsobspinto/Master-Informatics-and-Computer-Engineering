package com.feup.superslimefootball.view.entities;

import com.badlogic.gdx.graphics.g2d.Sprite;
import com.feup.superslimefootball.SuperSlimeFootball;

/**
 * A view representing a power
 */

public abstract class PowerView extends EntityView {

    /**
     * Constructs a power.
     *
     * @param game the game this view belongs to. Needed to access the
     *             asset manager to get textures.
     */

    public PowerView(SuperSlimeFootball game) {
        super(game);
    }

    /**
     * Creates a sprite representing this power.
     *
     * @param game the game this view belongs to. Needed to access the
     *             asset manager to get textures.
     * @return the sprite representing this bullet
     */
    public abstract Sprite createSprite(SuperSlimeFootball game);
}

