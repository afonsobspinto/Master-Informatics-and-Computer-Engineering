package com.feup.superslimefootball.view.states;

import com.badlogic.gdx.graphics.Texture;
import com.feup.superslimefootball.SuperSlimeFootball;

import static com.feup.superslimefootball.view.GameView.VIEWPORT_HEIGHT;
import static com.feup.superslimefootball.view.GameView.VIEWPORT_WIDTH;

public class SinglePlayerMenuState extends MenuState {
    public SinglePlayerMenuState(SuperSlimeFootball menu) {
        super(menu);
    }

    @Override
    public void drawButtons() {

        Texture blueSlime = (Texture)this.menu.getAssetManager().get("blueSlime.png", Texture.class);
        this.menu.getBatch().draw(blueSlime, VIEWPORT_WIDTH*(1.0f/4.0f), VIEWPORT_HEIGHT*(4.0f/25.0f));

        Texture redSlime = (Texture)this.menu.getAssetManager().get("redSlime.png", Texture.class);
        this.menu.getBatch().draw(redSlime, VIEWPORT_WIDTH*(5.0f/8.0f), VIEWPORT_HEIGHT*(4.0f/25.0f));

        Texture blueSlimeButton = (Texture)this.menu.getAssetManager().get("blueSlimeButton.png", Texture.class);
        this.menu.getBatch().draw(blueSlimeButton, VIEWPORT_WIDTH*(1.0f/5.0f), VIEWPORT_HEIGHT*(1.0f/25.0f));

        Texture redSlimeButton = (Texture)this.menu.getAssetManager().get("redSlimeButton.png", Texture.class);
        this.menu.getBatch().draw(redSlimeButton, VIEWPORT_WIDTH*(3.0f/5.0f), VIEWPORT_HEIGHT*(1.0f/25.0f));

    }

    @Override
    public void handleMouse() {

    }
}
