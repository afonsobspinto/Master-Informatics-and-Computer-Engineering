package com.feup.superslimefootball.controller.entities;

/**
 * Created by afonso on 5/26/17.
 */

import com.badlogic.gdx.physics.box2d.Body;
import com.badlogic.gdx.physics.box2d.BodyDef;
import com.badlogic.gdx.physics.box2d.FixtureDef;
import com.badlogic.gdx.physics.box2d.PolygonShape;
import com.badlogic.gdx.physics.box2d.World;
import com.feup.superslimefootball.model.entities.EntityModel;

import static com.feup.superslimefootball.view.GameView.PPM;

/**
 * Wrapper class that represents an abstract physical
 * body supported by a Box2D body.
 */

public abstract class EntityBody {

    /**
     * The Box2D body that supports this body.
     */

    protected final Body body;

    /**
     * Constructs a body representing a model in a certain world.
     *
     * @param world The world this body lives on.
     * @param model The model representing the body.
     */
    EntityBody(World world, EntityModel model) {

        BodyDef bodyDef = new BodyDef();
        bodyDef.type = BodyDef.BodyType.DynamicBody;

        System.out.println("EntityBody");
        System.out.println(model.getX()/PPM + " - " + model.getY()/PPM);

        bodyDef.position.set(model.getX()/PPM, model.getY()/PPM);
        bodyDef.angle = model.getRotation();

        this.body = world.createBody(bodyDef);
        this.body.setUserData(model);

    }

    /**
     * Helper method to create a polygon fixture represented by a set of vertexes.
     * @param body The body the fixture is to be attached to.
     * @param width The width of the bitmap the vertexes where extracted from.
     * @param height The height of the bitmap the vertexes where extracted from.
     * @param density The density of the fixture. How heavy it is in relation to its area.

     */
    final void createFixture(Body body, int width, int height, float density) {

        PolygonShape polygon = new PolygonShape();
        polygon.setAsBox(width/2/PPM, height/2/PPM);

        FixtureDef fixtureDef = new FixtureDef();
        fixtureDef.shape = polygon;
        fixtureDef.density = density;

        body.createFixture(fixtureDef);

        polygon.dispose();
    }


}

