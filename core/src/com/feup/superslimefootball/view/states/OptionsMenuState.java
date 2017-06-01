package com.feup.superslimefootball.view.states;

import com.badlogic.gdx.graphics.Texture;
import com.feup.superslimefootball.SuperSlimeFootball;

import static com.feup.superslimefootball.view.GameView.VIEWPORT_HEIGHT;
import static com.feup.superslimefootball.view.GameView.VIEWPORT_WIDTH;

public class OptionsMenuState extends MenuState {
    public OptionsMenuState(SuperSlimeFootball menu) {
        super(menu);
    }

    @Override
    public void drawButtons() {

        Texture howToPlay = (Texture)this.menu.getAssetManager().get("howToPlay.png", Texture.class);
        this.menu.getBatch().draw(howToPlay, VIEWPORT_WIDTH*(1.0f/13.0f), VIEWPORT_HEIGHT*(17.0f/20.0f));

        Texture sound = (Texture)this.menu.getAssetManager().get("sound.png", Texture.class);
        this.menu.getBatch().draw(sound, VIEWPORT_WIDTH*(1.0f/5.0f), VIEWPORT_HEIGHT*(1.0f/25.0f));

        Texture comments = (Texture)this.menu.getAssetManager().get("comments.png", Texture.class);
        this.menu.getBatch().draw(comments, VIEWPORT_WIDTH*(2.0f/5.0f), VIEWPORT_HEIGHT*(1.0f/25.0f));

        Texture goalLimit = (Texture)this.menu.getAssetManager().get("goalLimit.png", Texture.class);
        this.menu.getBatch().draw(goalLimit, VIEWPORT_WIDTH*(3.0f/5.0f), VIEWPORT_HEIGHT*(1.0f/25.0f));

    }

    @Override
    public void handleMouse() {

    }
}
