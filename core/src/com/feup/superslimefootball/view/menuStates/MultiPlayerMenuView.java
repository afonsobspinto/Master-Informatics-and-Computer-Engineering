package com.feup.superslimefootball.view.menuStates;

import com.feup.superslimefootball.SuperSlimeFootball;
import com.feup.superslimefootball.view.MenuView;

/**
 * Created by Tomás on 31/05/2017.
 *
 */

public class MultiPlayerMenuView extends MenuView{
    public MultiPlayerMenuView(SuperSlimeFootball menu){
        super(menu);
        drawButtons();
    }
    void drawButtons(){
        this.menu.getBatch().draw(this.textures.get("refresh"), VIEWPORT_WIDTH*(1F/5), VIEWPORT_HEIGHT*(1F/25));
        this.menu.getBatch().draw(this.textures.get("findIP"), VIEWPORT_WIDTH*(3F/5), VIEWPORT_HEIGHT*(1F/25));
    }
}