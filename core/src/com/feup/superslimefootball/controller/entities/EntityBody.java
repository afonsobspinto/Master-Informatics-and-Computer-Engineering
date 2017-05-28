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
     * @param isDynamic is the body dynamic
     */
    EntityBody(World world, EntityModel model, boolean isDynamic) {

        BodyDef bodyDef = new BodyDef();
        bodyDef.type = isDynamic? BodyDef.BodyType.DynamicBody : BodyDef.BodyType.StaticBody;

        bodyDef.position.set(model.getX()/PPM, model.getY()/PPM);
        bodyDef.fixedRotation = true;

        this.body = world.createBody(bodyDef);
        this.body.setUserData(model);

    }


    /**
     * Helper method to create a polygon fixture represented by a set of vertexes.
     * @param body The body the fixture is to be attached to.
     * @param vertexes The vertexes defining the fixture in pixels so it is
     *                 easier to get them from a bitmap image.
     * @param density The density of the fixture. How heavy it is in relation to its area.
     * */

    final void createFixture(Body body, Vector2[] vertexes, float density, float friction, float restitution) {


        PolygonShape polygon = new PolygonShape();
        polygon.set(vertexes);

        FixtureDef fixtureDef = new FixtureDef();
        fixtureDef.shape = polygon;

        fixtureDef.density = density;
        fixtureDef.friction = friction;
        fixtureDef.restitution = restitution;

        body.createFixture(fixtureDef);

        polygon.dispose();
    }


    /**
     * Helper method to create a polygon fixture represented by a set of vertexes.
     * @param body The body the fixture is to be attached to.
     * @param radius The radius of the bitmap the vertexes where extracted from.
     * @param density The density of the fixture. How heavy it is in relation to its area.
     * @param restitution The restitution of the fixture. How much it bounces.

     */
    final void createCircleFixture(Body body, float radius, float density, float restitution) {

        CircleShape circle = new CircleShape();
        circle.setRadius(radius / PPM);

        FixtureDef fixtureDef = new FixtureDef();
        fixtureDef.shape = circle;
        fixtureDef.density = density;
        fixtureDef.restitution = restitution;

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
    final void createWallsFixture(Body body, Vector2[] vertexes, float density) {

        ChainShape shape = new ChainShape();
        shape.createChain(vertexes);
        body.createFixture(shape, density);
        shape.dispose();


    }

    /**
     * Wraps the applyForceToCenter method from the Box2D body class.
     *
     * @param forceX the x-component of the force to be applied
     * @param forceY the y-component of the force to be applied
     * @param awake should the body be awaken
     */
    public void applyForceToCenter(float forceX, float forceY, boolean awake) {
        body.applyForceToCenter(forceX, forceY, awake);
    }


    /**
     * Wraps the applyForceToCenter method from the Box2D body class.
     *
     * @param impulseX the x-component of the impulse to be applied
     * @param impulseY the y-component of the impulse to be applied
     * @param awake should the body be awaken
     */
    public void applyLinearImpulse(float impulseX, float impulseY, boolean awake) {
        body.applyLinearImpulse(impulseX, impulseY, body.getWorldCenter().x, body.getWorldCenter().y, awake);
    }

    /**
     * Wraps the getLinearVelocity method from the Box2D body class.
     *
     * @return the user Linear Velocity
     */

    public Vector2 getLinearVelocity(){
        return body.getLinearVelocity();
    }

    /**
     * Wraps the getUserData method from the Box2D body class.
     *
     * @return the user data
     */
    public Object getUserData() {
        return body.getUserData();

    }

}

