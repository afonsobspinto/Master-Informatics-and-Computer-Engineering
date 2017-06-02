package com.feup.superslimefootball.controller;

import com.badlogic.gdx.math.Vector2;
import com.badlogic.gdx.physics.box2d.Body;
import com.badlogic.gdx.physics.box2d.Contact;
import com.badlogic.gdx.physics.box2d.ContactImpulse;
import com.badlogic.gdx.physics.box2d.ContactListener;
import com.badlogic.gdx.physics.box2d.Fixture;
import com.badlogic.gdx.physics.box2d.Manifold;
import com.badlogic.gdx.physics.box2d.World;
import com.badlogic.gdx.utils.Array;
import com.feup.superslimefootball.controller.entities.BallBody;
import com.feup.superslimefootball.controller.entities.GoalBody;
import com.feup.superslimefootball.controller.entities.PowerBody;
import com.feup.superslimefootball.controller.entities.SlimeBody;
import com.feup.superslimefootball.controller.entities.WallsBody;
import com.feup.superslimefootball.model.GameModel;
import com.feup.superslimefootball.model.entities.BallModel;
import com.feup.superslimefootball.model.entities.EntityModel;
import com.feup.superslimefootball.model.entities.GoalModel;
import com.feup.superslimefootball.model.entities.PowerModel;
import com.feup.superslimefootball.model.entities.SlimeModel;

import java.util.List;

import static com.feup.superslimefootball.view.GameView.PPM;

/**
 * Created by afonso on 5/26/17.
 */

public class GameController implements ContactListener {


    /**
     * The singleton instance of this controller
     */
    private static GameController instance;

    /**
     * The arena width in meters.
     */
    public static final int GAME_WIDTH = 800;

    /**
     * The arena height in meters.
     */
    public static final int GAME_HEIGHT = 400;

    /**
     * The physics world controlled by this controller.
     */
    private final World world;


    /**
     * The slime body.
     */
    private final SlimeBody slimeBody;

    /**
     * The slime body.
     */
    private final SlimeBody opponentSlimeBody;


    /**
     * The ball body.
     */
    private final BallBody ballBody;





    /**
     * Accumulator used to calculate the simulation step.
     */
    private float accumulator;


