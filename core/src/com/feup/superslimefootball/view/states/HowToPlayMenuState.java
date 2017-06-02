package com.feup.superslimefootball.view.states;

import com.badlogic.gdx.Gdx;
import com.badlogic.gdx.graphics.Texture;
import com.feup.superslimefootball.SuperSlimeFootball;

public class HowToPlayMenuState extends MenuState {
    public HowToPlayMenuState(SuperSlimeFootball game) {
        super(game);
    }

    @Override
    public void drawButtons() {

        Texture howToPlayBackground = this.game.getAssetManager().get("howToPlayBackground.png", Texture.class);
        Texture goBack = this.game.getAssetManager().get("goBack.png", Texture.class);

        this.game.getBatch().draw(howToPlayBackground, 0.0f, 0.0f);
        this.game.getBatch().draw(goBack, Gdx.graphics.getWidth()*(10.0f/13.0f), Gdx.graphics.getHeight()*(17.0f/20.0f));

    }

    @Override
    public void handleMouse() {
        if(Gdx.input.justTouched()) {
            if(touchButton(10.0f/13.0f,17.0f/20.0f, BUTTONS_WIDTH, BUTTONS_HEIGHT))
                this.game.setGameState(new OptionsMenuState(this.game));
        }
    }
}
