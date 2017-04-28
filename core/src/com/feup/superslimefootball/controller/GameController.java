package com.feup.superslimefootball.controller;

import com.badlogic.gdx.physics.box2d.Body;
import com.badlogic.gdx.physics.box2d.Contact;
import com.badlogic.gdx.physics.box2d.ContactImpulse;
import com.badlogic.gdx.physics.box2d.ContactListener;
import com.badlogic.gdx.physics.box2d.Manifold;
import com.feup.superslimefootball.controller.entities.BallBody;
import com.feup.superslimefootball.controller.entities.SlimeBody;
import com.feup.superslimefootball.model.GameModel;
import com.feup.superslimefootball.model.entities.BallModel;
import com.feup.superslimefootball.model.entities.GoalModel;
import com.feup.superslimefootball.model.entities.SlimeModel;

/**
 * Created by afonso on 4/28/17.
 */

//TODO: GameController

public class GameController implements ContactListener {
    /**
     * The singleton instance of this controller
     */
    private static GameController instance;

    /**
     * The arena width in meters.
     */
    public static final int PITCH_WIDTH = 100;

    /**
     * The arena height in meters.
     */
    public static final int PITCH_HEIGHT = 50;

    /**
     * The acceleration impulse in newtons.
     */
    private static final float ACCELERATION_FORCE = 1000f;

    /**
     * The slime body.
     */
    private final SlimeBody slimeBody;

    /**
     * The opponent slime body.
     */
    private final SlimeBody opponentSlimeBody;

    /**
     * Accumulator used to calculate the simulation step.
     */
    private float accumulator;

    public GameController() {
        this.slimeBody = new SlimeBody();
        this.opponentSlimeBody = new SlimeBody();
    }

    /**
     * Returns a singleton instance of a game controller
     *
     * @return the singleton instance
     */
    public static GameController getInstance() {
        if (instance == null)
            instance = new GameController();
        return instance;
    }



    /**
     * Calculates the next physics step of duration delta (in seconds).
     *
     * @param delta The size of this physics step in seconds.
     */
    public void update(float delta) {
        GameModel.getInstance().update(delta);


        float frameTime = Math.min(delta, 0.25f);
//        accumulator += frameTime;
//        while (accumulator >= 1/60f) {
//            world.step(1/60f, 6, 2);
//            accumulator -= 1/60f;
//        }

    }

    /**
     * Verifies if the body is inside the arena bounds and if not
     * wraps it around to the other side.
     *
     * @param body The body to be verified.
     */
    private void verifyBounds(Body body) {
        if (body.getPosition().x < 0)
            body.setTransform(PITCH_WIDTH, body.getPosition().y, body.getAngle());

        if (body.getPosition().y < 0)
            body.setTransform(body.getPosition().x, PITCH_HEIGHT, body.getAngle());

        if (body.getPosition().x > PITCH_WIDTH)
            body.setTransform(0, body.getPosition().y, body.getAngle());

        if (body.getPosition().y > PITCH_HEIGHT)
            body.setTransform(body.getPosition().x, 0, body.getAngle());
    }


    /**
     * Acceleratesins the spaceship. The acceleration takes into consideration the
     * constant acceleration force and the delta for this simulation step.
     *
     * @param delta Duration of the rotation in seconds.
     */
    public void accelerate(float delta) {
        //TODO: Choose Slime to accelerate

//        slimeBody.applyForceToCenter(-(float) sin(ACCELERATION_FORCE * delta, (float) cos(ACCELERATION_FORCE * delta, true));
//        ((SlimeModel)SlimeBody.getUserData()).setAccelerating(true);
    }

    /**
     * A contact between two objects was detected
     *
     * @param contact the detected contact
     */
    @Override
    public void beginContact(Contact contact) {
        Body bodyA = contact.getFixtureA().getBody();
        Body bodyB = contact.getFixtureB().getBody();

        if (bodyA.getUserData() instanceof SlimeModel)
            SlimeCollision(bodyA);
        if (bodyB.getUserData() instanceof SlimeModel)
            SlimeCollision(bodyB);

        if (bodyA.getUserData() instanceof SlimeModel && bodyB.getUserData() instanceof BallModel)
            SlimeBallCollision(bodyA, bodyB);
        if (bodyA.getUserData() instanceof BallModel && bodyB.getUserData() instanceof SlimeModel)
            SlimeBallCollision(bodyA, bodyB);

        if (bodyA.getUserData() instanceof SlimeModel && bodyB.getUserData() instanceof GoalModel)
            SlimeGoalCollision(bodyA, bodyB);
        if (bodyA.getUserData() instanceof GoalModel && bodyB.getUserData() instanceof SlimeModel)
            SlimeGoalCollision(bodyA, bodyB);
    }

    @Override
    public void endContact(Contact contact) {

    }


    @Override
    public void preSolve(Contact contact, Manifold oldManifold) {

    }

    @Override
    public void postSolve(Contact contact, ContactImpulse impulse) {

    }

    /**
     * A Slime colided with something.
     *
     * @param SlimeBody the bullet that colided
     */
    private void SlimeCollision(Body SlimeBody) {
       // ((SlimeModel)SlimeBody.getUserData()).setFlaggedForRemoval(true);
    }

    /**
     * A Slime collided with the ball.
     * @param SlimeBody the bullet that collided
     * @param BallBody the asteroid that collided
     */
    private void SlimeBallCollision(Body slimeBody, Body ballBody) {
        // BallModel asteroidModel = (BallModel) BallBody.getUserData();

    }

    /**
     * A Slime collided with the ball.
     * @param SlimeBody the bullet that collided
     * @param BallBody the asteroid that collided
     */
    private void SlimeGoalCollision(Body slimeBody, Body GoalBody) {
        // BallModel asteroidModel = (BallModel) BallBody.getUserData();

    }

}
