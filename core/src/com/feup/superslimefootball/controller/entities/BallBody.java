package com.feup.superslimefootball.controller.entities;

import com.badlogic.gdx.physics.box2d.World;
import com.feup.superslimefootball.model.entities.EntityModel;

public class BallBody extends EntityBody {

    /**
     * Constructs a body representing a model in a certain world.
     *
     * @param world The world this body lives on.
     * @param model The model representing the body.
     */
    public BallBody(World world, EntityModel model) {
        super(world, model, true, 0.0f);

        float density = 0.9f;
        float restitution = 0.7f;
        float radius = 13f;

        createCircleFixture(body, radius, density, restitution, false);
    }

}
