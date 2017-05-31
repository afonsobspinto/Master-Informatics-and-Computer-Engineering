package com.feup.superslimefootball.view.menuStates;

import com.feup.superslimefootball.SuperSlimeFootball;
import com.feup.superslimefootball.view.MenuView;

/**
 * Created by Tomás on 31/05/2017.
 *
 */

public class InitialMenuView extends MenuView{
    public InitialMenuView(SuperSlimeFootball menu){
        super(menu);
        this.drawButtons();
    }
    void drawButtons(){
        this.menu.getBatch().begin();
        this.menu.getBatch().draw(this.textures.get("singlePlayer"), VIEWPORT_WIDTH*(1F/5), VIEWPORT_HEIGHT*(1F/25));
        this.menu.getBatch().draw(this.textures.get("multiPlayer"), VIEWPORT_WIDTH*(2F/5), VIEWPORT_HEIGHT*(1F/25));
        this.menu.getBatch().draw(this.textures.get("options"), VIEWPORT_WIDTH*(3F/5), VIEWPORT_HEIGHT*(1F/25));
        this.menu.getBatch().draw(this.textures.get("facebook"), VIEWPORT_WIDTH*(12F/13), VIEWPORT_HEIGHT*(17F/20));
        this.menu.getBatch().draw(this.textures.get("twitter"), VIEWPORT_WIDTH*(12F/13), VIEWPORT_HEIGHT*(14F/20));
        this.menu.getBatch().end();
    }
}