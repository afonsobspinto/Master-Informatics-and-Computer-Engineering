package com.feup.superslimefootball.view.entities;

import com.badlogic.gdx.graphics.Texture;
import com.badlogic.gdx.graphics.g2d.Sprite;
import com.feup.superslimefootball.SuperSlimeFootball;

/**
 * A view representing a ball
 */

public abstract class BallView extends EntityView{
    /**
     * Constructs a ball view.
     *
     * @param game the game this view belongs to. Needed to access the
     *             asset manager to get textures.
     */
    public BallView(SuperSlimeFootball game) {
        super(game);
    }

    /**
     * Creates a sprite representing this ball.
     *
     * @param game the game this view belongs to. Needed to access the
     *             asset manager to get textures.
     * @return the sprite representing this bullet
     */
    public Sprite createSprite(SuperSlimeFootball game) {
        Texture texture = game.getAssetManager().get("ball.png");

        return new Sprite(texture, texture.getWidth(), texture.getHeight());

    }
}
