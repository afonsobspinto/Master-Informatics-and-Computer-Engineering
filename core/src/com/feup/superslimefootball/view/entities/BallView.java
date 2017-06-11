package com.feup.superslimefootball.view.entities;

import com.badlogic.gdx.graphics.Texture;
import com.badlogic.gdx.graphics.g2d.Sprite;
import com.feup.superslimefootball.SuperSlimeFootball;


public class BallView extends EntityView {


    /**
     * Constructs  view.
     *
     * @param game the game this view belongs to. Needed to access the
     *             asset manager to get textures.
     */
    BallView(SuperSlimeFootball game) {
        super(game);
    }

    @Override
    public Sprite createSprite(SuperSlimeFootball game) {
        Texture texture = game.getAssetManager().get("ball.png");

        return new Sprite(texture, texture.getWidth(), texture.getHeight());
    }
}
