package com.feup.superslimefootball.controller.entities;

/**
 * Created by afonso on 4/28/17.
 */

import com.badlogic.gdx.physics.box2d.World;
import com.feup.superslimefootball.model.entities.SlimeModel;

/**
 * A concrete representation of an EntityBody
 * representing the slime ship.
 */

public class SlimeBody extends EntityBody {

    /**
     * Constructs a space ship body according to
     * a space ship model.
     *
     * @param world the physical world this space ship belongs to.
     * @param model the model representing this space ship.
     */
    public SlimeBody(World world, SlimeModel model) {
        super(world, model);

        float density = 0.5f, friction = 0.4f, restitution = 0.5f;
        int width = 75, height = 75;

        // Body
        createFixture(body, new float[]{
                32,12, 31,46, 34,51, 40,51, 43,46, 41,12
        }, width, height, density, friction, restitution, SLIME_BODY, (short) (BALL_BODY | SLIME_BODY | GOAL_BODY));
    }

}
