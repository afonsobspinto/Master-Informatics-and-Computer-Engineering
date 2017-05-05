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

        int radius = 25;

        createFixture(body, BALL_BODY, 25);
    }
}
