package com.feup.superslimefootball.view.states;

import com.feup.superslimefootball.SuperSlimeFootball;

/**
 * Created by afonso on 6/1/17.
 */

public abstract class MenuState {

    /**
     * The menu this screen belongs to.
     */
    protected final SuperSlimeFootball menu;

    public MenuState(SuperSlimeFootball menu){
        this.menu = menu;
    }

    public abstract void  drawButtons();

    public abstract void  handleMouse();



}
