package com.feup.superslimefootball.model;

/**
 * Created by afonso on 4/28/17.
 */

import com.badlogic.gdx.Gdx;
import com.feup.superslimefootball.model.entities.BallModel;
import com.feup.superslimefootball.model.entities.FloorModel;
import com.feup.superslimefootball.model.entities.GoalModel;
import com.feup.superslimefootball.model.entities.SlimeModel;

/**
 * A model representing a game.
 */

//TODO: Complete GameModel

public class GameModel {

    /**
     * The singleton instance of the game model
     */
    private static GameModel instance;

    /**
     * The slime controlled by the user in this game.
     */

    private SlimeModel slime;

    /**
     * The goal of the game.
     */

    private GoalModel goal;

    /**
     * The ball roaming around in this game.
     */

    private BallModel ball;

    /**
     * The opponent slime in this game.
     */
    private SlimeModel opponentSlime;



    /**
     * The floor in this game.
     */
    private FloorModel floor;


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
     * Constructs a game with a ball in the middle of the
     * pitch and a two slimes on different side of the pitch.
     */
    private GameModel() {
        ball = new BallModel(325,300);
        goal = new GoalModel(575,95);
        slime = new SlimeModel(80,150);
        floor = new FloorModel(Gdx.graphics.getWidth()/2, 0);
       //opponentSlime = new BallModel(GameController.ARENA_WIDTH / 2, GameController.ARENA_HEIGHT / 2, 0);

    }

    /**
     * Returns the player slime.
     *
     * @return the player slime.
     */

    public SlimeModel getSlime() {
        return slime;
    }

    /**
     * Returns the goal.
     *
     * @return the goal.
     */

    public GoalModel getGoal() { return goal; }

    /**
     * Returns the ball.
     *
     * @return the ball.
     */

    public BallModel getBall() {
        return ball;
    }

    /**
     * Returns the floor.
     *
     * @return the floor.
     */

    public FloorModel getFloor() {
        return floor;
    }


    /**
     * Returns the opponent slime.
     *
     * @return the opponent slime.
     */

    public SlimeModel getOpponentSlime() {
        return opponentSlime;
    }

    public void update(float delta) {

    }

}
