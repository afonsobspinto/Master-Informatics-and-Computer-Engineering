package com.feup.superslimefootball;

import com.feup.superslimefootball.view.states.InitialMenuState;

import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;

/**
 * Created by afonso on 6/8/17.
 */

@RunWith(GdxTestRunner.class)
public class SuperSlimeFootballTest {
    @Test
    public void bestTestInHistory() {

        SuperSlimeFootball superSlimeFootball = new SuperSlimeFootball();
        superSlimeFootball.create();
        Assert.assertTrue(superSlimeFootball.getGameState() instanceof InitialMenuState);

    }
}
