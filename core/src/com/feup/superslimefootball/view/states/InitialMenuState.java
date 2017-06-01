package com.feup.superslimefootball.view.states;

import com.badlogic.gdx.graphics.Texture;
import com.feup.superslimefootball.SuperSlimeFootball;

import static com.feup.superslimefootball.view.GameView.VIEWPORT_HEIGHT;
import static com.feup.superslimefootball.view.GameView.VIEWPORT_WIDTH;

public class InitialMenuState extends MenuState {
    public InitialMenuState(SuperSlimeFootball menu) {
        super(menu);
    }

    @Override
    public void drawButtons() {

        Texture singlePlayer = menu.getAssetManager().get("singleplayer.png", Texture.class);
        menu.getBatch().draw(singlePlayer, VIEWPORT_WIDTH*(1.0f/5.0f), VIEWPORT_HEIGHT*(1.0f/25.0f));

        Texture multiPlayer = (Texture)this.menu.getAssetManager().get("multiplayer.png", Texture.class);
        this.menu.getBatch().draw(multiPlayer, VIEWPORT_WIDTH*(2.0f/5.0f), VIEWPORT_HEIGHT*(1.0f/25.0f));

        Texture options = (Texture)this.menu.getAssetManager().get("options.png", Texture.class);
        this.menu.getBatch().draw(options, VIEWPORT_WIDTH*(3.0f/5.0f), VIEWPORT_HEIGHT*(1.0f/25.0f));

        Texture facebook = (Texture)this.menu.getAssetManager().get("facebook.png", Texture.class);
        this.menu.getBatch().draw(facebook, VIEWPORT_WIDTH*(12.0f/13.0f), VIEWPORT_HEIGHT*(17.0f/20.0f));

        Texture twitter = (Texture)this.menu.getAssetManager().get("twitter.png", Texture.class);
        this.menu.getBatch().draw(twitter, VIEWPORT_WIDTH*(12.0f/13.0f), VIEWPORT_HEIGHT*(14.0f/20.0f));

    }

    @Override
    public void handleMouse() {

    }
}
