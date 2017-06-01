package com.feup.superslimefootball.view.states;

import com.badlogic.gdx.Gdx;
import com.badlogic.gdx.graphics.Texture;
import com.feup.superslimefootball.view.MenuView;

import static com.feup.superslimefootball.view.GameView.VIEWPORT_HEIGHT;
import static com.feup.superslimefootball.view.GameView.VIEWPORT_WIDTH;

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

        this.menu.getBatch().draw(howToPlay, VIEWPORT_WIDTH*(1.0f/13.0f), VIEWPORT_HEIGHT*(17.0f/20.0f));
        this.menu.getBatch().draw(sound, VIEWPORT_WIDTH*(1.0f/5.0f), VIEWPORT_HEIGHT*(1.0f/25.0f));
        this.menu.getBatch().draw(comments, VIEWPORT_WIDTH*(2.0f/5.0f), VIEWPORT_HEIGHT*(1.0f/25.0f));
        this.menu.getBatch().draw(goalLimit, VIEWPORT_WIDTH*(3.0f/5.0f), VIEWPORT_HEIGHT*(1.0f/25.0f));

    }

    @Override
    public void handleMouse() {
        if(Gdx.input.isTouched()) {
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
