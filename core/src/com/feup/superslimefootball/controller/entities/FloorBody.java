package com.feup.superslimefootball.controller.entities;

/**
 * Created by afonso on 4/28/17.
 */

import com.badlogic.gdx.Gdx;
import com.badlogic.gdx.physics.box2d.World;
import com.feup.superslimefootball.model.entities.FloorModel;

/**
 * A concrete representation of an EntityBody
 * representing the slime ship.
 */

public class FloorBody extends EntityBody {

    /**
     * Constructs a slime body according to
     * a slime model.
     *
     * @param world the physical world this slime belongs to.
     * @param model the model representing this slime ship.
     */
    public FloorBody(World world, FloorModel model) {
        super(world, model, false);

        float density = 0.5f, friction = 0.4f, restitution = 0.5f;
        int width = Gdx.graphics.getWidth(), height = 0;

        // Body

        //TODO: Change this values
        createFixture(body, new float[]{
                32,12, 31,46, 34,51, 40,51, 43,46, 41,12
        }, width, height, density, friction, restitution, SLIME_BODY, (short) (BALL_BODY | SLIME_BODY | GOAL_BODY));
    }

}
