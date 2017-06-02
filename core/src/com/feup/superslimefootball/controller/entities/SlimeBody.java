package com.feup.superslimefootball.controller.entities;

import com.badlogic.gdx.math.Vector2;
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
        super(world, model, true, 1.0f);

        float density = 1.0f;
        float restitution = 0.01f;
        float friction = 0.1f;

        Vector2[] vertexes = new Vector2[8];

        vertexes[0] = new Vector2(-1.35f, -0.7f);
        vertexes[1] = new Vector2(0.1f, -0.7f);
        vertexes[2] = new Vector2(0.1f, 0.7f);
        vertexes[3] = new Vector2(-0.6f, 0.5f);
        vertexes[4] = new Vector2(-1.0f, 0.25f);
        vertexes[5] = new Vector2(-1.1f, 0.0f);
        vertexes[6] = new Vector2(-1.3f, -0.2f);
        vertexes[7] = new Vector2(-1.2f, -0.7f);

        createFixture(body,vertexes, density, friction, restitution, false);

        vertexes[0] = new Vector2(1.35f, -0.7f);
        vertexes[1] = new Vector2(-0.1f, -0.7f);
        vertexes[2] = new Vector2(-0.1f, 0.7f);
        vertexes[3] = new Vector2(0.6f, 0.5f);
        vertexes[4] = new Vector2(1.0f, 0.25f);
        vertexes[5] = new Vector2(1.1f, 0.0f);
        vertexes[6] = new Vector2(1.3f, -0.2f);
        vertexes[7] = new Vector2(1.2f, -0.7f);

        createFixture(body,vertexes, density, friction, restitution, false);
    }
}
