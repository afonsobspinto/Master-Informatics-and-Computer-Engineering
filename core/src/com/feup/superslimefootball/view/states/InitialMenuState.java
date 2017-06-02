package com.feup.superslimefootball.view.states;

import com.badlogic.gdx.Gdx;
import com.badlogic.gdx.graphics.Texture;
import com.feup.superslimefootball.SuperSlimeFootball;

public class InitialMenuState extends MenuState {


    public InitialMenuState(SuperSlimeFootball game) {
        super(game);
    }

    @Override
    public void drawButtons() {

        Texture singlePlayer = this.game.getAssetManager().get("singleplayer.png", Texture.class);
        Texture multiPlayer = this.game.getAssetManager().get("multiplayer.png", Texture.class);
        Texture options = this.game.getAssetManager().get("options.png", Texture.class);
        Texture facebook = this.game.getAssetManager().get("facebook.png", Texture.class);
        Texture twitter = this.game.getAssetManager().get("twitter.png", Texture.class);

        this.game.getBatch().draw(singlePlayer, Gdx.graphics.getWidth()*(1.0f/5.0f), Gdx.graphics.getHeight()*(1.0f/25.0f));
        this.game.getBatch().draw(multiPlayer, Gdx.graphics.getWidth()*(2.0f/5.0f), Gdx.graphics.getHeight()*(1.0f/25.0f));
        this.game.getBatch().draw(options, Gdx.graphics.getWidth()*(3.0f/5.0f), Gdx.graphics.getHeight()*(1.0f/25.0f));
        this.game.getBatch().draw(facebook, Gdx.graphics.getWidth()*(12.0f/13.0f), Gdx.graphics.getHeight()*(17.0f/20.0f));
        this.game.getBatch().draw(twitter, Gdx.graphics.getWidth()*(12.0f/13.0f), Gdx.graphics.getHeight()*(14.0f/20.0f));

    }

    @Override
    public void handleMouse() {
        if(Gdx.input.justTouched()){
            if (touchButton(1.0f/5.0f,1.0f/25.0f, BUTTONS_WIDTH, BUTTONS_HEIGHT))
                this.game.setGameState(new SinglePlayerMenuState(this.game));
            else if(touchButton(2.0f/5.0f,1.0f/25.0f, BUTTONS_WIDTH, BUTTONS_HEIGHT))
                this.game.setGameState(new MultiPlayerMenuState(this.game));
            else if(touchButton(3.0f/5.0f,1.0f/25.0f, BUTTONS_WIDTH, BUTTONS_HEIGHT))
                this.game.setGameState(new OptionsMenuState(this.game));
        }
    }
}
