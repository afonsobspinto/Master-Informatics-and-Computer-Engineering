package com.feup.superslimefootball.view.entities;

import com.badlogic.gdx.graphics.Texture;
import com.badlogic.gdx.graphics.g2d.Sprite;
import com.feup.superslimefootball.SuperSlimeFootball;
import com.feup.superslimefootball.view.utilities.Color;

/**
 * Created by afonso on 5/26/17.
 */

/**
 * A view representing a slime
 */

public class SlimeView extends EntityView {


    /**
     * Constructs a slime view.
     *
     * @param game the game this view belongs to. Needed to access the
     *             asset manager to get textures.
     * @param flip the sprite needs to be flipped?
     * @param color the slime color
     */
    SlimeView(SuperSlimeFootball game, boolean flip, Color color) {
        super(game, color);

        if (flip)
            sprite.flip(true,false);
    }

    @Override
    public Sprite createSprite(SuperSlimeFootball game) {

        Texture texture = (this.color == Color.BLUE) ? (Texture) game.getAssetManager().get("blueSlime.png") : (Texture) game.getAssetManager().get("redSlime.png");

        return new Sprite(texture, texture.getWidth(), texture.getHeight());

    }
}