    /**
     * Creates a new GameController that controls the physics of a certain GameModel.
     *
     */
    private GameController() {
        world = new World(new Vector2(0f, -9.8f), false);

        new WallsBody(world, GameModel.getInstance().getWallsModel());
        slimeBody = new SlimeBody(world, GameModel.getInstance().getSlimeModel());
        opponentSlimeBody = new SlimeBody(world, GameModel.getInstance().getOpponentSlimeModel());
        ballBody = new BallBody(world, GameModel.getInstance().getBallModel());


        List<PowerModel> powers = GameModel.getInstance().getPowers();
        for (PowerModel power : powers)
            if (power.getPowerType() == PowerModel.PowerType.SPEED)
                new PowerBody(world, power);

        List<GoalModel> goals = GameModel.getInstance().getGoals();
        boolean flip = true;
        for (GoalModel goal : goals){
            flip = !flip;
            new GoalBody(world, goal, flip);
        }


        world.setContactListener(this);
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

        updateState();

        float frameTime = Math.min(delta, 0.25f);
        accumulator += frameTime;
        while (accumulator >= 1/60f) {
            world.step(1/60f, 6, 2);
            accumulator -= 1/60f;
        }

        Array<Body> bodies = new Array<Body>();
        world.getBodies(bodies);

        for (Body body : bodies) {
            ((EntityModel) body.getUserData()).setPosition(body.getPosition().x * PPM, body.getPosition().y * PPM);
        }

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
     * Verifies in witch state SlimeOne is
     * */
    public void updateState() {

        if(slimeBody.getLinearVelocity().y != 0)
            ((SlimeModel)slimeBody.getUserData()).setSlimeState(SlimeModel.SlimeState.JUMPING);
        else
            ((SlimeModel)slimeBody.getUserData()).setSlimeState(SlimeModel.SlimeState.RUNNING);
    }


    /**
     * Moves the Slime to the right.
     *
     *
     */
    public void moveRight() {
        slimeBody.applyLinearImpulse(1f , 0, true);
        ((SlimeModel)slimeBody.getUserData()).setOrientationState(SlimeModel.OrientationState.RIGHT);
        //slimeBody.applyForceToCenter(5f,0,true);
    }

    /**
     * Moves the Slime to the left.
     *
     */
    public void moveLeft() {

        slimeBody.applyLinearImpulse(-1f , 0, true);
        ((SlimeModel)slimeBody.getUserData()).setOrientationState(SlimeModel.OrientationState.LEFT);
        //slimeBody.applyForceToCenter(-5f,0,true);
    }

    /**
     * Moves the Slime up.
     *
     */
    public void jump() {
        //todo: decrease speed horizontally;
        if(((SlimeModel)slimeBody.getUserData()).getSlimeState() != SlimeModel.SlimeState.JUMPING)
            slimeBody.applyLinearImpulse(0, 25f, true);
            //slimeBody.applyForceToCenter(0,300f,true);
    }

    /**
     * Uses the Slime power.
     *
     */
    public void powerUP() {
        if(((SlimeModel)slimeBody.getUserData()).getPowerType() != null){
            System.out.println("Power Up");
            ((SlimeModel)slimeBody.getUserData()).setPowerType(null);
        }
        else
            System.out.println(" No Power");
    }

    @Override
    public void beginContact(Contact contact) {

        Body bodyA = contact.getFixtureA().getBody();
        Body bodyB = contact.getFixtureB().getBody();


        if (bodyA.getUserData() instanceof SlimeModel && bodyB.getUserData() instanceof BallModel)
            slimeBallCollision(bodyA, bodyB);
        else if (bodyA.getUserData() instanceof BallModel && bodyB.getUserData() instanceof SlimeModel)
            slimeBallCollision(bodyB, bodyA);

        else if (bodyA.getUserData() instanceof SlimeModel && bodyB.getUserData() instanceof PowerModel)
            slimePowerCollision(bodyA, bodyB);
        else if (bodyA.getUserData() instanceof PowerModel && bodyB.getUserData() instanceof SlimeModel)
            slimePowerCollision(bodyB, bodyA);

        else if (bodyA.getUserData() instanceof BallModel && bodyB.getUserData() instanceof GoalModel)
            ballGoalCollision(bodyA, contact.getFixtureB());
        else if (bodyA.getUserData() instanceof GoalModel && bodyB.getUserData() instanceof BallModel)
            ballGoalCollision(bodyB, contact.getFixtureA());



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
     * A slime collided with the Ball.
     * @param slimeBody the slime that collided
     * @param ballBody the ball that collided
     */

    //todo: Ball jump when slime gets over it
    private void slimeBallCollision(Body slimeBody, Body ballBody) {
        System.out.println("Colisão Slime Bola");

    }


    /**
     * A ball collided with a goal.
     * @param ballBody the ball that collided
     * @param goalFixture the fixture of the goal that collided
     */
    private void ballGoalCollision(Body ballBody, Fixture goalFixture) {
        System.out.println("Colisão Bola Baliza");

        if(goalFixture.isSensor())
            System.out.println("GOLOOOO!");
        else
            System.out.println("Trave");
    }

    /**
     * A slime collided with a Power.
     * @param slimeBody the slime that collided
     * @param powerBody the power that collided
     */
    private void slimePowerCollision(Body slimeBody, Body powerBody) {
        System.out.println("Colisão Slime Power");

        if(((SlimeModel)slimeBody.getUserData()).getPowerType() == null){
            System.out.println("Power Atribuido ao Slime");
            ((SlimeModel)slimeBody.getUserData()).setPowerType(((PowerModel) powerBody.getUserData()).getPowerType());
            ((PowerModel)powerBody.getUserData()).setFlaggedForRemoval(true);
        }
    }


    /**
     * Removes objects that have been flagged for removal on the
     * previous step.
     */
    public void removeFlagged() {
        Array<Body> bodies = new Array<Body>();
        world.getBodies(bodies);
        for (Body body : bodies) {
            if (((EntityModel)body.getUserData()).isFlaggedToBeRemoved()) {
                System.out.println("Removed");
                GameModel.getInstance().remove((EntityModel) body.getUserData());
                world.destroyBody(body);
            }
        }
    }
}
