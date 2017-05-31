package com.feup.superslimefootball.view.menuStates;

import com.feup.superslimefootball.SuperSlimeFootball;
import com.feup.superslimefootball.view.MenuView;

/**
 * Created by Tomás on 31/05/2017.
 *
 */

public class SinglePlayerMenuView extends MenuView{
    public SinglePlayerMenuView(SuperSlimeFootball menu){
        super(menu);
        drawButtons();
    }
    void drawButtons(){
        this.menu.getBatch().draw(this.textures.get("blueSlime"), VIEWPORT_WIDTH*(1F/4), VIEWPORT_HEIGHT*(4F/25));
        this.menu.getBatch().draw(this.textures.get("redSlime"), VIEWPORT_WIDTH*(5F/8), VIEWPORT_HEIGHT*(4F/25));
        this.menu.getBatch().draw(this.textures.get("blueSlimeButton"), VIEWPORT_WIDTH*(1F/5), VIEWPORT_HEIGHT*(1F/25));
        this.menu.getBatch().draw(this.textures.get("redSlimeButton"), VIEWPORT_WIDTH*(3F/5), VIEWPORT_HEIGHT*(1F/25));
    }
}