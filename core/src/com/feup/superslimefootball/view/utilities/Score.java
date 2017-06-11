package com.feup.superslimefootball.view.utilities;

import java.io.Serializable;

/**
 * Created by afonso on 6/2/17.
 */

public class Score implements Serializable {

    private Integer player1;
    private Integer player2;

    public Score(int player1, int player2) {
        this.player1 = player1;
        this.player2 = player2;
    }

    public Integer getPlayer1() {
        return player1;
    }

    public Integer getPlayer2() {
        return player2;
    }
}
