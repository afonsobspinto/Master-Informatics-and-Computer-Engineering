package com.feup.superslimefootball.view.states;

import com.badlogic.gdx.Gdx;
import com.badlogic.gdx.graphics.Texture;
import com.feup.superslimefootball.network.NetworkManager;
import com.feup.superslimefootball.view.MenuView;

public class MultiPlayerMenuState extends MenuState {

    public MultiPlayerMenuState(MenuView menuView) {
        super(menuView);
        new NetworkManager();
    }


    @Override
    public void drawButtons() {

        Texture refresh = this.game.getAssetManager().get("refresh.png", Texture.class);
        Texture findIP = this.game.getAssetManager().get("findIP.png", Texture.class);

        this.game.getBatch().draw(refresh, Gdx.graphics.getWidth()*(1.0f/5.0f), Gdx.graphics.getHeight()*(1.0f/25.0f));
        this.game.getBatch().draw(findIP, Gdx.graphics.getWidth()*(3.0f/5.0f), Gdx.graphics.getHeight()*(1.0f/25.0f));
    }

    @Override
    public void handleMouse() {
        if(Gdx.input.justTouched()) {
       /*     if (touchButton(1.0f/5.0f,1.0f/25.0f))
                // refresh
            else if(touchButton(3.0f/5.0f,1.0f/25.0f))
                // find ip*/
        }
    }
}
