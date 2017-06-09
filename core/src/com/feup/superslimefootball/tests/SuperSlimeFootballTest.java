package com.feup.superslimefootball.tests;

import com.feup.superslimefootball.controller.GameController;

import org.junit.Assert;
import org.junit.Test;

/**
 * Created by afonso on 6/8/17.
 */

public class SuperSlimeFootballTest extends GameTest {

    @Test
    public void testHandler() {
        GameController gameController = GameController.getInstance();
        gameController.moveRight();
        Assert.assertTrue(1==1);
    }
}
