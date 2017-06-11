package com.feup.superslimefootball.controller.entities;

import com.badlogic.gdx.math.Vector2;
import com.badlogic.gdx.physics.box2d.World;
import com.feup.superslimefootball.model.entities.EntityModel;

/**
 * Created by afonso on 5/29/17.
 */

public class GoalBody extends EntityBody {
    /**
     * Constructs a body representing a model in a certain world.
     *
     * @param world     The world this body lives on.
     * @param model     The model representing the body.
     * @param flip     The goal fixture needs to be flipped?
     */
    public GoalBody(World world, EntityModel model, boolean flip) {
        super(world, model, false, 1.0f);


        float density = 1.0f;
        float restitution = 0.0f;
        float friction = 1.0f;

        if(flip)
            createRightFixture(density, friction, restitution);
        else
            createLeftFixture(density, friction, restitution);

    }

    /**
     * Creates the Fixture on the Left Side
     *
     * @param density         The density of the fixture
     * @param friction        The friction of the fixture
     * @param restitution     The restitution of the fixture
     */
    void createLeftFixture(float density, float friction, float restitution){
        Vector2[] vertexes = new Vector2[4];

        // Goal Line Technology
        vertexes[0] = new Vector2(-0.9f, -2.0f);
        vertexes[1] = new Vector2(-0.8f, -2.0f);
        vertexes[2] = new Vector2(-0.7f, 1.0f);
        vertexes[3] = new Vector2(-0.8f, 1.0f);
        createFixture(body,vertexes, density, friction, restitution, true);

        // TOP
        vertexes[0] = new Vector2(-0.9f, 1.1f);
        vertexes[1] = new Vector2(0.0f, 1.1f);
        vertexes[2] = new Vector2(0.8f, 2.2f);
        vertexes[3] = new Vector2(1.5f, 2.2f);

        createFixture(body,vertexes, density, friction, restitution, false);

        // Net
        vertexes[0] = new Vector2(-0.9f, 1.1f);
        vertexes[1] = new Vector2(-2.0f, 1.1f);
        vertexes[2] = new Vector2(-2.1f, 1.2f);
        vertexes[3] = new Vector2(-0.8f, 1.2f);

        createFixture(body,vertexes, density, friction, restitution, false);
    }

    /**
     * Creates the Fixture on the Right Side
     *
     * @param density         The density of the fixture
     * @param friction        The friction of the fixture
     * @param restitution     The restitution of the fixture
     */
    void createRightFixture(float density, float friction, float restitution){
        Vector2[] vertexes = new Vector2[4];

        // Goal Line Technology
        vertexes[0] = new Vector2(0.9f, -2.0f);
        vertexes[1] = new Vector2(0.8f, -2.0f);
        vertexes[2] = new Vector2(0.7f, 1.0f);
        vertexes[3] = new Vector2(0.8f, 1.0f);
        createFixture(body,vertexes, density, friction, restitution, true);

        // TOP
        vertexes[0] = new Vector2(0.9f, 1.1f);
        vertexes[1] = new Vector2(0.0f, 1.1f);
        vertexes[2] = new Vector2(-0.8f, 2.2f);
        vertexes[3] = new Vector2(-1.5f, 2.2f);

        createFixture(body,vertexes, density, friction, restitution, false);

        // Net
        vertexes[0] = new Vector2(0.9f, 1.1f);
        vertexes[1] = new Vector2(2.0f, 1.1f);
        vertexes[2] = new Vector2(2.1f, 1.2f);
        vertexes[3] = new Vector2(0.8f, 1.2f);

        createFixture(body,vertexes, density, friction, restitution, false);
    }

}
