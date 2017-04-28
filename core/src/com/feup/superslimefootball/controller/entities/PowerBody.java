package com.feup.superslimefootball.controller.entities;

import com.badlogic.gdx.physics.box2d.World;
import com.feup.superslimefootball.model.entities.PowerModel;

/**
 * A concrete representation of an PowerBody representing a goal.
 */
public class PowerBody extends EntityBody {
    /**
     * Constructs a power body according to
     * a power model.
     *
     * @param world the physical world this power belongs to.
     * @param model the model representing this power.
     */
    public PowerBody(World world, PowerModel model) {
        super(world, model);

        float density = 1f, friction = 0.4f, restitution = 0.5f;
        int width = 12, height = 12;

        createFixture(body, new float[]{
                5,5, 5,10, 10,10, 10,5,
        }, width, height, density, friction, restitution, GOAL_BODY, (short) (BALL_BODY | SLIME_BODY));
    }
}
