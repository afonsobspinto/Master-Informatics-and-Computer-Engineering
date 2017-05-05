package com.feup.superslimefootball.controller.entities;

import com.badlogic.gdx.physics.box2d.World;
import com.feup.superslimefootball.model.entities.BallModel;

/**
 * A concrete representation of an EntityBody representing a ball.
 */
public class BallBody extends EntityBody {
    /**
     * Constructs a ball body according to
     * a ball model.
     *
     * @param world the physical world this ball belongs to.
     * @param model the model representing this ball.
     */
    public BallBody(World world, BallModel model) {
        super(world, model, true);

        float density = 1f, friction = 0.4f, restitution = 0.5f;
        int width = 25, height = 25;

        createFixture(body, new float[]{
                5,5, 5,10, 10,10, 10,5,
        }, width, height, density, friction, restitution, GOAL_BODY, (short) (BALL_BODY | SLIME_BODY));
    }
}
