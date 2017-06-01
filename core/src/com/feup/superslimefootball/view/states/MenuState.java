package com.feup.superslimefootball.view.states;

import com.feup.superslimefootball.SuperSlimeFootball;
import com.feup.superslimefootball.view.MenuView;

public abstract class MenuState {

    /**
     * The menu this screen belongs to.
     */
    protected final MenuView menuView;

    protected final SuperSlimeFootball menu;

    public MenuState(MenuView menuView){
        this.menuView = menuView;
        this.menu = menuView.getMenu();
    }

    public abstract void  drawButtons();

    public abstract void  handleMouse();



}
