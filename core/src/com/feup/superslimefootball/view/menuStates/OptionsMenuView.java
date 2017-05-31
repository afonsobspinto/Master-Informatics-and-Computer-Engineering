package com.feup.superslimefootball.view.menuStates;

import com.feup.superslimefootball.SuperSlimeFootball;
import com.feup.superslimefootball.view.MenuView;

/**
 * Created by Tomás on 31/05/2017.
 *
 */

public class OptionsMenuView extends MenuView{
    public OptionsMenuView(SuperSlimeFootball menu){
        super(menu);
        drawButtons();
    }
    void drawButtons(){
        this.menu.getBatch().draw(this.textures.get("howToPlay"), VIEWPORT_WIDTH*(1F/13), VIEWPORT_HEIGHT*(17F/20));
        this.menu.getBatch().draw(this.textures.get("sound"), VIEWPORT_WIDTH*(1F/5), VIEWPORT_HEIGHT*(1F/25));
        this.menu.getBatch().draw(this.textures.get("comments"), VIEWPORT_WIDTH*(2F/5), VIEWPORT_HEIGHT*(1F/25));
        this.menu.getBatch().draw(this.textures.get("goalLimit"), VIEWPORT_WIDTH*(3F/5), VIEWPORT_HEIGHT*(1F/25));
    }
}