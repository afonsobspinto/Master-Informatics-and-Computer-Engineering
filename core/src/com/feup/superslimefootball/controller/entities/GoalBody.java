package com.feup.superslimefootball.controller.entities;

import com.badlogic.gdx.physics.box2d.World;
import com.feup.superslimefootball.model.entities.GoalModel;

/**
 * A concrete representation of an EntityBody representing a goal.
 */
public class GoalBody extends EntityBody {
    /**
     * Constructs a goal body according to
     * a goal model.
     *
     * @param world the physical world this goal belongs to.
     * @param model the model representing this goal.
     */
    public GoalBody(World world, GoalModel model) {
        super(world, model);

        float density = 1f, friction = 0.4f, restitution = 0.5f;
        int width = 12, height = 12;

        createFixture(body, new float[]{
                5,5, 5,10, 10,10, 10,5,
        }, width, height, density, friction, restitution, GOAL_BODY, (short) (BALL_BODY | SLIME_BODY));
    }
}
