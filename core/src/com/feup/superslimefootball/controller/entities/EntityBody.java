package com.feup.superslimefootball.controller.entities;

/**
 * Created by afonso on 5/26/17.
 */

import com.badlogic.gdx.math.Vector2;
import com.badlogic.gdx.physics.box2d.Body;
import com.badlogic.gdx.physics.box2d.BodyDef;
import com.badlogic.gdx.physics.box2d.ChainShape;
import com.badlogic.gdx.physics.box2d.CircleShape;
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
     * @param dynamic is the body dynamic
     */
    EntityBody(World world, EntityModel model, boolean dynamic) {

        BodyDef bodyDef = new BodyDef();
        if(dynamic)
            bodyDef.type = BodyDef.BodyType.DynamicBody;
        else
            bodyDef.type = BodyDef.BodyType.StaticBody;

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
    final void createFixture(Body body, float width, float height, float density) {

        PolygonShape polygon = new PolygonShape();
        polygon.setAsBox(width/2/PPM, height/2/PPM);

        FixtureDef fixtureDef = new FixtureDef();
        fixtureDef.shape = polygon;
        fixtureDef.density = density;

        body.createFixture(fixtureDef);

        polygon.dispose();
    }


    /**
     * Helper method to create a polygon fixture represented by a set of vertexes.
     * @param body The body the fixture is to be attached to.
     * @param radius The radius of the bitmap the vertexes where extracted from.
     * @param density The density of the fixture. How heavy it is in relation to its area.

     */
    final void createFixture(Body body, float radius, float density) {

        CircleShape circle = new CircleShape();
        circle.setRadius(radius / PPM);

        FixtureDef fixtureDef = new FixtureDef();
        fixtureDef.shape = circle;
        fixtureDef.density = density;

        body.createFixture(fixtureDef);

        circle.dispose();
    }


    /**
     * Helper method to create a polygon fixture represented by a set of vertexes.
     * @param body The body the fixture is to be attached to.
     * @param vertexes The vertexes defining the fixture in pixels so it is
     *                 easier to get them from a bitmap image.
     * @param density The density of the fixture. How heavy it is in relation to its area.

     */
    final void createFixture(Body body, Vector2[] vertexes, float density) {

        ChainShape walls = new ChainShape();
        walls.createChain(vertexes);
        body.createFixture(walls, density);
        walls.dispose();


    }

}

