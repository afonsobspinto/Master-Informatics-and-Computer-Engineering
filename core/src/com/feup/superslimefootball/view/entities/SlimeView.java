package com.feup.superslimefootball.view.entities;

import com.badlogic.gdx.graphics.Texture;
import com.badlogic.gdx.graphics.g2d.Sprite;
import com.feup.superslimefootball.SuperSlimeFootball;

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
     */
    SlimeView(SuperSlimeFootball game) {
        super(game);
    }

    @Override
    public Sprite createSprite(SuperSlimeFootball game) {

        Texture texture = game.getAssetManager().get("blueSlime.png");

        return new Sprite(texture, texture.getWidth(), texture.getHeight());
    }
}
