package com.feup.superslimefootball.view.states;

import com.badlogic.gdx.Gdx;
import com.badlogic.gdx.graphics.Texture;
import com.feup.superslimefootball.view.MenuView;

import static com.feup.superslimefootball.view.GameView.VIEWPORT_HEIGHT;
import static com.feup.superslimefootball.view.GameView.VIEWPORT_WIDTH;

public class MultiPlayerMenuState extends MenuState {
    public MultiPlayerMenuState(MenuView menuView) {
        super(menuView);
    }

    @Override
    public void drawButtons() {

        Texture refresh = this.menu.getAssetManager().get("refresh.png", Texture.class);
        Texture findIP = this.menu.getAssetManager().get("findIP.png", Texture.class);

        this.menu.getBatch().draw(refresh, VIEWPORT_WIDTH*(1.0f/5.0f), VIEWPORT_HEIGHT*(1.0f/25.0f));
        this.menu.getBatch().draw(findIP, VIEWPORT_WIDTH*(3.0f/5.0f), VIEWPORT_HEIGHT*(1.0f/25.0f));
    }

    @Override
    public void handleMouse() {
        if(Gdx.input.isTouched()) {
       /*     if (touchButton(1.0f/5.0f,1.0f/25.0f))
                // refresh
            else if(touchButton(3.0f/5.0f,1.0f/25.0f))
                // find ip*/
        }
    }
}
