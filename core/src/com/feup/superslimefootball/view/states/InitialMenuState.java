package com.feup.superslimefootball.view.states;

import com.badlogic.gdx.Gdx;
import com.badlogic.gdx.graphics.Texture;
import com.feup.superslimefootball.view.MenuView;

public class InitialMenuState extends MenuState {


    public InitialMenuState(MenuView menuView) {
        super(menuView);
    }

    @Override
    public void drawButtons() {

        Texture singlePlayer = this.menu.getAssetManager().get("singleplayer.png", Texture.class);
        Texture multiPlayer = this.menu.getAssetManager().get("multiplayer.png", Texture.class);
        Texture options = this.menu.getAssetManager().get("options.png", Texture.class);
        Texture facebook = this.menu.getAssetManager().get("facebook.png", Texture.class);
        Texture twitter = this.menu.getAssetManager().get("twitter.png", Texture.class);

        this.menu.getBatch().draw(singlePlayer, Gdx.graphics.getWidth()*(1.0f/5.0f), Gdx.graphics.getHeight()*(1.0f/25.0f));
        this.menu.getBatch().draw(multiPlayer, Gdx.graphics.getWidth()*(2.0f/5.0f), Gdx.graphics.getHeight()*(1.0f/25.0f));
        this.menu.getBatch().draw(options, Gdx.graphics.getWidth()*(3.0f/5.0f), Gdx.graphics.getHeight()*(1.0f/25.0f));
        this.menu.getBatch().draw(facebook, Gdx.graphics.getWidth()*(12.0f/13.0f), Gdx.graphics.getHeight()*(17.0f/20.0f));
        this.menu.getBatch().draw(twitter, Gdx.graphics.getWidth()*(12.0f/13.0f), Gdx.graphics.getHeight()*(14.0f/20.0f));

    }

    @Override
    public void handleMouse() {
        if(Gdx.input.justTouched()){
            if (touchButton(1.0f/5.0f,1.0f/25.0f, BUTTONS_WIDTH, BUTTONS_HEIGHT))
                this.menuView.setState(new SinglePlayerMenuState(this.menuView));
            else if(touchButton(2.0f/5.0f,1.0f/25.0f, BUTTONS_WIDTH, BUTTONS_HEIGHT))
                this.menuView.setState(new MultiPlayerMenuState(this.menuView));
            else if(touchButton(3.0f/5.0f,1.0f/25.0f, BUTTONS_WIDTH, BUTTONS_HEIGHT))
                this.menuView.setState(new OptionsMenuState(this.menuView));
        }
    }
}
