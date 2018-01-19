package com.feup.superslimefootball.view.utilities;

import java.io.Serializable;

/**
 * Created by afonso on 6/2/17.
 */
public class Score implements Serializable {

    private Integer player1;
    private Integer player2;

    /**
     * Instantiates a new Score.
     *
     * @param player1 the player 1
     * @param player2 the player 2
     */
    public Score(int player1, int player2) {
        this.player1 = player1;
        this.player2 = player2;
    }

    /**
     * Gets player 1.
     *
     * @return the player 1
     */
    public Integer getPlayer1() {
        return player1;
    }

    /**
     * Gets player 2.
     *
     * @return the player 2
     */
    public Integer getPlayer2() {
        return player2;
    }
}
