package com.feup.superslimefootball.view.states;

import com.badlogic.gdx.graphics.Texture;
import com.feup.superslimefootball.SuperSlimeFootball;

import static com.feup.superslimefootball.view.GameView.VIEWPORT_HEIGHT;
import static com.feup.superslimefootball.view.GameView.VIEWPORT_WIDTH;

/**
 * Created by afonso on 6/1/17.
 */

public class MenuInicialState extends MenuState {
    public MenuInicialState(SuperSlimeFootball menu) {
        super(menu);
    }

    @Override
    public void drawButtons() {

        Texture singlePlayer = menu.getAssetManager().get("singleplayer.png", Texture.class);
        menu.getBatch().draw(singlePlayer, VIEWPORT_WIDTH*(1.0f/5.0f), VIEWPORT_HEIGHT*(1.0f/25.0f));

//        this.menu.getBatch().draw(this.textures.get("multiPlayer"), VIEWPORT_WIDTH*(2F/5), VIEWPORT_HEIGHT*(1F/25));
//        this.menu.getBatch().draw(this.textures.get("options"), VIEWPORT_WIDTH*(3F/5), VIEWPORT_HEIGHT*(1F/25));
//        this.menu.getBatch().draw(this.textures.get("facebook"), VIEWPORT_WIDTH*(12F/13), VIEWPORT_HEIGHT*(17F/20));
//        this.menu.getBatch().draw(this.textures.get("twitter"), VIEWPORT_WIDTH*(12F/13), VIEWPORT_HEIGHT*(14F/20));


    }

    @Override
    public void handleMouse() {

    }
}
