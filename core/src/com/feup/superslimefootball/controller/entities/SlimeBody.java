package com.feup.superslimefootball.controller.entities;

import com.badlogic.gdx.physics.box2d.World;
import com.feup.superslimefootball.model.entities.SlimeModel;

/**
 * Created by afonso on 5/26/17.
 */

public class SlimeBody extends EntityBody {
    /**
     * Constructs a body representing a model in a certain world.
     *
     * @param world The world this body lives on.
     * @param model The model representing the body.
     */
    public SlimeBody(World world, SlimeModel model) {
        super(world, model);

        float density = 1.0f;

        createFixture(body, 40, 40, density);
    }
}
