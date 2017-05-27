package com.feup.superslimefootball.model;

/**
 * Created by afonso on 5/26/17.
 */

import com.feup.superslimefootball.controller.GameController;
import com.feup.superslimefootball.model.entities.SlimeModel;

/**
 * A model representing a game.
 */

public class GameModel {

    /**
     * The singleton instance of the game model
     */
    private static GameModel instance;


    /**
     * The Slime controlled by the user in this game.
     */

    private SlimeModel slimeModel;


    /**
     * Constructs a game with....
     */
    private GameModel() {

        slimeModel = new SlimeModel(GameController.GAME_WIDTH / 2 , GameController.GAME_HEIGHT / 2 , 0);

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

}


