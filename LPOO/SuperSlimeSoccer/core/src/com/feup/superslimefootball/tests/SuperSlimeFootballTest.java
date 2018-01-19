package com.feup.superslimefootball.tests;

import com.feup.superslimefootball.controller.GameController;
import com.feup.superslimefootball.controller.entities.BallBody;
import com.feup.superslimefootball.controller.entities.SlimeBody;
import com.feup.superslimefootball.model.GameModel;
import com.feup.superslimefootball.model.entities.BallModel;
import com.feup.superslimefootball.model.entities.PowerModel;
import com.feup.superslimefootball.model.entities.SlimeModel;
import com.feup.superslimefootball.view.utilities.GameConfig;

import org.junit.Assert;
import org.junit.Test;

/**
 * The type Super slime football test.
 */
public class SuperSlimeFootballTest extends GameTest {

    /**
     * Constructs slime.
     */
    @Test
    public void constructsSlime(){
        GameController gameController = GameController.getInstance();
        Assert.assertTrue(gameController.getSlimeBody() instanceof SlimeBody);
        gameController.resetInstance();
    }

    /**
     * Constructs ball.
     */
    @Test
    public void constructsBall(){
        GameController gameController = GameController.getInstance();
        Assert.assertTrue(gameController.getBallBody() instanceof BallBody);
        gameController.resetInstance();
    }

    /**
     * Constructs opponent slime.
     */
    @Test
    public void constructsOpponentSlime(){
        GameController gameController = GameController.getInstance();
        Assert.assertTrue(gameController.getOpponentSlimeBody() instanceof SlimeBody);
        gameController.resetInstance();
    }

    /**
     * Test slime right movement.
     */
    @Test
    public void testSlimeRightMovement() {
        GameController gameController = GameController.getInstance();
        gameController.moveRight();
        gameController.update(1);
        Assert.assertTrue(((SlimeModel)gameController.getSlimeBody().getUserData()).getX() > ((SlimeModel)gameController.getSlimeBody().getUserData()).getInitialX());
        gameController.resetInstance();
    }

    /**
     * Test slime left movement.
     */
    @Test
    public void testSlimeLeftMovement(){
        GameController gameController = GameController.getInstance();
        gameController.moveLeft();
        gameController.update(1);
        Assert.assertTrue(((SlimeModel)gameController.getSlimeBody().getUserData()).getX() < ((SlimeModel)gameController.getSlimeBody().getUserData()).getInitialX());
        gameController.resetInstance();
    }

    /**
     * Test slime jump movement.
     */
    @Test
    public void testSlimeJumpMovement(){
        GameController gameController = GameController.getInstance();
        gameController.jump();
        gameController.update(1);
        Assert.assertTrue(((SlimeModel)gameController.getSlimeBody().getUserData()).getY() > ((SlimeModel)gameController.getSlimeBody().getUserData()).getInitialY());
        gameController.resetInstance();
    }

    /**
     * Test slime jump right.
     */
    @Test
    public void testSlimeJumpRight(){
        GameController gameController = GameController.getInstance();
        gameController.jump();
        gameController.moveRight();
        gameController.update(1);
        Assert.assertTrue((((SlimeModel)gameController.getSlimeBody().getUserData()).getY() > ((SlimeModel)gameController.getSlimeBody().getUserData()).getInitialY())
                && (((SlimeModel)gameController.getSlimeBody().getUserData()).getX() > ((SlimeModel)gameController.getSlimeBody().getUserData()).getInitialX()));
        gameController.resetInstance();
    }

    /**
     * Test slime jump left.
     */
    @Test
    public void testSlimeJumpLeft(){
        GameController gameController = GameController.getInstance();
        gameController.jump();
        gameController.moveLeft();
        gameController.update(1);
        Assert.assertTrue((((SlimeModel)gameController.getSlimeBody().getUserData()).getY() > ((SlimeModel)gameController.getSlimeBody().getUserData()).getInitialY())
                && (((SlimeModel)gameController.getSlimeBody().getUserData()).getX() < ((SlimeModel)gameController.getSlimeBody().getUserData()).getInitialX()));
        gameController.resetInstance();
    }

    /**
     * Test ball falls down.
     */
    @Test
    public void testBallFallsDown(){
        GameController gameController = GameController.getInstance();
        gameController.update(1);
        Assert.assertTrue(((BallModel)gameController.getBallBody().getUserData()).getY() < ((BallModel)gameController.getBallBody().getUserData()).getInitialY());
        gameController.resetInstance();
    }

    /**
     * Test initial score.
     */
    @Test
    public void testInitialScore(){
        Assert.assertTrue(GameConfig.getInstance().getScore().getPlayer1()==0);
        Assert.assertTrue(GameConfig.getInstance().getScore().getPlayer2()==0);
        GameConfig.getInstance().resetInstance();
    }

    /**
     * Test ai movement.
     */
    @Test
    public void testAIMovement(){
        GameController gameController = GameController.getInstance();
        gameController.update(1);
        Assert.assertTrue(((SlimeModel)gameController.getOpponentSlimeBody().getUserData()).getX() < ((SlimeModel)gameController.getOpponentSlimeBody().getUserData()).getInitialX());
        gameController.resetInstance();
    }

    /**
     * Test catch power.
     */
    @Test
    public void testCatchPower(){
        GameController gameController = GameController.getInstance();
        float slimeX = ((SlimeModel)gameController.getSlimeBody().getUserData()).getX();
        float slimeY = ((SlimeModel)gameController.getSlimeBody().getUserData()).getY();
        PowerModel speed = new PowerModel(slimeX + 1f, slimeY, PowerModel.PowerType.SPEED);
        GameModel.getInstance().getPowers().add(speed);
        gameController.moveRight();
        gameController.update(1);
        Assert.assertTrue(((SlimeModel)gameController.getSlimeBody().getUserData()).getPowerType() != null);
    }
}