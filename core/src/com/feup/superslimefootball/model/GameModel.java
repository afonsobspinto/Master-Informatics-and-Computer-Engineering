package com.feup.superslimefootball.model;

/**
 * Created by afonso on 5/26/17.
 */

import com.feup.superslimefootball.controller.GameController;
import com.feup.superslimefootball.model.entities.BallModel;
import com.feup.superslimefootball.model.entities.SlimeModel;
import com.feup.superslimefootball.model.entities.WallsModel;

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
     * The Ball in this game.
     */

    private BallModel ballModel;



    /**
     * Constructs a game with....
     */
    private GameModel() {

        wallsModel = new WallsModel(0,0, 0);
        slimeModel = new SlimeModel(GameController.GAME_WIDTH * (1.0f/5.0f) , GameController.GAME_HEIGHT * (4.0f/5.0f) , 0);
        ballModel = new BallModel(GameController.GAME_WIDTH / 2.0f, GameController.GAME_HEIGHT * (4.0f/5.0f), 0);

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
}



