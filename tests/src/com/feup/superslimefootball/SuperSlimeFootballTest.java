package com.feup.superslimefootball;

import com.feup.superslimefootball.controller.GameController;

import org.junit.Test;
import org.junit.runner.RunWith;

/**
 * Created by afonso on 6/8/17.
 */

@RunWith(GdxTestRunner.class)
public class SuperSlimeFootballTest {
    @Test
    public void bestTestInHistory() {
        GameController gameController = GameController.getInstance();

        gameController.moveRight();

    }
}
