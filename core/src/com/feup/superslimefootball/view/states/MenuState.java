package com.feup.superslimefootball.view.states;

import com.badlogic.gdx.Gdx;
import com.feup.superslimefootball.SuperSlimeFootball;
import com.feup.superslimefootball.view.MenuView;

import static com.feup.superslimefootball.view.GameView.VIEWPORT_HEIGHT;
import static com.feup.superslimefootball.view.GameView.VIEWPORT_WIDTH;

public abstract class MenuState {

    /**
     * The menu this screen belongs to.
     */
    protected final MenuView menuView;

    protected final SuperSlimeFootball menu;

    /**
     * The width of the buttons.
     */
    public static final float BUTTONS_WIDTH = 19.0f/100.0f;

    /**
     * The height of the buttons.
     */
    public static final float BUTTONS_HEIGHT = 1.0f/10.0f;

    public MenuState(MenuView menuView){
        this.menuView = menuView;
        this.menu = menuView.getMenu();
    }

    public abstract void  drawButtons();

    public abstract void  handleMouse();

    public boolean touchButton(double width, double height){
        if ((Gdx.input.getX() > VIEWPORT_WIDTH*width) && (Gdx.input.getX() < VIEWPORT_WIDTH*(width+BUTTONS_WIDTH))
                && (Gdx.input.getY() < VIEWPORT_HEIGHT*(1-height)) && (Gdx.input.getY() > VIEWPORT_HEIGHT*((1-height) - BUTTONS_HEIGHT)))
            return true;
        return false;
    }


}
