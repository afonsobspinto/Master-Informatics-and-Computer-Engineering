package com.feup.superslimefootball.model;

/**
 * Created by afonso on 5/26/17.
 */

import com.feup.superslimefootball.controller.GameController;
import com.feup.superslimefootball.model.entities.BallModel;
import com.feup.superslimefootball.model.entities.EntityModel;
import com.feup.superslimefootball.model.entities.GoalModel;
import com.feup.superslimefootball.model.entities.PowerModel;
import com.feup.superslimefootball.model.entities.SlimeModel;
import com.feup.superslimefootball.model.entities.WallsModel;

import java.util.ArrayList;
import java.util.List;

import static com.badlogic.gdx.math.MathUtils.random;

/**
 * A model representing a game.
 */

public class GameModel {

    /**
     * The singleton instance of the game model
     */
    private static GameModel instance;

    /**
     * The arena wallsModel
     */

    private WallsModel wallsModel;

    /**
     * The Slime controlled by the user in this game.
     */

    private SlimeModel slimeModel;


    /**
     * The Slime controlled by the opponent in this game.
     */

    private SlimeModel opponentSlimeModel;

    /**
     * The Ball in this game.
     */

    private BallModel ballModel;


    /**
     * The goals in this game.
     */
    private List<GoalModel> goals;




    /**
     * The powers roaming around in this game.
     */
    private List<PowerModel> powers;



    /**
     * Constructs a game with....
     */
    private GameModel() {

        wallsModel = new WallsModel(0,0);
        slimeModel = new SlimeModel(GameController.GAME_WIDTH * (1.0f/5.0f) , GameController.GAME_HEIGHT * (1.0f/5.0f));
        opponentSlimeModel = new SlimeModel(GameController.GAME_WIDTH * (4.0f/5.0f) , GameController.GAME_HEIGHT * (1.0f/5.0f));
        ballModel = new BallModel(GameController.GAME_WIDTH / 2.0f, GameController.GAME_HEIGHT * (4.0f/5.0f));

        goals = new ArrayList<GoalModel>();
        goals.add(new GoalModel(GameController.GAME_WIDTH * (1.0f/13.0f) , GameController.GAME_HEIGHT * (1.0f/6.0f)));
        goals.add(new GoalModel(GameController.GAME_WIDTH * (12.0f/13.0f) , GameController.GAME_HEIGHT * (1.0f/6.0f)));

        powers = new ArrayList<PowerModel>();
        powers.add(new PowerModel(random.nextFloat() * (GameController.GAME_WIDTH*(4.0f/5.0f)-GameController.GAME_WIDTH*(1.0f/5.0f)) + GameController.GAME_WIDTH*(1.0f/5.0f),  GameController.GAME_HEIGHT * (1.0f/5.0f), PowerModel.PowerType.SPEED ));

   }

    /**
     * Removes a model from this game.
     *
     * @param model the model to be removed
     */
    public void remove(EntityModel model) {
        if (model instanceof PowerModel) {
            powers.remove(model);
        }
    }

    public void update(float delta) {
        for (PowerModel power : powers)
            if (power.decreaseTimeToLive(delta))
                power.setFlaggedForRemoval(true);
    }


    /**
     * Returns a singleton instance of the game model
     *
     * @return the singleton instance
     */
    public static GameModel getInstance() {
        if (instance == null)
            instance = new GameModel();
        return instance;
    }

    /**
     * Returns the player slime .
     *
     * @return the player slime.
     */


    public SlimeModel getSlimeModel() {
        return slimeModel;
    }


    /**
     * Returns the opponent slime .
     *
     * @return the opponent slime.
     */


    public SlimeModel getOpponentSlimeModel() {
        return opponentSlimeModel;
    }



    /**
     * Returns the ball.
     *
     * @return the ball.
     */

    public BallModel getBallModel() {
        return ballModel;
    }


    /**
     * Returns the walls.
     *
     * @return the walls.
     */


    public WallsModel getWallsModel() {
        return wallsModel;
    }


    /**
     * Returns the Goals.
     *
     * @return the  Goals
     */

    public List<GoalModel> getGoals() {
        return goals;
    }

    /**
     * Returns the powers List.
     *
     * @return the powers List.
     */

    public List<PowerModel> getPowers() {
        return powers;
    }
}



