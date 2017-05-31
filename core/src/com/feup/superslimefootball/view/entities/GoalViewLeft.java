package com.feup.superslimefootball.view.entities;

import com.badlogic.gdx.graphics.Texture;
import com.badlogic.gdx.graphics.g2d.Sprite;
import com.feup.superslimefootball.SuperSlimeFootball;

/**
 * Created by afonso on 5/29/17.
 */

public class GoalViewLeft extends EntityView {


    /**
     * Creates a view belonging to a game.
     *
     * @param game the game this view belongs to. Needed to access the
     *             asset manager to get textures.
     */
    GoalViewLeft(SuperSlimeFootball game) {
        super(game);
    }

    @Override
    public Sprite createSprite(SuperSlimeFootball game) {

        Texture texture = game.getAssetManager().get("goal.png");

        return new Sprite(texture, texture.getWidth(), texture.getHeight());

    }
}
