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
import com.feup.superslimefootball.controller.entities.GoalBody;
import com.feup.superslimefootball.controller.entities.PowerBody;
import com.feup.superslimefootball.controller.entities.SlimeBody;
import com.feup.superslimefootball.controller.entities.WallsBody;
import com.feup.superslimefootball.model.GameModel;
import com.feup.superslimefootball.model.entities.EntityModel;
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
     * The arena walls.
     */

    private  final WallsBody wallsBody;

    /**
     * The slime body.
     */
    private final SlimeBody slimeBody;

    /**
     * The ball body.
     */
    private final BallBody ballBody;

    /**
     * The left Goal body.
     */
    private final GoalBody leftGoalBody;


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

        wallsBody = new WallsBody(world, GameModel.getInstance().getWallsModel());
        slimeBody = new SlimeBody(world, GameModel.getInstance().getSlimeModel());
        ballBody = new BallBody(world, GameModel.getInstance().getBallModel());
        leftGoalBody = new GoalBody(world, GameModel.getInstance().getLeftGoalModel());


        List<PowerModel> powers = GameModel.getInstance().getPowers();
        for (PowerModel power : powers)
            if (power.getPowerType() == PowerModel.PowerType.SPEED)
                new PowerBody(world, power);

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
            ((SlimeModel)slimeBody.getUserData()).setCurrentState(SlimeModel.State.JUMPING);
        else
            ((SlimeModel)slimeBody.getUserData()).setCurrentState(SlimeModel.State.RUNNING);
    }


    /**
     * Moves the Slime to the right.
     *
     *
     */
    public void moveRight() {
        slimeBody.applyLinearImpulse(1f , 0, true);
        //slimeBody.applyForceToCenter(5f,0,true);
    }

    /**
     * Moves the Slime to the left.
     *
     */
    public void moveLeft() {
        slimeBody.applyLinearImpulse(-1f , 0, true);
        //slimeBody.applyForceToCenter(-5f,0,true);
    }

    /**
     * Moves the Slime up.
     *
     */
    public void jump() {
        if(((SlimeModel)slimeBody.getUserData()).getCurrentState() != SlimeModel.State.JUMPING)
            slimeBody.applyLinearImpulse(0, 20f, true);
            //slimeBody.applyForceToCenter(0,300f,true);
    }

    @Override
    public void beginContact(Contact contact) {

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
}
