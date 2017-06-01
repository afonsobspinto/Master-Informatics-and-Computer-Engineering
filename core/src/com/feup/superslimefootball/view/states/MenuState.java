package com.feup.superslimefootball.view.states;

import com.feup.superslimefootball.SuperSlimeFootball;

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
