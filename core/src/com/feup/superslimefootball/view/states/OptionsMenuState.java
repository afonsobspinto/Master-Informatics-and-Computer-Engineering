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

        Texture howToPlay = this.menu.getAssetManager().get("howToPlay.png", Texture.class);
        Texture sound = this.menu.getAssetManager().get("sound.png", Texture.class);
        Texture comments = this.menu.getAssetManager().get("comments.png", Texture.class);
        Texture goalLimit = this.menu.getAssetManager().get("goalLimit.png", Texture.class);
        Texture goBack = this.menu.getAssetManager().get("goBack.png", Texture.class);
        Texture onButton = this.menu.getAssetManager().get("onButton.png", Texture.class);
        Texture offButton = this.menu.getAssetManager().get("offButton.png", Texture.class);

        this.menu.getBatch().draw(howToPlay, Gdx.graphics.getWidth()*(1.0f/13.0f), Gdx.graphics.getHeight()*(17.0f/20.0f));
        this.menu.getBatch().draw(sound, Gdx.graphics.getWidth()*(1.0f/5.0f), Gdx.graphics.getHeight()*(1.0f/25.0f));
        this.menu.getBatch().draw(comments, Gdx.graphics.getWidth()*(2.0f/5.0f), Gdx.graphics.getHeight()*(1.0f/25.0f));
        this.menu.getBatch().draw(goalLimit, Gdx.graphics.getWidth()*(3.0f/5.0f), Gdx.graphics.getHeight()*(1.0f/25.0f));
        this.menu.getBatch().draw(goBack, Gdx.graphics.getWidth()*(10.0f/13.0f), Gdx.graphics.getHeight()*(17.0f/20.0f));
        this.menu.getBatch().draw(onButton, Gdx.graphics.getWidth()*(5.0f/20.0f), Gdx.graphics.getHeight()*(35.0f/200.0f));
        this.menu.getBatch().draw(onButton, Gdx.graphics.getWidth()*(9.0f/20.0f), Gdx.graphics.getHeight()*(35.0f/200.0f));

    }

    @Override
    public void handleMouse() {
        if(Gdx.input.justTouched()) {
            if (touchButton(1.0f / 13.0f, 17.0f / 20.0f))
                this.menuView.setState(new HowToPlayMenuState(this.menuView));
            /*else if (touchButton(1.0f / 5.0f, 1.0f / 25.0f))
                // change sound
            else if (touchButton(2.0f / 5.0f, 1.0f / 25.0f))
                // change comments
            else if (touchButton(3.0f / 5.0f, 1.0f / 25.0f))
                // change goalLimit*/
            else if(touchButton(10.0f/13.0f,17.0f/20.0f))
                this.menuView.setState(new InitialMenuState(this.menuView));
        }
    }
}
