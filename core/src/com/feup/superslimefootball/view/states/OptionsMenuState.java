package com.feup.superslimefootball.view.states;

import com.badlogic.gdx.Gdx;
import com.badlogic.gdx.graphics.Texture;
import com.feup.superslimefootball.view.MenuView;

public class OptionsMenuState extends MenuState {
    public OptionsMenuState(MenuView menuView) {
        super(menuView);
    }

    @Override
    public void drawButtons() {

        Texture howToPlay = this.game.getAssetManager().get("howToPlay.png", Texture.class);
        Texture sound = this.game.getAssetManager().get("sound.png", Texture.class);
        Texture comments = this.game.getAssetManager().get("comments.png", Texture.class);
        Texture goalLimit = this.game.getAssetManager().get("goalLimit.png", Texture.class);

        this.game.getBatch().draw(howToPlay, Gdx.graphics.getWidth()*(1.0f/13.0f), Gdx.graphics.getHeight()*(17.0f/20.0f));
        this.game.getBatch().draw(sound, Gdx.graphics.getWidth()*(1.0f/5.0f), Gdx.graphics.getHeight()*(1.0f/25.0f));
        this.game.getBatch().draw(comments, Gdx.graphics.getWidth()*(2.0f/5.0f), Gdx.graphics.getHeight()*(1.0f/25.0f));
        this.game.getBatch().draw(goalLimit, Gdx.graphics.getWidth()*(3.0f/5.0f), Gdx.graphics.getHeight()*(1.0f/25.0f));

    }

    @Override
    public void handleMouse() {
        if(Gdx.input.justTouched()) {
           /* if (touchButton(1.0f / 13.0f, 17.0f / 20.0f))
                // how to play?
            else if (touchButton(1.0f / 5.0f, 1.0f / 25.0f))
                // change sound
            else if (touchButton(2.0f / 5.0f, 1.0f / 25.0f))
                // change comments
            else if (touchButton(3.0f / 5.0f, 1.0f / 25.0f))
                // change goalLimit*/
        }
    }
}
