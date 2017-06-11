package com.feup.superslimefootball.view.states;

import com.badlogic.gdx.Gdx;
import com.feup.superslimefootball.SuperSlimeFootball;

public abstract class MenuState {

    /**
     * The game of the Menu
     */
    protected final SuperSlimeFootball game;

    /**
     * The width of the buttons.
     */
    public static final float BUTTONS_WIDTH = 19.0f/100.0f;

    /**
     * The height of the buttons.
     */
    public static final float BUTTONS_HEIGHT = 1.0f/10.0f;

    /**
     * Creates a MenuState in the game
     * @param game
     */
    public MenuState(SuperSlimeFootball game){
        this.game = game;
    }

    /**
     * Draws the game's buttons
     */
    public abstract void  drawButtons();

    /**
     * Handles the mouse
     */
    public abstract void  handleMouse();

    /**
     * Checks if the button with pos (xPos,yPos) has been touched
     *
     * @param xPos
     * @param yPos
     * @param width
     * @param height
     * @return
     */
    public boolean touchButton(double xPos, double yPos, double width, double height){
        if ((Gdx.input.getX() > Gdx.graphics.getWidth()*xPos) && (Gdx.input.getX() < Gdx.graphics.getWidth()*(xPos+width))
                && (Gdx.input.getY() < Gdx.graphics.getHeight()*(1-yPos)) && (Gdx.input.getY() > Gdx.graphics.getHeight()*((1-yPos) - height)))
            return true;
        return false;
    }

    /**
     * Returns false if connected
     *
     * @return
     */
    public boolean isConnected(){
        return false;
    }

    /**
     * Returns false if it's a server
     *
     * @return
     */
    public boolean isServer(){
        return false;
    }

}
