package com.feup.superslimefootball.view.states;

import com.badlogic.gdx.Gdx;
import com.feup.superslimefootball.SuperSlimeFootball;

public abstract class MenuState {


    protected final SuperSlimeFootball game;

    /**
     * The width of the buttons.
     */
    public static final float BUTTONS_WIDTH = 19.0f/100.0f;

    /**
     * The height of the buttons.
     */
    public static final float BUTTONS_HEIGHT = 1.0f/10.0f;

    public MenuState(SuperSlimeFootball game){
        this.game = game;
    }

    public abstract void  drawButtons();

    public abstract void  handleMouse();

    public boolean touchButton(double xPos, double yPos, double width, double height){
        if ((Gdx.input.getX() > Gdx.graphics.getWidth()*xPos) && (Gdx.input.getX() < Gdx.graphics.getWidth()*(xPos+width))
                && (Gdx.input.getY() < Gdx.graphics.getHeight()*(1-yPos)) && (Gdx.input.getY() > Gdx.graphics.getHeight()*((1-yPos) - height)))
            return true;
        return false;
    }


}
