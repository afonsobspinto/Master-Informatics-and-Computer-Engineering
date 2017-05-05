package com.feup.superslimefootball.controller;

import com.badlogic.gdx.math.Vector2;
import com.badlogic.gdx.physics.box2d.Body;
import com.badlogic.gdx.physics.box2d.Contact;
import com.badlogic.gdx.physics.box2d.ContactImpulse;
import com.badlogic.gdx.physics.box2d.ContactListener;
import com.badlogic.gdx.physics.box2d.Manifold;
import com.badlogic.gdx.physics.box2d.World;
import com.badlogic.gdx.utils.Array;
import com.feup.superslimefootball.controller.entities.BallBody;
import com.feup.superslimefootball.controller.entities.FloorBody;
import com.feup.superslimefootball.controller.entities.SlimeBody;
import com.feup.superslimefootball.model.GameModel;
import com.feup.superslimefootball.model.entities.BallModel;
import com.feup.superslimefootball.model.entities.EntityModel;
import com.feup.superslimefootball.model.entities.GoalModel;
import com.feup.superslimefootball.model.entities.PowerModel;
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
     * The game width.
     */
    public static final int GAME_WIDTH = 100;

    /**
     * The game height.
     */
    public static final int GAME_HEIGHT = 50;

    /**
     * The acceleration impulse in newtons.
     */
    private static final float ACCELERATION_FORCE = 1000f;


    /**
     * The physics world controlled by this controller.
     */
    private final World world;

    /**
     * The ball body.
     */
    private final BallBody ballBody;

    /**
     * The slime body.
     */
    private final SlimeBody slimeBody;

    /**
     * The opponent slime body.
     */
    //private final SlimeBody opponentSlimeBody;

    /**
     * The floor body.
     */
    private final FloorBody floorBody;

    /**
     * Accumulator used to calculate the simulation step.
     */
    private float accumulator;

    public GameController() {

        world = new World(new Vector2(0, -9.8f), true);

        this.ballBody = new BallBody(world, GameModel.getInstance().getBall());
        this.slimeBody = new SlimeBody(world, GameModel.getInstance().getSlime());
        this.floorBody = new FloorBody(world, GameModel.getInstance().getFloor());
        //this.opponentSlimeBody = new SlimeBody(world, GameModel.getInstance().getOpponentSlime());
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
        accumulator += frameTime;
        while (accumulator >= 1/60f) {
            world.step(1/60f, 6, 2);
            accumulator -= 1/60f;
        }

        Array<Body> bodies = new Array<Body>();
        world.getBodies(bodies);

        for (Body body : bodies) {
            if(verifyBounds(body))
              ((EntityModel) body.getUserData()).setPosition(body.getPosition().x, body.getPosition().y);
        }



    }

    /**
     * Verifies if the body is inside the arena bounds
     *
     * @param body The body to be verified.
     *
     * @return true if the body is inside the arena bounds false elsewhere
     */

    //Todo: Complete this
    private boolean verifyBounds(Body body) {
        if (body.getPosition().x < 0){}
            //return false;

        if (body.getPosition().y < 0) {}
           //return false;

        if (body.getPosition().x > GAME_WIDTH){}
            //return false;

        if (body.getPosition().y > GAME_HEIGHT){}
            //return false;

        return true;
    }

    /**
     * Returns the world controlled by this controller. Needed for debugging purposes only.
     *
     * @return The world controlled by this controller.
     */

    public World getWorld() {
        return world;
    }

    /**
     * Moves the slime to the rigth. The acceleration takes into consideration the
     * constant acceleration force and the delta for this simulation step.
     *
     * @param delta Duration of the rotation in seconds.
     */

    public void moveRight(float delta) {
        //TODO: Choose Slime to accelerate

        slimeBody.applyForceToCenter(100000, 0, true);
        ((SlimeModel)slimeBody.getUserData()).setAccelerating(true);

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
            slimeCollision(bodyA);
        if (bodyB.getUserData() instanceof SlimeModel)
            slimeCollision(bodyB);

        if (bodyA.getUserData() instanceof SlimeModel && bodyB.getUserData() instanceof BallModel)
            slimeBallCollision(bodyA, bodyB);
        if (bodyA.getUserData() instanceof BallModel && bodyB.getUserData() instanceof SlimeModel)
            slimeBallCollision(bodyA, bodyB);

        if (bodyA.getUserData() instanceof SlimeModel && bodyB.getUserData() instanceof GoalModel)
            slimeGoalCollision(bodyA, bodyB);
        if (bodyA.getUserData() instanceof GoalModel && bodyB.getUserData() instanceof SlimeModel)
            slimeGoalCollision(bodyA, bodyB);

        if (bodyA.getUserData() instanceof SlimeModel && bodyB.getUserData() instanceof PowerModel)
            slimePowerCollision(bodyA, bodyB);
        if (bodyA.getUserData() instanceof PowerModel && bodyB.getUserData() instanceof SlimeModel)
            slimePowerCollision(bodyA, bodyB);
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
     * A slime colided with a power. Lets remove it.
     *
     * @param slimeBody the bullet that collided
     * @param powerBody the power that colided
     */
    private void slimePowerCollision(Body slimeBody, Body powerBody) {
        ((PowerModel)powerBody.getUserData()).setFlaggedForRemoval(true);
    }

    /**
     * A Slime colided with something.
     *
     * @param SlimeBody the bullet that colided
     */
    private void slimeCollision(Body SlimeBody) {
       // ((SlimeModel)SlimeBody.getUserData()).setFlaggedForRemoval(true);
    }

    /**
     * A Slime collided with the ball.
     * @param slimeBody the bullet that collided
     * @param ballBody the asteroid that collided
     */
    private void slimeBallCollision(Body slimeBody, Body ballBody) {
        // BallModel asteroidModel = (BallModel) BallBody.getUserData();

    }

    /**
     * A Slime collided with the ball.
     * @param slimeBody the bullet that collided
     * @param goalBody the asteroid that collided
     */
    private void slimeGoalCollision(Body slimeBody, Body goalBody) {
        // BallModel asteroidModel = (BallModel) BallBody.getUserData();

    }

}
