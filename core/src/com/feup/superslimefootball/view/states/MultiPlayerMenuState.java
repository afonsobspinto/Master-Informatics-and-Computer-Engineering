package com.feup.superslimefootball.view.states;

import com.badlogic.gdx.Gdx;
import com.badlogic.gdx.graphics.Texture;
import com.feup.superslimefootball.view.MenuView;

public class MultiPlayerMenuState extends MenuState {
    public MultiPlayerMenuState(MenuView menuView) {
        super(menuView);
    }

    @Override
    public void drawButtons() {

        Texture refresh = this.menu.getAssetManager().get("refresh.png", Texture.class);
        Texture findIP = this.menu.getAssetManager().get("findIP.png", Texture.class);
        Texture goBack = this.menu.getAssetManager().get("goBack.png", Texture.class);

        this.menu.getBatch().draw(refresh, Gdx.graphics.getWidth()*(1.0f/5.0f), Gdx.graphics.getHeight()*(1.0f/25.0f));
        this.menu.getBatch().draw(findIP, Gdx.graphics.getWidth()*(3.0f/5.0f), Gdx.graphics.getHeight()*(1.0f/25.0f));
        this.menu.getBatch().draw(goBack, Gdx.graphics.getWidth()*(1.0f/13.0f), Gdx.graphics.getHeight()*(17.0f/20.0f));
    }

    @Override
    public void handleMouse() {
        if(Gdx.input.justTouched()) {
            if(touchButton(1.0f/13.0f,17.0f/20.0f))
                this.menuView.setState(new InitialMenuState(this.menuView));
       /*     if (touchButton(1.0f/5.0f,1.0f/25.0f))
                // refresh
            else if(touchButton(3.0f/5.0f,1.0f/25.0f))
                // find ip*/
        }
    }
}
